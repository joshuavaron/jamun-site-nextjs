import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Dynamically import Prisma to avoid build errors when DATABASE_URL is not set
async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { parentEmail, childName, locale } = await request.json();

    if (!parentEmail) {
      return NextResponse.json(
        { error: "Parent email is required" },
        { status: 400 }
      );
    }

    const prisma = await getPrisma();

    if (!prisma) {
      // Database not configured - log and return success for now
      console.log("Database not configured, consent request logged:", { parentEmail, childName, locale });
      return NextResponse.json({ success: true });
    }

    // Create consent request in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    const consentRequest = await prisma.consentRequest.create({
      data: {
        childId: userId,
        parentEmail,
        expiresAt,
      },
    });

    // TODO: Send email to parent with consent link
    // For now, we'll just log the consent request
    console.log("Consent request created:", {
      id: consentRequest.id,
      token: consentRequest.token,
      parentEmail,
      childName,
      locale,
      approvalUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://jamun.org"}/${locale}/online/consent/approve?token=${consentRequest.token}`,
    });

    // In production, you would send an email here using a service like:
    // - Resend
    // - SendGrid
    // - AWS SES
    // - Postmark

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating consent request:", error);
    return NextResponse.json(
      { error: "Failed to create consent request" },
      { status: 500 }
    );
  }
}
