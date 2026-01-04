import { auth, clerkClient } from "@clerk/nextjs/server";
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

    const { token, approved } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const prisma = await getPrisma();

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    // Find the consent request
    const consentRequest = await prisma.consentRequest.findUnique({
      where: { token },
    });

    if (!consentRequest) {
      return NextResponse.json(
        { error: "Consent request not found" },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date() > consentRequest.expiresAt) {
      await prisma.consentRequest.update({
        where: { id: consentRequest.id },
        data: { status: "EXPIRED" },
      });
      return NextResponse.json(
        { error: "Consent request has expired" },
        { status: 410 }
      );
    }

    // Check if already processed
    if (consentRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "Consent request has already been processed" },
        { status: 400 }
      );
    }

    // Update consent request
    await prisma.consentRequest.update({
      where: { id: consentRequest.id },
      data: {
        status: approved ? "APPROVED" : "DENIED",
        respondedAt: new Date(),
      },
    });

    // Update the child's user record
    await prisma.user.update({
      where: { clerkId: consentRequest.childId },
      data: {
        consentStatus: approved ? "GRANTED" : "DENIED",
        consentGrantedAt: approved ? new Date() : null,
        consentGrantedBy: approved ? userId : null,
      },
    });

    // Update Clerk user metadata
    if (approved) {
      const clerk = await clerkClient();
      await clerk.users.updateUserMetadata(consentRequest.childId, {
        publicMetadata: {
          profileComplete: true,
        },
        privateMetadata: {
          coppaConsentDate: new Date().toISOString(),
          coppaConsentParentId: userId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      approved,
    });
  } catch (error) {
    console.error("Error processing consent:", error);
    return NextResponse.json(
      { error: "Failed to process consent" },
      { status: 500 }
    );
  }
}
