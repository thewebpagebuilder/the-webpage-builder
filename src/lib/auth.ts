"use client";
import { supabase } from "./supabase";

export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred during sign in." };
  }
}

export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Failed to sign out from Supabase:", err);
  }
}

export const logout = signOut;

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session from Supabase:", error);
      return null;
    }
    return session;
  } catch (err) {
    console.error("Failed to retrieve session:", err);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

export async function getUserEmail(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.email || null;
}

export async function updateCredentials(
  newEmail?: string,
  newPassword?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updates: any = {};
    if (newEmail) updates.email = newEmail;
    if (newPassword) updates.password = newPassword;

    const { error } = await supabase.auth.updateUser(updates);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update user profile in Supabase." };
  }
}

// Kept for backward compatibility
export function isUsingDefaults(): boolean {
  return false;
}

// Kept for backward compatibility
export function initAuth(): boolean {
  return false;
}
