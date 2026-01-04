import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

// Define UserRole type locally until Prisma client is generated
type UserRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'EXECUTIVE' | 'VOLUNTEER';

// Dynamically import Prisma to avoid build errors when DATABASE_URL is not set
async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  const { prisma } = await import('@/lib/prisma');
  return prisma;
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.log('CLERK_WEBHOOK_SECRET not set, skipping webhook processing');
    return new Response('Webhook secret not configured', { status: 200 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  const eventType = evt.type;

  // Get Prisma client (may be null if DATABASE_URL not set)
  const prisma = await getPrisma();

  if (!prisma) {
    console.log('Database not configured, skipping user sync');
    return new Response('Database not configured', { status: 200 });
  }

  try {
    if (eventType === 'user.created') {
      const { id, email_addresses, public_metadata, first_name, last_name } = evt.data;

      const email = email_addresses[0]?.email_address;
      if (!email) {
        return new Response('No email address found', { status: 400 });
      }

      // Map Clerk role to Prisma enum
      const role = mapClerkRoleToPrisma(public_metadata?.role as string);

      await prisma.user.create({
        data: {
          clerkId: id,
          email,
          firstName: first_name || null,
          lastName: last_name || null,
          role,
        },
      });

      console.log(`Created user ${id} with email ${email}`);
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, public_metadata, first_name, last_name } = evt.data;

      const email = email_addresses[0]?.email_address;
      if (!email) {
        return new Response('No email address found', { status: 400 });
      }

      const role = mapClerkRoleToPrisma(public_metadata?.role as string);

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          firstName: first_name || null,
          lastName: last_name || null,
          role,
        },
        create: {
          clerkId: id,
          email,
          firstName: first_name || null,
          lastName: last_name || null,
          role,
        },
      });

      console.log(`Updated user ${id}`);
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      if (id) {
        await prisma.user.delete({
          where: { clerkId: id },
        }).catch(() => {
          // User might not exist in our database yet
          console.log(`User ${id} not found in database, skipping delete`);
        });

        console.log(`Deleted user ${id}`);
      }
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

function mapClerkRoleToPrisma(role?: string): UserRole {
  switch (role?.toLowerCase()) {
    case 'teacher':
      return 'TEACHER';
    case 'parent':
      return 'PARENT';
    case 'executive':
      return 'EXECUTIVE';
    case 'volunteer':
      return 'VOLUNTEER';
    case 'student':
    default:
      return 'STUDENT';
  }
}
