import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { updateCredentials } from "../lib/auth";

export function AdminResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await updateCredentials(undefined, password);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 3000);
      } else {
        setError(result.error || "Failed to update password. Session may have expired.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-5 sm:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-8 sm:mb-10">
          <a href="/" className="inline-flex items-center gap-1.5 text-lg sm:text-xl font-bold tracking-tighter text-white">
            The Webpage Builder
            <span className="text-zinc-400">.</span>
          </a>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">Admin Security Portal</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl">
          {/* Lock icon */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Lock size={22} className="text-white sm:w-6 sm:h-6" />
            </div>
          </div>

          {!success ? (
            <>
              <div className="text-center mb-7 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Set New Password</h1>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Please enter your new administrator password.
                </p>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] flex items-start gap-2.5"
                >
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs">{error}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* New Password */}
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                    New Password (min 8 chars)
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoFocus
                      className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-11 sm:pr-12 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={14} className="sm:w-4 sm:h-4" /> : <Eye size={14} className="sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-11 sm:pr-12 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-full bg-white text-black text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={14} />
                      Save Password
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <CheckCircle2 className="text-emerald-400" size={24} />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Password Updated!</h1>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Your credentials have been successfully updated. Redirecting to admin dashboard...
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-400 text-[10px] sm:text-[11px] leading-relaxed">
              Logins and credentials are automatically synchronized and secured via Supabase Auth.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
