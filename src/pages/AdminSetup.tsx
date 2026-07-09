import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { isAuthenticated, updateCredentials, getUserEmail } from "../lib/auth";

export function AdminSetup() {
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function checkAuthAndLoadEmail() {
      const authed = await isAuthenticated();
      if (!authed) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const email = await getUserEmail();
      if (email) {
        setCurrentEmail(email);
        setNewEmail(email);
      }
    }
    checkAuthAndLoadEmail();
  }, [navigate]);

  // Password strength check
  const passwordStrength = () => {
    if (!newPassword) return { score: 0, label: "", color: "" };
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 2) return { score, label: "Weak", color: "bg-red-400 text-red-400" };
    if (score <= 3) return { score, label: "Fair", color: "bg-yellow-400 text-yellow-400" };
    if (score <= 4) return { score, label: "Good", color: "bg-blue-400 text-blue-400" };
    return { score, label: "Strong", color: "bg-emerald-400 text-emerald-400" };
  };

  const strength = passwordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const updateEmail = newEmail !== currentEmail ? newEmail : undefined;
      const updatePassword = newPassword ? newPassword : undefined;

      if (!updateEmail && !updatePassword) {
        setError("No changes made.");
        setSubmitting(false);
        return;
      }

      const result = await updateCredentials(updateEmail, updatePassword);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 1500);
      } else {
        setError(result.error || "Failed to update profile.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };


  if (success) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-5 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={32} className="text-emerald-400 sm:w-9 sm:h-9" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Profile Updated!</h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Your Supabase admin credentials have been updated. Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-5 sm:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <a href="/" className="inline-flex items-center gap-1.5 text-lg sm:text-xl font-bold tracking-tighter text-white">
            The Webpage Builder
            <span className="text-zinc-400">.</span>
          </a>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">Profile Settings</p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
              <KeyRound size={22} className="text-emerald-400 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="text-center mb-7 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Update Admin Profile
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Modify your Supabase admin login email or password.
            </p>
          </div>

          {/* Warning */}
          <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.04] flex items-start gap-2.5">
            <AlertCircle size={14} className="text-yellow-400 flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
            <p className="text-yellow-400/90 text-[11px] sm:text-xs leading-relaxed">
              <span className="font-semibold">Important:</span> Make sure you save your new credentials. If you change your email, you may need to confirm it depending on your Supabase settings.
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
            {/* New Email */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                Admin Email <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@thewebpagebuilder.in"
                  required
                  autoComplete="email"
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-3.5 sm:pr-4 rounded-lg sm:rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                New password (leave blank to keep current)
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  minLength={8}
                  autoComplete="new-password"
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

              {/* Strength meter */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Strength</span>
                    <span className={`text-[10px] font-semibold ${strength.color.split(" ")[1]}`}>{strength.label}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= strength.score ? strength.color.split(" ")[0] : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            {newPassword && (
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                  Confirm new password <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none sm:w-4 sm:h-4" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    autoComplete="new-password"
                    className={`w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-11 sm:pr-12 rounded-lg sm:rounded-xl bg-zinc-950 border text-white text-sm placeholder:text-zinc-700 focus:outline-none transition-colors ${
                      confirmPassword && confirmPassword !== newPassword
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-zinc-800 focus:border-zinc-600"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-1"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={14} className="sm:w-4 sm:h-4" /> : <Eye size={14} className="sm:w-4 sm:h-4" />}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-red-400 text-[10px] mt-1.5">Passwords do not match.</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || Boolean(newPassword && newPassword !== confirmPassword)}
              className="w-full h-12 rounded-full bg-emerald-400 text-zinc-950 text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-300 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 mt-3"
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
                  Save Settings
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Cancel/logout fallback */}
          <div className="mt-6 pt-5 border-t border-zinc-800/50 text-center">
            <button
              onClick={() => navigate("/admin")}
              className="text-zinc-400 hover:text-white text-[11px] sm:text-xs transition-colors"
            >
              ← Back to dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
