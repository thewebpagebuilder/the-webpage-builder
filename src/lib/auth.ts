"use client";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateEmail,
  verifyBeforeUpdateEmail,
  updatePassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
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
    await signInWithEmailAndPassword(auth, email.trim(), password);
    return { success: true };
  } catch (err: any) {
    let message = "Invalid email or password. Please try again.";
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/wrong-password" ||
      err.code === "auth/invalid-credential"
    ) {
      message = "Invalid email or password. Please verify your credentials.";
    } else if (err.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (err.code === "auth/user-disabled") {
      message = "This admin account has been disabled in Firebase Authentication.";
    } else if (err.code === "auth/operation-not-allowed") {
      message = "Email/Password sign-in is not enabled in Firebase Authentication Console.";
    } else if (err.code === "auth/too-many-requests") {
      message = "Too many failed attempts. Please try again in a few minutes.";
    } else if (err.code === "auth/network-request-failed") {
      message = "Network error communicating with Firebase Auth. Check your connection.";
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
    await sendPasswordResetEmail(auth, email.trim());
    return { success: true };
  } catch (err: any) {
    let message = "Failed to send password reset email.";
    if (err.code === "auth/user-not-found") {
      message = "No account found with this email address.";
    } else if (err.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (err.code === "auth/too-many-requests") {
      message = "Too many reset requests. Please try again later.";
    } else if (err.message) {
      message = err.message;
    }
    return { success: false, error: message };
  }
}

export async function verifyResetCode(oobCode: string): Promise<{ valid: boolean; email?: string; error?: string }> {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    return { valid: true, email };
  } catch (err: any) {
    let message = "This password reset link is invalid or has expired.";
    if (err.code === "auth/expired-action-code") {
      message = "This password reset link has expired. Please request a new one.";
    } else if (err.code === "auth/invalid-action-code") {
      message = "This password reset link is invalid or has already been used.";
    } else if (err.message) {
      message = err.message;
    }
    return { valid: false, error: message };
  }
}

export async function completePasswordReset(
  oobCode: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { success: true };
  } catch (err: any) {
    let message = "Failed to reset password.";
    if (err.code === "auth/expired-action-code" || err.code === "auth/invalid-action-code") {
      message = "This reset link has expired or is invalid. Please request a new one.";
    } else if (err.code === "auth/weak-password") {
      message = "Password is too weak. Please choose a stronger password.";
    } else if (err.message) {
      message = err.message;
    }
    return { success: false, error: message };
  }
}

export async function updateCredentials(
  newEmail?: string,
  newPassword?: string
): Promise<{ success: boolean; emailVerificationPending?: boolean; message?: string; error?: string }> {
  try {
    const user = await waitForAuthInit();
    if (!user) {
      return { success: false, error: "No active admin session found. Please sign in again." };
    }

    let emailVerificationPending = false;
    const trimmedEmail = newEmail?.trim();

    if (trimmedEmail && trimmedEmail !== user.email) {
      try {
        await updateEmail(user, trimmedEmail);
      } catch (emailErr: any) {
        // Newer Firebase Auth projects require email verification before updating email
        if (emailErr.code === "auth/operation-not-allowed") {
          await verifyBeforeUpdateEmail(user, trimmedEmail);
          emailVerificationPending = true;
        } else {
          throw emailErr;
        }
      }
    }

    if (newPassword) {
      await updatePassword(user, newPassword);
    }

    return {
      success: true,
      emailVerificationPending,
      message: emailVerificationPending
        ? `A verification link was sent to ${trimmedEmail}. Your email will update after you click it.`
        : undefined,
    };
  } catch (err: any) {
    let message = "Failed to update profile.";
    if (err.code === "auth/requires-recent-login") {
      message = "This operation requires recent authentication. Please log out and log in again before changing credentials.";
    } else if (err.code === "auth/email-already-in-use") {
      message = "That email address is already in use by another account.";
    } else if (err.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (err.code === "auth/weak-password") {
      message = "Password is too weak. Please use at least 8 characters.";
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
