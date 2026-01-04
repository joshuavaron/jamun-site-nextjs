import { auth, currentUser } from '@clerk/nextjs/server';

export type UserRole = 'student' | 'teacher' | 'parent' | 'executive' | 'volunteer';

export interface ClerkPublicMetadata {
  role?: UserRole;
  grade?: number;
  schoolId?: string;
  teamIds?: string[];
  profileComplete?: boolean;
}

export interface ClerkPrivateMetadata {
  supabaseUserId?: string;
  coppaConsentDate?: string;
  coppaConsentParentId?: string;
  isUnder13?: boolean;
}

/**
 * Get the current user's role from Clerk metadata
 */
export async function getUserRole(): Promise<UserRole | null> {
  const user = await currentUser();
  if (!user) return null;
  return (user.publicMetadata as ClerkPublicMetadata)?.role || null;
}

/**
 * Check if user has one of the allowed roles, throw if not
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<UserRole> {
  const role = await getUserRole();
  if (!role || !allowedRoles.includes(role)) {
    throw new Error('Unauthorized: insufficient permissions');
  }
  return role;
}

/**
 * Check if a birthdate indicates the user is under 13
 */
export function isUnder13(birthDate: Date): boolean {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age < 13;
}

/**
 * Check if user's profile is complete
 */
export async function isProfileComplete(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;
  return (user.publicMetadata as ClerkPublicMetadata)?.profileComplete === true;
}

/**
 * Get the current authenticated user ID
 */
export async function getAuthUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}
