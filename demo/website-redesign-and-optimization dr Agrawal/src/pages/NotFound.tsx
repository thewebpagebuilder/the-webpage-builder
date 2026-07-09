import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="font-display text-7xl font-extrabold text-amber-500 sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-black sm:text-3xl">Oops! Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">The page you're looking for may have been moved or no longer exists.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-amber-600 hover:to-yellow-600"><HomeIcon className="h-5 w-5" /> Back to Home</Link>
          <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-black transition hover:bg-slate-100"><Calendar className="h-5 w-5" /> Book Appointment</Link>
        </div>
      </motion.div>
    </section>
  );
}
