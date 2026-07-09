import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Smile, CalendarCheck } from "lucide-react";

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Happy Patients" },
  { icon: Award, value: 15, suffix: "+", label: "Years of Excellence" },
  { icon: Smile, value: 5000, suffix: "+", label: "Smile Transformations" },
  { icon: CalendarCheck, value: 50, suffix: "+", label: "Dental Procedures" },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function AnimatedStats() {
  return (
    <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-amber-200/50 md:grid-cols-4 md:p-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center md:border-r md:border-amber-100 last:border-0">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><stat.icon className="h-6 w-6" /></div>
              <p className="font-display text-2xl font-bold text-black md:text-3xl"><Counter end={stat.value} suffix={stat.suffix} /></p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
