"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { signIn, isAuthenticated } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    async function checkExistingAuth() {
      const authed = await isAuthenticated();
      if (authed) {
        navigate.replace("/admin");
      }
    }
    checkExistingAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await signIn(email, password);
      if (result.success) {
        navigate.replace("/admin");
      } else {
        setError(result.error || "Invalid email or password. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (error) {
        setForgotError(error.message);
      } else {
        setForgotSuccess(true);
      }
    } catch (err: any) {
      setForgotError(err.message || "An unexpected error occurred.");
    } finally {
      setForgotSubmitting(false);
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
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl">
          {/* Lock icon */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Lock size={22} className="text-white sm:w-6 sm:h-6" />
            </div>
          </div>

          {!showForgot ? (
            <>
              <div className="text-center mb-7 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Admin Sign In</h1>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Enter your Supabase credentials to access the dashboard
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
                {/* Email */}
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@thewebpagebuilder.in"
                      required
                      autoComplete="email"
                      autoFocus
                      className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-3.5 sm:pr-4 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(true);
                        setForgotSuccess(false);
                        setForgotError("");
                      }}
                      className="text-[10px] sm:text-xs text-zinc-550 hover:text-white transition-colors hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={14} />
                      Sign In
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-7 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Reset Password</h1>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  We'll send a password recovery link to your email address.
                </p>
              </div>

              {/* Success state */}
              {forgotSuccess ? (
                <div className="text-center py-4 space-y-4">
                  <div className="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-400 text-xs leading-relaxed">
                    Password recovery link sent successfully! Please check your email inbox (and spam folder) for the reset link.
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="text-zinc-400 hover:text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-1.5 hover:underline"
                  >
                    <ArrowLeft size={12} />
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <>
                  {/* Error */}
                  {forgotError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-5 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] flex items-start gap-2.5"
                    >
                      <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-xs">{forgotError}</p>
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleForgotSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="admin@thewebpagebuilder.in"
                          required
                          autoComplete="email"
                          autoFocus
                          className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-3.5 sm:pr-4 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={forgotSubmitting}
                      className="w-full h-12 rounded-full bg-white text-black text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
                    >
                      {forgotSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail size={14} />
                          Send Recovery Link
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForgot(false)}
                        className="text-zinc-400 hover:text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-1.5 hover:underline"
                      >
                        <ArrowLeft size={12} />
                        Back to Sign In
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-zinc-800/50 text-center">
            <p className="text-zinc-400 text-[10px] sm:text-[11px] leading-relaxed">
              Authorized personnel only. All logins verified via Supabase.
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a href="/" className="text-zinc-400 hover:text-white text-xs sm:text-sm transition-colors">
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
