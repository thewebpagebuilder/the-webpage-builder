import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isUsingDefaults } from "../../lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * If true, redirects to /admin/setup when the user is still on defaults.
   * Default true.
   */
  requireSetup?: boolean;
}

export function ProtectedRoute({ children, requireSetup = true }: ProtectedRouteProps) {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkAuth() {
      const isAuth = await isAuthenticated();
      if (!active) return;
      setAuthed(isAuth);
      setNeedsSetup(isUsingDefaults());
      setChecked(true);
    }
    checkAuth();
    return () => {
      active = false;
    };
  }, []);

  // Avoid flicker — render nothing until we've checked
  if (!checked) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireSetup && needsSetup) {
    return <Navigate to="/admin/setup" replace />;
  }

  return <>{children}</>;
}
