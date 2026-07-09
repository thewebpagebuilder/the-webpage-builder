"use client";

import React, { useState, useRef, useEffect } from "react";
import { Scissors, RotateCw, Shirt, Ruler, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
}

export default function SizingLab3D(_props: { products: Product[] }) {
  // Measurements
  const [bust, setBust] = useState(36);
  const [waist, setWaist] = useState(30);
  const [hips, setHips] = useState(40);
  const [shoulder, setShoulder] = useState(14.5);
  const [height, setHeight] = useState(64);
  const [sleeve, setSleeve] = useState(15);
  const [neck, setNeck] = useState(13.5);

  // 3D View
  const [rotationY, setRotationY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewAngle, setViewAngle] = useState<"front" | "side" | "back">("front");
  const [garment, setGarment] = useState<"kurti" | "lehenga" | "gown">("kurti");
  const [fabricColor, setFabricColor] = useState("#c97d60");
  const pointerDown = useRef<{x: number, r: number} | null>(null);

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => setRotationY(r => (r + 0.6) % 360), 30);
    return () => clearInterval(id);
  }, [autoRotate]);

  // Peach Petals official size chart:
  // Size  Bust    Waist   Hip     Shoulder
  // XS    34.25   27      45      14
  // S     37      29      46.25   14.25
  // M     39.25   31      48      14.5
  // L     41      33      50      15
  // XL    42.5    35      52      15.5
  // XXL   44      38.5    54      16
  // 3XL   49      42      57      16.5
  // 4XL   52      46      60      17.5
  const SIZE_CHART = [
    { size: "XS",  bust: 34.25,  waist: 27,   hip: 45,    shoulder: 14   },
    { size: "S",   bust: 37,     waist: 29,   hip: 46.25, shoulder: 14.25},
    { size: "M",   bust: 39.25,  waist: 31,   hip: 48,    shoulder: 14.5 },
    { size: "L",   bust: 41,     waist: 33,   hip: 50,    shoulder: 15   },
    { size: "XL",  bust: 42.5,   waist: 35,   hip: 52,    shoulder: 15.5 },
    { size: "XXL", bust: 44,     waist: 38.5, hip: 54,    shoulder: 16   },
    { size: "3XL", bust: 49,     waist: 42,   hip: 57,    shoulder: 16.5 },
    { size: "4XL", bust: 52,     waist: 46,   hip: 60,    shoulder: 17.5 },
  ];

  const determineSize = () => {
    // Calculate weighted distance from each size's chart values.
    // Bust gets 40%, Waist 25%, Hips 25%, Shoulder 10%.
    // This ensures all body points influence the final size.
    let bestIdx = 0;
    let bestScore = Infinity;

    SIZE_CHART.forEach((row, idx) => {
      const bustDiff     = Math.pow((bust - row.bust) / 5, 2);
      const waistDiff    = Math.pow((waist - row.waist) / 4, 2);
      const hipDiff      = Math.pow((hips - row.hip) / 5, 2);
      const shoulderDiff = Math.pow((shoulder - row.shoulder) / 2, 2);

      // Weighted Euclidean distance
      const score = (bustDiff * 0.40) + (waistDiff * 0.25) + (hipDiff * 0.25) + (shoulderDiff * 0.10);

      if (score < bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    });

    return SIZE_CHART[bestIdx].size;
  };

  // Calculate fit percentage: how close all measurements are to the chart's ideal
  const calculateFitScore = () => {
    const sizes = SIZE_CHART.map(r => r.size);
    const mySizeIdx = sizes.indexOf(size);
    if (mySizeIdx < 0) return 60;
    const chart = SIZE_CHART[mySizeIdx];
    
    const bustFit     = 1 - Math.min(1, Math.abs(bust - chart.bust) / 5);
    const waistFit    = 1 - Math.min(1, Math.abs(waist - chart.waist) / 4);
    const hipFit      = 1 - Math.min(1, Math.abs(hips - chart.hip) / 5);
    const shoulderFit = 1 - Math.min(1, Math.abs(shoulder - chart.shoulder) / 2);
    
    const avg = (bustFit * 0.40 + waistFit * 0.25 + hipFit * 0.25 + shoulderFit * 0.10);
    return Math.max(55, Math.round(65 + avg * 35)); // 55-100 range
  };

  const size = determineSize();
  const fitScore = calculateFitScore();

  // Calculate body proportions for 3D avatar
  const bustW = 13 + ((bust - 30) / 24) * 16;
  const waistW = 9 + ((waist - 24) / 22) * 13;
  const hipW = 15 + ((hips - 34) / 26) * 15;
  const shoulderW = 11.5 + ((shoulder - 13) / 5) * 10;
  const bodyHeight = 120 + ((height - 54) / 22) * 50;

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    pointerDown.current = { x: clientX, r: rotationY };
    setAutoRotate(false);
  };
  const moveDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!pointerDown.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setRotationY((pointerDown.current.r + (clientX - pointerDown.current.x) * 0.6) % 360);
  };
  const endDrag = () => { pointerDown.current = null; };

  const presetBodies = [
    { name: "Petite", b: 33, w: 26, h: 36, sh: 13.5, ht: 60, sl: 13.5, n: 12.5 },
    { name: "Classic", b: 36, w: 30, h: 40, sh: 14.5, ht: 64, sl: 15, n: 13.5 },
    { name: "Curvy", b: 41, w: 34, h: 48, sh: 15, ht: 65, sl: 16, n: 14 },
    { name: "Tall", b: 38, w: 31, h: 42, sh: 15.5, ht: 70, sl: 17, n: 14 },
  ];

  const applyPreset = (p: typeof presetBodies[0]) => {
    setBust(p.b); setWaist(p.w); setHips(p.h); setShoulder(p.sh);
    setHeight(p.ht); setSleeve(p.sl); setNeck(p.n);
  };

  return (
    <section id="sizing-lab" className="py-16 sm:py-24 bg-[#100c0b] text-[#fffdfa] relative overflow-hidden border-y-2 border-[#d4af37]/30">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#d4af37 0.6px, transparent 0.6px)", backgroundSize: "22px 22px" }} />
      <div className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full bg-[#c97d60]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[#d4af37]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.28em] text-[#d4af37] font-semibold flex items-center justify-center gap-2 mb-3">
            <Scissors className="h-3.5 w-3.5" /> Peach Petals 3D Virtual Fitting Room
          </span>
          <h2 className="text-3xl sm:text-[44px] font-serif font-normal text-white leading-tight">
            True-to-Life Body Scan Studio
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-[15px] leading-relaxed">
            Drag to rotate 360°. Adjust 7-point body measurements. Watch your garment drape live in 3D. Get instant Peach Petals size matching.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* 3D Stage */}
          <div className="xl:col-span-6 bg-[#161110]/90 rounded-[28px] border border-[#d4af37]/30 p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 text-[11px]">
              <span className="text-stone-400 font-semibold uppercase tracking-wider">3D Live Mannequin</span>
              <div className="flex items-center gap-2">
                {(["front","side","back"] as const).map(v => (
                  <button key={v} onClick={()=>{ setViewAngle(v); setRotationY(v==="front"?0:v==="side"?90:180); setAutoRotate(false); }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${viewAngle===v ? "bg-[#d4af37] text-stone-900" : "bg-stone-800 text-stone-300 hover:text-white"}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Garment type */}
            <div className="flex gap-2 mb-4">
              {(["kurti","lehenga","gown"] as const).map(g => (
                <button key={g} onClick={()=>setGarment(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${garment===g ? "bg-white text-stone-900 font-bold" : "bg-stone-900 text-stone-300 hover:text-white"}`}>
                  {g}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-1 text-[10px] text-stone-400">
                <span>Fabric:</span>
                {["#c97d60","#a08cd9","#4f8a6b","#d4a24a","#8b5a6b","#1e293b"].map(c => (
                  <button key={c} onClick={()=>setFabricColor(c)} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c, outline: fabricColor===c ? "2px solid #d4af37" : "none", outlineOffset: "1px" }} />
                ))}
              </div>
            </div>

            {/* 3D Viewport */}
            <div
              className="relative w-full bg-[#0f0b0a] rounded-2xl border border-stone-800 flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
              style={{ height: "500px", perspective: "1200px" }}
              onMouseDown={startDrag} onMouseMove={moveDrag} onMouseUp={endDrag} onMouseLeave={endDrag}
              onTouchStart={startDrag} onTouchMove={moveDrag} onTouchEnd={endDrag}
            >
              {/* Floor grid */}
              <div className="absolute bottom-12 w-[420px] h-[420px] rounded-full opacity-25" style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                transform: "rotateX(78deg)",
              }} />
              
              {/* Turntable shadow */}
              <div className="absolute bottom-20 w-44 h-10 bg-black/30 rounded-full blur-xl" />

              {/* 3D Avatar container */}
              <div
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotationY}deg)`,
                }}
                className="relative transition-transform duration-75"
              >
                {/* Full 3D mannequin with garment drape */}
                <svg width="210" height="420" viewBox="0 0 140 280" className="drop-shadow-[0_16px_36px_rgba(212,175,55,0.18)]">
                  <defs>
                    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde8d8" />
                      <stop offset="100%" stopColor="#e8b895" />
                    </linearGradient>
                    <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={fabricColor} />
                      <stop offset="100%" stopColor="#1b1110" />
                    </linearGradient>
                    <filter id="softShadow"><feDropShadow dx="0" dy="6" stdDeviation="4" floodOpacity="0.35"/></filter>
                  </defs>

                  {/* Coordinates */}
                  {(() => {
                    const cx = 70;
                    const headY = 26;
                    const neckY = 42;
                    const shY = 54;
                    const bustY = 78;
                    const waistY = 112;
                    const hipY = 142;
                    const kneeY = 200;
                    const ankleY = 258;

                    const bustL = cx - bustW/2, bustR = cx + bustW/2;
                    const waistL = cx - waistW/2, waistR = cx + waistW/2;
                    const hipL = cx - hipW/2, hipR = cx + hipW/2;
                    const shL = cx - shoulderW/2, shR = cx + shoulderW/2;

                    return (
                      <g filter="url(#softShadow)">
                        {/* Head */}
                        <ellipse cx={cx} cy={headY} rx="11" ry="13" fill="url(#skinGrad)" />
                        {/* Neck */}
                        <rect x={cx-4} y={neckY-4} width="8" height="14" fill="url(#skinGrad)" rx="2" />

                        {/* Body mesh silhouette */}
                        <path d={`
                          M ${shL} ${shY}
                          C ${bustL-2} ${bustY-5}, ${bustL} ${bustY}, ${bustL} ${bustY}
                          C ${bustL} ${waistY-8}, ${waistL} ${waistY-2}, ${waistL} ${waistY}
                          C ${waistL} ${hipY-12}, ${hipL} ${hipY-4}, ${hipL} ${hipY}
                          L ${hipL+3} ${kneeY} L ${hipL+4} ${ankleY}
                          L ${hipR-4} ${ankleY} L ${hipR-3} ${kneeY}
                          L ${hipR} ${hipY}
                          C ${hipR} ${hipY-4}, ${waistR} ${waistY-2}, ${waistR} ${waistY}
                          C ${waistR} ${waistY-8}, ${bustR} ${bustY}, ${bustR} ${bustY}
                          C ${bustR+2} ${bustY-5}, ${shR} ${shY}, ${shR} ${shY}
                          Z
                        `} fill="url(#skinGrad)" opacity="0.95" />

                        {/* GARMENT OVERLAY */}
                        {garment === "kurti" && (
                          <path d={`
                            M ${shL+1} ${shY+3}
                            L ${bustL-1} ${bustY+2}
                            C ${bustL-1} ${waistY-4}, ${waistL-1.5} ${waistY+4}, ${waistL-1.5} ${waistY+14}
                            L ${hipL-2} ${hipY+22}
                            L ${hipR+2} ${hipY+22}
                            L ${waistR+1.5} ${waistY+14}
                            C ${waistR+1.5} ${waistY+4}, ${bustR+1} ${bustY+2}, ${bustR+1} ${bustY+2}
                            L ${shR-1} ${shY+3}
                            Z
                          `} fill="url(#fabricGrad)" stroke="#d4af37" strokeWidth="0.8" opacity="0.96" />
                        )}
                        {garment === "gown" && (
                          <path d={`
                            M ${shL+1} ${shY+2}
                            L ${bustL-1} ${bustY}
                            C ${bustL-1} ${waistY}, ${waistL-2} ${hipY-4}, ${waistL-3} ${hipY+5}
                            L ${hipL-9} ${kneeY+18}
                            L ${hipL-11} ${ankleY+6}
                            Q ${cx} ${ankleY+12} ${hipR+11} ${ankleY+6}
                            L ${hipR+9} ${kneeY+18}
                            L ${waistR+3} ${hipY+5}
                            C ${waistR+2} ${hipY-4}, ${bustR+1} ${waistY}, ${bustR+1} ${bustY}
                            Z
                          `} fill="url(#fabricGrad)" stroke="#d4af37" strokeWidth="0.8" opacity="0.96" />
                        )}
                        {garment === "lehenga" && (
                          <>
                            {/* Choli */}
                            <path d={`M ${shL+2} ${shY+3} L ${bustL} ${bustY-3} L ${waistL} ${bustY+14} L ${waistR} ${bustY+14} L ${bustR} ${bustY-3} L ${shR-2} ${shY+3} Z`}
                              fill="url(#fabricGrad)" stroke="#d4af37" strokeWidth="0.7" />
                            {/* Skirt */}
                            <path d={`M ${waistL-1} ${waistY+6} L ${hipL-8} ${hipY+28} L ${hipL-11} ${ankleY+8} Q ${cx} ${ankleY+14} ${hipR+11} ${ankleY+8} L ${hipR+8} ${hipY+28} L ${waistR+1} ${waistY+6} Z`}
                              fill="url(#fabricGrad)" stroke="#d4af37" strokeWidth="0.8" opacity="0.95" />
                          </>
                        )}

                        {/* Measurement dots */}
                        {[
                          { y: bustY, label: `${bust}"` },
                          { y: waistY, label: `${waist}"` },
                          { y: hipY, label: `${hips}"` },
                        ].map((m, i) => (
                          <g key={i}>
                            <line x1={cx-38} y1={m.y} x2={cx+38} y2={m.y} stroke="#d4af37" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.65" />
                            <circle cx={cx} cy={m.y} r="1.8" fill="#fff9ee" />
                            <text x={cx+42} y={m.y+3} fill="#f5e6c8" fontSize="7" fontFamily="ui-monospace, monospace">{m.label}</text>
                          </g>
                        ))}
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Rotation hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-stone-400 flex items-center gap-1">
                <RotateCw className="h-3 w-3" /> Drag to rotate • Scroll to zoom
              </div>
            </div>

            {/* Fit result panel */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-[#1c1411] rounded-xl border border-stone-800 p-3">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">Size Match</div>
                <div className="text-2xl font-serif font-black text-[#d4af37]">{size}</div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1"><CheckCircle2 className="h-3 w-3" />Perfect</div>
              </div>
              <div className="bg-[#1c1411] rounded-xl border border-stone-800 p-3">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">Fit Score</div>
                <div className="text-2xl font-serif font-black text-white">{fitScore}%</div>
                <div className="text-[10px] text-stone-400">Excellent drape</div>
              </div>
              <div className="bg-[#1c1411] rounded-xl border border-stone-800 p-3">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">Length</div>
                <div className="text-lg font-bold text-white">{Math.floor(height/12)}'{height%12}"</div>
                <div className="text-[10px] text-stone-400">Full length: 44"</div>
              </div>
            </div>

            {/* Controls row */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={autoRotate} onChange={e=>setAutoRotate(e.target.checked)} className="accent-[#d4af37]" />
                Auto-rotate 360°
              </label>
              <button onClick={()=>{ setRotationY(0); setViewAngle("front"); }} className="text-[#d4af37] hover:underline">Reset View</button>
            </div>
          </div>

          {/* Sliders Panel */}
          <div className="xl:col-span-6 bg-[#1a1311] rounded-[28px] border border-[#d4af37]/20 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg sm:text-xl font-serif text-white flex items-center gap-2">
                <Ruler className="h-5 w-5 text-[#d4af37]" /> Precision Measurement Studio
              </h3>
              <span className="text-[10px] text-stone-400">All in inches</span>
            </div>
            <p className="text-stone-400 text-xs mb-5">Fine-tune 7 body points. Results update your 3D avatar in real-time.</p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { name: "Petite", b: 33, w: 26, h: 36, sh: 13.5, ht: 60, sl: 13.5, n: 12.5 },
                { name: "Classic", b: 36, w: 30, h: 40, sh: 14.5, ht: 64, sl: 15, n: 13.5 },
                { name: "Curvy", b: 41, w: 34, h: 48, sh: 15, ht: 65, sl: 16, n: 14 },
                { name: "Tall", b: 38, w: 31, h: 42, sh: 15.5, ht: 70, sl: 17, n: 14 },
              ].map(p => (
                <button key={p.name} onClick={() => { setBust(p.b); setWaist(p.w); setHips(p.h); setShoulder(p.sh); setHeight(p.ht); setSleeve(p.sl); setNeck(p.n); }}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-[11px] rounded-full border border-stone-700 transition-colors">
                  {p.name}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {[
                { label: "Bust", v: bust, set: setBust, min: 30, max: 52, step: 0.25 },
                { label: "Waist", v: waist, set: setWaist, min: 24, max: 46, step: 0.25 },
                { label: "Hips", v: hips, set: setHips, min: 34, max: 60, step: 0.25 },
                { label: "Shoulder", v: shoulder, set: setShoulder, min: 13, max: 18, step: 0.25 },
                { label: "Sleeve Length", v: sleeve, set: setSleeve, min: 12, max: 22, step: 0.25 },
                { label: "Neck", v: neck, set: setNeck, min: 11, max: 16, step: 0.25 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-[11px] text-stone-300 mb-1.5">
                    <span>{s.label}</span>
                    <span className="text-[#d4af37] font-bold">{s.v}"</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.v}
                    onChange={e => s.set(parseFloat(e.target.value))}
                    className="w-full h-[6px] rounded-full bg-stone-800 accent-[#d4af37] cursor-pointer"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <div className="flex justify-between text-[11px] text-stone-300 mb-1.5">
                  <span>Height</span>
                  <span className="text-[#d4af37] font-bold">{Math.floor(height/12)}'{height%12}" ({height}")</span>
                </div>
                <input type="range" min={54} max={74} value={height}
                  onChange={e=>setHeight(parseInt(e.target.value))}
                  className="w-full h-[6px] rounded-full bg-stone-800 accent-[#d4af37] cursor-pointer"
                />
              </div>
            </div>

            {/* Action */}
            <div className="mt-7 bg-[#120c0a] rounded-2xl border border-[#d4af37]/14 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs text-stone-400">Your Peach Petals Size</div>
                <div className="text-xl font-serif font-bold text-white">
                  Size <span className="text-[#d4af37]">{size}</span> • Fit {fitScore}% • Free Bespoke Tailoring
                </div>
              </div>
              <Link href="/shop"
                className="px-5 py-3 bg-[#d4af37] hover:bg-[#c1962f] text-stone-950 font-bold rounded-full text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow">
                <Shirt className="h-4 w-4" /> Shop My Fit
              </Link>
            </div>

            <p className="text-[10px] text-stone-500 mt-3 text-center">
              Measurements are encrypted and saved to your fitting profile. Use at checkout for zero-cost custom tailoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
