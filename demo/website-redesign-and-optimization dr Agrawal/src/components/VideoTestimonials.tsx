import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const videos = [
  { id: 1, name: "Priya S.", treatment: "Invisible Aligners", thumbnail: "https://i.vimeocdn.com/video/1724420056-6640452faba0bf1dbded185017498df4c2cb9d9cb08cba268b0a28de38de3d31-d", duration: "2:15" },
  { id: 2, name: "Rahul M.", treatment: "Dental Implants", thumbnail: "https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-a394ec2.png", duration: "1:45" },
  { id: 3, name: "Anjali K.", treatment: "Smile Makeover", thumbnail: "https://img1.wsimg.com/isteam/ip/306cf3fa-72a3-4b26-a784-42b223611a10/Blue%20Medical%20Health%20Hospital%20Services%20-e7f0220.png", duration: "3:00" },
];

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null);
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-wider text-amber-600">Video Stories</span>
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Hear From Our Happy Patients</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Real patients share their transformation journeys at Dr. Agrawal's.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} onClick={() => setSelectedVideo(video)} className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg">
              <img src={video.thumbnail} alt={video.name} className="warm-live-image h-64 w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-amber-600 shadow-lg backdrop-blur transition group-hover:bg-white">
                  <Play className="ml-1 h-7 w-7 fill-amber-600" />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-semibold">{video.name}</p>
                <p className="text-sm opacity-90">{video.treatment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVideo(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
              <button onClick={() => setSelectedVideo(null)} className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30"><X className="h-5 w-5" /></button>
              <div className="aspect-video bg-slate-800">
                <img src={selectedVideo.thumbnail} alt={selectedVideo.name} className="warm-live-image h-full w-full object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="text-center text-white"><Play className="mx-auto mb-4 h-16 w-16" /><p className="text-lg font-semibold">{selectedVideo.name}</p><p className="text-sm opacity-80">{selectedVideo.treatment}</p></div></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
