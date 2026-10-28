"use client";
import { submitLead as firebaseSubmitLead } from "./firebase";

// Exported for backward compatibility
export const submitLead = firebaseSubmitLead;

export const supabase = {
  auth: {
    resetPasswordForEmail: async () => ({
      error: new Error("Please use resetPassword from @/lib/auth (migrated to Firebase)."),
    }),
  },
};
