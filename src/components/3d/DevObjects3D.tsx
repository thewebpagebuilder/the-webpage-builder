"use client";
import { useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useIsMobile } from "@/hooks/useMediaQuery";

// List of standard tech stack logo URLs
const TECH_LOGOS = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg"
];

function FloatingTechLogo({ url, position, scale = 1, speed = 1 }: {
  url: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  return (
    <Float
      speed={speed} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
      position={position}
    >
      <Html center transform scale={scale * 0.45} className="pointer-events-none drop-shadow-2xl">
        <div className="bg-zinc-900/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(45,212,168,0.15)] flex items-center justify-center">
          {url.includes("nextjs") || url.includes("amazonwebservices") || url.includes("threejs") ? (
            <img src={url} alt="tech logo" className="w-16 h-16 object-contain filter invert" />
          ) : (
            <img src={url} alt="tech logo" className="w-16 h-16 object-contain" />
          )}
        </div>
      </Html>
    </Float>
  );
}

function ScrollTracker({ setScrollY }: { setScrollY: (y: number) => void }) {
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollY]);

  const { camera } = useThree();
  useFrame(() => {
    // Smooth camera follow for scroll
    camera.position.y = - (window.scrollY * 0.015);
  });
  return null;
}

export function DevObjects3D() {
  const isMobile = useIsMobile();
  const [, setScrollY] = useState(0); // force rerenders if strictly needed, but camera mutates directly

  const logoInstances = useMemo(() => {
    const instances = [];
    const count = isMobile ? 15 : 35; // Total logos to spread across page
    
    // Spread them over a Y range that corresponds to the page height scroll
    // A typical page might be 10000px tall. 10000 * 0.015 = 150 units in Y.
    // So we spread them from Y=10 to Y=-160
    for (let i = 0; i < count; i++) {
      const randomLogo = TECH_LOGOS[Math.floor(Math.random() * TECH_LOGOS.length)];
      instances.push({
        id: i,
        url: randomLogo,
        position: [
          (Math.random() - 0.5) * (isMobile ? 12 : 25), // Spread wider
          10 - (Math.random() * 170), // Spread vertically over 170 units downwards
          (Math.random() - 0.5) * 10 - 4 // Depth
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 0.6,
        speed: 1.5 + Math.random() * 2
      });
    }
    return instances;
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-70">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <ScrollTracker setScrollY={setScrollY} />
        {logoInstances.map((props) => (
          <FloatingTechLogo key={props.id} {...props} />
        ))}
      </Canvas>
    </div>
  );
}
