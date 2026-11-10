"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, isUsingDefaults } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * If true, redirects to /admin/setup when the user is still on defaults.
   * Default true.
   */
  requireSetup?: boolean;
}

export function ProtectedRoute({ children, requireSetup = true }: ProtectedRouteProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkAuth() {
      try {
        const isAuth = await isAuthenticated();
        if (!active) return;
        const defaults = isUsingDefaults();
        setAuthed(isAuth);
        setNeedsSetup(defaults);
        setChecked(true);

        if (!isAuth) {
          router.replace("/admin/login");
        } else if (requireSetup && defaults) {
          router.replace("/admin/setup");
        }
      } catch {
        if (!active) return;
        setAuthed(false);
        setChecked(true);
        router.replace("/admin/login");
      }
    }
    checkAuth();
    return () => {
      active = false;
    };
  }, [requireSetup, router]);

  // Avoid flicker or rendering protected UI before auth check / redirect finishes
  if (!checked || !authed || (requireSetup && needsSetup)) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
