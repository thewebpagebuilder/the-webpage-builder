"use client";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const TECH_NODES = [
  { label: "React", color: "#61dafb", phi: 0.5, theta: 0.5 },
  { label: "Next.js", color: "#ffffff", phi: 1.2, theta: 1.8 },
  { label: "Three.js", color: "#2dd4a8", phi: 0.8, theta: 3.5 },
  { label: "TypeScript", color: "#3178c6", phi: 1.5, theta: 0.8 },
  { label: "Node.js", color: "#68a063", phi: 0.3, theta: 2.4 },
  { label: "Python", color: "#f7c542", phi: 2.1, theta: 1.2 },
  { label: "Rust", color: "#e74c3c", phi: 1.0, theta: 4.5 },
  { label: "GSAP", color: "#88ce02", phi: 2.5, theta: 3.0 },
  { label: "Docker", color: "#2496ed", phi: 1.8, theta: 5.2 },
  { label: "AWS", color: "#f59e0b", phi: 0.6, theta: 1.0 },
  { label: "Go", color: "#00acd7", phi: 1.3, theta: 2.8 },
  { label: "Swift", color: "#f05138", phi: 2.3, theta: 4.0 },
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
function TechNode({ phi, theta, color, time }: {
  phi: number;
  theta: number;
  color: string;
  time: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const animTheta = theta + time * 0.25;
  const pos = sphericalToCartesian(phi, animTheta, 2.4);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group position={pos}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={1.5} decay={2} />
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
