import { useState } from "react";
import { motion } from "framer-motion";

const toothZones = [
  { id: "enamel", name: "Enamel", desc: "The hard, outer protective layer of your tooth.", issues: "Cavities, erosion, sensitivity" },
  { id: "dentin", name: "Dentin", desc: "The layer beneath enamel providing structural support.", issues: "Sensitivity, decay spread" },
  { id: "pulp", name: "Pulp", desc: "Contains nerves and blood vessels.", issues: "Infection, pain, root canal need" },
  { id: "gum", name: "Gums", desc: "Soft tissue that surrounds and supports your teeth.", issues: "Bleeding, recession, gum disease" },
];

export default function ToothDiagram() {
  const [activeZone, setActiveZone] = useState(toothZones[0]);
  return (
    <section className="bg-amber-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Know Your Teeth</span>
            <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Understanding Tooth Anatomy</h2>
            <p className="mt-4 text-slate-600">Click on different parts to learn about their function.</p>
            <div className="mt-8 space-y-3">
              {toothZones.map((zone) => (
                <button key={zone.id} onClick={() => setActiveZone(zone)} className={`w-full rounded-xl border-2 p-4 text-left transition ${activeZone.id === zone.id ? "bg-amber-100 border-amber-400" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <p className="font-semibold text-black">{zone.name}</p>
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex items-center justify-center">
            <svg viewBox="0 0 300 400" className="h-[400px] w-full max-w-sm">
              <motion.path d="M75 60 C75 30, 225 30, 225 60 L225 120 C225 180, 200 220, 180 280 L180 340 C180 360, 120 360, 120 340 L120 280 C100 220, 75 180, 75 120 Z" className="fill-amber-200 stroke-amber-400" strokeWidth="3" whileHover={{ scale: 1.02 }} onClick={() => setActiveZone(toothZones[0])} style={{ cursor: "pointer" }} />
              <motion.path d="M95 80 C95 55, 205 55, 205 80 L205 120 C205 170, 185 200, 165 250 L165 300 C165 315, 135 315, 135 300 L135 250 C115 200, 95 170, 95 120 Z" className="fill-yellow-200 stroke-yellow-400" strokeWidth="3" whileHover={{ scale: 1.02 }} onClick={() => setActiveZone(toothZones[1])} style={{ cursor: "pointer" }} />
              <motion.path d="M120 100 C120 85, 180 85, 180 100 L180 140 C180 180, 165 200, 155 230 L155 270 C155 280, 145 280, 145 270 L145 230 C135 200, 120 180, 120 140 Z" className="fill-red-200 stroke-red-300" strokeWidth="3" whileHover={{ scale: 1.02 }} onClick={() => setActiveZone(toothZones[2])} style={{ cursor: "pointer" }} />
              <motion.path d="M60 120 C60 100, 240 100, 240 120 L240 150 C240 160, 60 160, 60 150 Z" className="fill-pink-200 stroke-pink-300" strokeWidth="3" whileHover={{ scale: 1.02 }} onClick={() => setActiveZone(toothZones[3])} style={{ cursor: "pointer" }} />
              <text x="150" y="50" textAnchor="middle" className="fill-slate-600 text-sm font-semibold">Tooth Cross-Section</text>
            </svg>
          </motion.div>
        </div>
        <motion.div key={activeZone.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-xl font-bold text-black">{activeZone.name}</h3>
          <p className="mt-2 text-slate-600">{activeZone.desc}</p>
          <div className="mt-4 rounded-xl bg-red-50 p-4"><p className="text-sm font-semibold text-red-700">Common Issues:</p><p className="text-sm text-red-600">{activeZone.issues}</p></div>
        </motion.div>
      </div>
    </section>
  );
}
