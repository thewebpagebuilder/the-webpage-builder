"use client";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const TECH_NODES = [
  { label: "React", icon: "react", color: "#61DAFB", phi: 0.5, theta: 0.5 },
  { label: "Next.js", icon: "nextdotjs", color: "#ffffff", phi: 1.2, theta: 1.8 },
  { label: "Three.js", icon: "threedotjs", color: "#ffffff", phi: 0.8, theta: 3.5 },
  { label: "TypeScript", icon: "typescript", color: "#3178C6", phi: 1.5, theta: 0.8 },
  { label: "Node.js", icon: "nodedotjs", color: "#339933", phi: 0.3, theta: 2.4 },
  { label: "Python", icon: "python", color: "#3776AB", phi: 2.1, theta: 1.2 },
  { label: "Rust", icon: "rust", color: "#ffffff", phi: 1.0, theta: 4.5 },
  { label: "Docker", icon: "docker", color: "#2496ED", phi: 1.8, theta: 5.2 },
  { label: "AWS", icon: "amazonaws", color: "#ffffff", phi: 0.6, theta: 1.0 },
  { label: "Go", icon: "go", color: "#00ADD8", phi: 1.3, theta: 2.8 },
  { label: "Swift", icon: "swift", color: "#F05138", phi: 2.3, theta: 4.0 },
  { label: "Firebase", icon: "firebase", color: "#FFCA28", phi: 0.9, theta: 5.8 },
  { label: "Supabase", icon: "supabase", color: "#3ECF8E", phi: 1.7, theta: 3.2 },
  { label: "TailwindCSS", icon: "tailwindcss", color: "#06B6D4", phi: 2.6, theta: 1.5 },
  { label: "PostgreSQL", icon: "postgresql", color: "#4169E1", phi: 0.4, theta: 4.2 },
  { label: "MongoDB", icon: "mongodb", color: "#47A248", phi: 1.1, theta: 6.0 },
  { label: "Redis", icon: "redis", color: "#DC382D", phi: 2.2, theta: 2.1 },
  { label: "GraphQL", icon: "graphql", color: "#E10098", phi: 1.4, theta: 5.5 },
  { label: "Vercel", icon: "vercel", color: "#ffffff", phi: 0.7, theta: 2.2 },
  { label: "Figma", icon: "figma", color: "#F24E1E", phi: 1.9, theta: 0.5 },
  { label: "Framer", icon: "framer", color: "#0055FF", phi: 2.5, theta: 4.8 },
  { label: "Git", icon: "git", color: "#F05032", phi: 0.2, theta: 1.6 },
  { label: "GitHub", icon: "github", color: "#ffffff", phi: 1.6, theta: 1.1 },
  { label: "GitLab", icon: "gitlab", color: "#FC6D26", phi: 2.4, theta: 2.9 },
  { label: "Linux", icon: "linux", color: "#FCC624", phi: 0.5, theta: 3.9 },
  { label: "Ubuntu", icon: "ubuntu", color: "#E95420", phi: 1.2, theta: 4.9 },
  { label: "Kubernetes", icon: "kubernetes", color: "#326CE5", phi: 2.0, theta: 5.7 },
  { label: "Terraform", icon: "terraform", color: "#844FBA", phi: 0.8, theta: 0.3 },
  { label: "Stripe", icon: "stripe", color: "#008CDD", phi: 1.5, theta: 2.5 },
  { label: "WebGL", icon: "webgl", color: "#990000", phi: 2.7, theta: 3.8 },
  { label: "WebAssembly", icon: "webassembly", color: "#654FF0", phi: 0.6, theta: 5.1 },
  { label: "Svelte", icon: "svelte", color: "#FF3E00", phi: 1.3, theta: 0.9 },
  { label: "Vue.js", icon: "vuedotjs", color: "#4FC08D", phi: 2.1, theta: 3.6 },
  { label: "Angular", icon: "angular", color: "#DD0031", phi: 0.4, theta: 2.7 },
  { label: "Django", icon: "django", color: "#ffffff", phi: 1.1, theta: 1.4 },
  { label: "Flask", icon: "flask", color: "#ffffff", phi: 1.8, theta: 4.4 },
  { label: "FastAPI", icon: "fastapi", color: "#009688", phi: 2.5, theta: 1.9 },
  { label: "Spring", icon: "spring", color: "#6DB33F", phi: 0.9, theta: 0.7 },
  { label: "Laravel", icon: "laravel", color: "#FF2D20", phi: 1.7, theta: 5.0 },
  { label: "Ruby", icon: "ruby", color: "#CC342D", phi: 2.3, theta: 0.2 },
  { label: "Elixir", icon: "elixir", color: "#4E2A8E", phi: 1.0, theta: 2.0 },
];

