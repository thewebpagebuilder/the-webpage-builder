import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calendar, Phone, Star, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { useEffect } from "react";

const FloatingIcon = ({
  icon: Icon,
  delay,
  x,
  y,
  rotation,
}: {
  icon: React.ElementType;
  delay: number;
  x: string | number;
  y: string | number;
  rotation: number;
}) => (
  <motion.div
    className="absolute hidden lg:block"
    style={{ left: x, top: y }}
    animate={{ y: [0, -20, 0], rotate: [0, rotation, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <Icon className="h-8 w-8 text-amber-300" />
    </div>
  </motion.div>
);

export default function Hero3D() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("hero-section")?.getBoundingClientRect();
      if (rect) {
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero-section" className="relative flex min-h-screen items-center overflow-hidden bg-white pt-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50 to-yellow-100" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-yellow-300/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <img
          src="https://i.vimeocdn.com/video/1724420056-6640452faba0bf1dbded185017498df4c2cb9d9cb08cba268b0a28de38de3d31-d"
          alt="Dr. Agrawal's Dental Clinic"
          className="warm-live-image h-full w-full object-cover opacity-35"
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero-smile.jpg"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10" />
      </div>
      <FloatingIcon icon={Star} delay={0} x="10%" y="20%" rotation={15} />
      <FloatingIcon icon={ShieldCheck} delay={0.5} x="85%" y="15%" rotation={-10} />
      <FloatingIcon icon={Sparkles} delay={1} x="15%" y="70%" rotation={20} />
      <FloatingIcon icon={Calendar} delay={1.5} x="80%" y="65%" rotation={-15} />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white px-4 py-1.5 text-sm font-medium text-black shadow-sm">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              Rated #1 Dental Clinic in Nashik
            </motion.div>
            <motion.h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Coz, You Deserve the{" "}
              <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                BEST
              </span>
            </motion.h1>
            <motion.p className="mt-6 text-lg leading-relaxed text-black/75 sm:text-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Best Dentist in Nashik — More than 10 thousand Happy and Smiling Patients. Experience painless, precise and personalised dental care at Dr. Agrawal's.
            </motion.p>
            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <a href="#/book" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-yellow-600">
                <Calendar className="h-5 w-5" /> Book Appointment
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="tel:+917498444051" className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-white px-7 py-3.5 text-base font-semibold text-black shadow-sm transition hover:bg-amber-50">
                <Phone className="h-5 w-5" /> +91 74984 44051
              </a>
            </motion.div>
            <motion.div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-amber-600" /><span>100% Sterilized Clinic</span></div>
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-amber-600" /><span>Open Today 10 AM – 8:30 PM</span></div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block" style={{ rotateX, rotateY }}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-500/30 blur-2xl" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl bg-white">
                <img
                  src="https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-5099700.png/:/cr=t:16.22%25,l:16.22%25,w:67.57%25,h:67.57%25/rs=w:365,h:365,cg:true,m"
                  alt="Dr. Agrawal - Best Dentist in Nashik"
                  className="warm-live-image h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/doctor-portrait.jpg"; }}
                />
              </motion.div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -left-8 top-16 z-20 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600"><Star className="h-5 w-5 fill-amber-600" /></div>
                  <div><p className="text-lg font-bold text-black">4.9/5</p><p className="text-xs text-slate-500">Google Rating</p></div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-6 bottom-20 z-20 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600"><Calendar className="h-5 w-5" /></div>
                  <div><p className="text-lg font-bold text-black">10,000+</p><p className="text-xs text-slate-500">Happy Patients</p></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
