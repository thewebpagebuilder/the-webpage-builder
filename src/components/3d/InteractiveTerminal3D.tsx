"use client";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const CODE_LINES = [
  { text: "const agency = new WebpageBuilder();", color: "#2dd4a8", indent: 0 },
  { text: "agency.setGoal('build_extraordinary');", color: "#d4a82d", indent: 1 },
  { text: "await agency.deploy({ env: 'production' });", color: "#6b8cce", indent: 1 },
  { text: "// Result: 100/100 Lighthouse", color: "#555", indent: 0 },
  { text: "console.log(agency.revenue); // +∞", color: "#ec4899", indent: 0 },
];

// A glowing terminal line segment (box)
function TerminalLine({ y, width, color, delay }: {
  y: number; width: number; color: string; delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime - delay;
    if (t > 0) {
      setProgress(Math.min(t * 1.5, 1));
    }
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[-1.2 + (width * progress) / 2, y, 0.06]}>
      <boxGeometry args={[width * progress, 0.04, 0.005]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  );
}

// Blinking cursor
function BlinkingCursor() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.visible = Math.sin(state.clock.elapsedTime * 4) > 0;
    }
  });

  return (
    <mesh ref={meshRef} position={[0.2, -0.58, 0.06]}>
      <boxGeometry args={[0.04, 0.07, 0.005]} />
      <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={1} />
    </mesh>
  );
}

// Terminal window object
function TerminalWindow({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY * 0.15,
        0.05
      );
    }
  });

  return (
    <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0.05}>
      <group ref={groupRef}>
        {/* Terminal body */}
        <mesh>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#060d16" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Terminal header */}
        <mesh position={[0, 0.9, 0.055]}>
          <boxGeometry args={[3.2, 0.3, 0.01]} />
          <meshStandardMaterial color="#0d1520" />
        </mesh>

        {/* Traffic light dots */}
        {[-1.35, -1.2, -1.05].map((x, i) => (
          <mesh key={i} position={[x, 0.9, 0.07]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color={["#e74c3c", "#f39c12", "#2dd4a8"][i]}
              emissive={["#e74c3c", "#f39c12", "#2dd4a8"][i]}
              emissiveIntensity={0.7}
            />
          </mesh>
        ))}

        {/* Title text dots */}
        <mesh position={[0, 0.9, 0.07]}>
          <boxGeometry args={[0.6, 0.04, 0.005]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Code lines rendered as colored boxes */}
        {CODE_LINES.map((line, i) => (
          <TerminalLine
            key={i}
            y={0.55 - i * 0.28}
            width={0.04 + (line.text.length / 45) * 2.0}
            color={line.color}
            delay={i * 0.5}
          />
        ))}

        {/* Line number gutter */}
        {CODE_LINES.map((_, i) => (
          <mesh key={`ln-${i}`} position={[-1.4, 0.55 - i * 0.28, 0.06]}>
            <boxGeometry args={[0.04, 0.025, 0.005]} />
            <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.3} />
          </mesh>
        ))}

        <BlinkingCursor />

        {/* Subtle scanlines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`sl-${i}`} position={[0, 0.65 - i * 0.16, 0.06]}>
            <boxGeometry args={[3.0, 0.005, 0.001]} />
            <meshStandardMaterial color="#2dd4a8" transparent opacity={0.04} />
          </mesh>
        ))}

        {/* Corner glow */}
        <pointLight position={[0, 0, 1.5]} color="#2dd4a8" intensity={2} distance={4} decay={2} />
        <pointLight position={[-1.5, 0.8, 1]} color="#6b8cce" intensity={1} distance={3} decay={2} />
      </group>
    </Float>
  );
}

// Floating decorative mini spheres
function FloatingMiniSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[
        [-2.8, 0.5, -0.5, "#2dd4a8"],
        [2.9, -0.3, -0.5, "#d4a82d"],
        [-2.5, -1.0, 0, "#6b8cce"],
        [2.6, 1.2, 0, "#ec4899"],
      ].map(([x, y, z, color], i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={0.5}>
          <mesh position={[x as number, y as number, z as number]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial
              color={color as string}
              emissive={color as string}
              emissiveIntensity={0.8}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function InteractiveTerminal3D() {
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-muted-foreground font-mono text-xs sm:text-sm block mb-3 sm:mb-4">/ Code That Ships</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-3 px-2">
            Clean code. <span className="text-primary">Exceptional results.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-light max-w-lg mx-auto px-2">
            Every line we write is production-ready, documented, and scalable. We don't ship tech debt — we ship products people love.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="h-[320px] sm:h-[400px] md:h-[480px] w-full">
          {isMobile ? (
            // Mobile fallback
            <div className="h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 font-mono text-sm max-w-sm w-full"
              >
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                {CODE_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="text-xs leading-relaxed"
                    style={{ color: line.color, paddingLeft: `${line.indent * 16}px` }}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          ) : (
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                <TerminalWindow mouseX={mouseX} mouseY={mouseY} />
                <FloatingMiniSpheres />
              </Suspense>
            </Canvas>
          )}
        </div>

        {/* Stats below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-3xl mx-auto">
          {[
            { value: "0", label: "Security Breaches (ever)" },
            { value: "100", label: "Lighthouse Score (avg)" },
            { value: "<2s", label: "Avg. Load Time" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
