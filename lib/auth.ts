// src/lib/auth.ts
// This file would typically contain NextAuth.js configuration
// For this example, we'll create a simplified version

import { User } from "@/types/user";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface Session {
  user: User | null;
  expires: string;
}

export interface AuthState {
  status: AuthStatus;
  session: Session | null;
}

// Mock functions for authentication
export const signIn = async (
  provider: string,
  credentials?: { email: string; password: string }
) => {
  // This would be replaced with real NextAuth.js implementation
  console.log("Sign in with", provider, credentials);
  return { ok: true, error: null };
};

export const signOut = async () => {
  // This would be replaced with real NextAuth.js implementation
  console.log("Sign out");
  return { ok: true };
};

// Mock user roles and permissions
export enum UserRole {
  Admin = "admin",
  Doctor = "doctor",
  Staff = "staff",
  Patient = "patient",
  Lab = "lab",
}

export interface Permission {
  action: string;
  subject: string;
}

export const defaultPermissions: Record<UserRole, Permission[]> = {
  [UserRole.Admin]: [{ action: "manage", subject: "all" }],
  [UserRole.Doctor]: [
    { action: "read", subject: "patient" },
    { action: "create", subject: "patient" },
    { action: "update", subject: "patient" },
    { action: "read", subject: "appointment" },
    { action: "create", subject: "appointment" },
    { action: "update", subject: "appointment" },
    { action: "delete", subject: "appointment" },
    { action: "read", subject: "labOrder" },
    { action: "create", subject: "labOrder" },
    { action: "update", subject: "labOrder" },
  ],
  [UserRole.Staff]: [
    { action: "read", subject: "patient" },
    { action: "create", subject: "patient" },
    { action: "update", subject: "patient" },
    { action: "read", subject: "appointment" },
    { action: "create", subject: "appointment" },
    { action: "update", subject: "appointment" },
  ],
  [UserRole.Patient]: [
    { action: "read", subject: "ownProfile" },
    { action: "update", subject: "ownProfile" },
    { action: "read", subject: "ownAppointments" },
    { action: "create", subject: "ownAppointments" },
  ],
  [UserRole.Lab]: [
    { action: "read", subject: "labOrder" },
    { action: "update", subject: "labOrder" },
    { action: "read", subject: "limitedPatient" },
  ],
};
