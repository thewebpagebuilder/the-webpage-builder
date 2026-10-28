"use client";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

/**
 * Ensures Firebase has finished loading persistent credentials from storage
 */
async function waitForAuthInit(): Promise<User | null> {
  if (typeof auth.authStateReady === "function") {
    await auth.authStateReady();
    return auth.currentUser;
  }
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (err: any) {
    let message = "Invalid email or password. Please try again.";
    if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
      message = "Invalid email or password. Please verify your credentials.";
    } else if (err.code === "auth/too-many-requests") {
      message = "Too many failed attempts. Please try again in a few minutes.";
    } else if (err.message) {
      message = err.message;
    }
    return { success: false, error: message };
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.error("Failed to sign out from Firebase:", err);
  }
}

export const logout = signOut;

export async function getSession() {
  try {
    const user = await waitForAuthInit();
    if (!user) return null;
    return {
      user: {
        id: user.uid,
        email: user.email,
      },
    };
  } catch (err) {
    console.error("Failed to retrieve session from Firebase:", err);
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

export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err: any) {
    let message = "Failed to send password reset email.";
    if (err.code === "auth/user-not-found") {
      message = "No account found with this email address.";
    } else if (err.message) {
      message = err.message;
    }
    return { success: false, error: message };
  }
}

export async function updateCredentials(
  newEmail?: string,
  newPassword?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: "No active admin session found. Please sign in again." };
    }

    if (newEmail && newEmail !== user.email) {
      await updateEmail(user, newEmail);
    }
    if (newPassword) {
      await updatePassword(user, newPassword);
    }

    return { success: true };
  } catch (err: any) {
    let message = "Failed to update profile.";
    if (err.code === "auth/requires-recent-login") {
      message = "This operation requires recent authentication. Please log out and log in again before changing credentials.";
    } else if (err.message) {
      message = err.message;
    }
    return { success: false, error: message };
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