// Convert spherical to cartesian
function sphericalToCartesian(phi: number, theta: number, radius: number): [number, number, number] {
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

// Single orbiting tech node
function TechNode({ phi, theta, color, time, icon, label }: {
  phi: number;
  theta: number;
  color: string;
  time: number;
  icon: string;
  label: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const animTheta = theta + time * 0.15;
  const pos = sphericalToCartesian(phi, animTheta, 2.4);

  return (
    <group position={pos} ref={meshRef}>
      <Html center transform={false}>
        <div 
          className="flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg shadow-black/20"
          style={{ width: '36px', height: '36px' }}
          title={label}
        >
          <img 
            src={`https://cdn.simpleicons.org/${icon}/${color.replace('#', '')}`} 
            alt={label} 
            style={{ width: '20px', height: '20px', objectFit: 'contain' }} 
            draggable={false}
          />
        </div>
      </Html>
    </group>
  );
}

// Orbital connection lines (sphere wireframe)
function OrbitalLines() {
  return (
    <>
      {[1.5, 2.0, 2.5].map((r, i) => (
        <mesh key={i} rotation={[i * 0.6, i * 0.4, i * 0.2]}>
          <sphereGeometry args={[r, 16, 12]} />
          <meshStandardMaterial
            color="#2dd4a8"
            wireframe
            transparent
            opacity={0.06 - i * 0.01}
          />
        </mesh>
      ))}
    </>
  );
}

// Central sphere (planet core)
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.85, 3]} />
        <meshStandardMaterial
          color="#0d1520"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>
      {/* Inner glow shell */}
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshStandardMaterial
          color="#2dd4a8"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#2dd4a8" intensity={3} distance={5} decay={2} />
    </Float>
  );
}

function TechOrbitScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.5,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.3,
        0.02
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#ffffff" />

      <group ref={groupRef}>
        <OrbitalLines />
        <CoreSphere />
        {TECH_NODES.map((node, i) => (
          <TechNode key={i} {...node} time={time} />
        ))}
      </group>
    </>
  );
}

export function TechOrbit() {
  const isMobile = useIsMobile();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container px-5 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[350px] sm:h-[450px] md:h-[500px] relative"
          >
            {isMobile ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "20s" }} />
                  <div className="absolute inset-6 rounded-full border border-accent/20 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">🌐</div>
                </div>
              </div>
            ) : (
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
                <Suspense fallback={null}>
                  <TechOrbitScene mouseX={mouseX} mouseY={mouseY} />
                </Suspense>
              </Canvas>
            )}
          </motion.div>

          {/* Right: Text + tech list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Tech Orbit</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-5 leading-[1.05]">
              40+ technologies.<br />
              <span className="text-primary">One unified stack.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed mb-8 max-w-md">
              Our tech arsenal spans the full spectrum — from pixel-perfect frontend to ultra-scalable infrastructure. We pick the right tool for every problem.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { cat: "Frontend", techs: "React · Next.js · Three.js" },
                { cat: "Backend", techs: "Node.js · Go · Rust" },
                { cat: "Infrastructure", techs: "AWS · K8s · Terraform" },
                { cat: "AI & Data", techs: "GPT · LangChain · RAG" },
              ].map(({ cat, techs }) => (
                <div key={cat} className="p-3 sm:p-4 rounded-xl bg-card border border-border">
                  <h4 className="text-foreground font-semibold text-xs sm:text-sm mb-1">{cat}</h4>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">{techs}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
