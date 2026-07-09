import { motion } from "framer-motion";
import { Award, GraduationCap, Stethoscope } from "lucide-react";

const team = [
  { name: "Dr. Agrawal", role: "Chief Dentist & Orthodontist", image: "https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-a394ec2.png", badges: ["15+ Years Experience", "Aligner Specialist", "Implant Expert"], bio: "Passionate about creating confident smiles using the most advanced, minimally invasive techniques." },
  { name: "Dr. Priya Sharma", role: "Cosmetic & Pediatric Dentist", image: "", badges: ["Smile Designer", "Child Friendly", "Fellowship USA"], bio: "Specialised in aesthetic makeovers and creating positive dental experiences for children." },
  { name: "Dr. Rahav Mehta", role: "Oral & Maxillofacial Surgeon", image: "", badges: ["Impactions", "Implants", "Wisdom Teeth"], bio: "Expert in complex extractions, dental implants and full-mouth rehabilitation surgeries." },
];

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 text-2xl font-bold text-amber-700">{initials}</div>;
}

export default function Team() {
  return (
    <section id="team" className="bg-amber-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Meet The Experts</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Caring Hands Behind Every Smile</h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-64 w-full overflow-hidden bg-slate-100">
                {member.image ? <img src={member.image} alt={member.name} className="warm-live-image h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/images/doctor-portrait.jpg"; }} /> : <InitialsAvatar name={member.name} />}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-black">{member.name}</h3>
                <p className="text-sm font-medium text-amber-600">{member.role}</p>
                <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.badges.map((badge, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      {i === 0 ? <Award className="h-3 w-3" /> : i === 1 ? <Stethoscope className="h-3 w-3" /> : <GraduationCap className="h-3 w-3" />}{badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
