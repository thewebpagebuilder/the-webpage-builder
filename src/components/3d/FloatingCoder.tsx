"use client";
import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

// ----- Coder Character (made from Three.js primitives) -----
function CoderCharacter({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  // Subtle screen flicker
  const [screenBrightness, setScreenBrightness] = useState(0.7);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Character body bobs slightly
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.04;
    }

    // Head tracks mouse
    if (headRef.current) {
      const targetRotY = mouseX * 0.35;
      const targetRotX = -mouseY * 0.25;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
    }

    // Typing animation on right arm
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(t * 8) * 0.08 + 0.3;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 8 + Math.PI) * 0.08 + 0.3;
    }

    // Screen flicker
    setScreenBrightness(0.65 + Math.sin(t * 0.4) * 0.08 + Math.random() * 0.01);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Chair */}
      <mesh position={[0, -2.1, 0.1]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, -1.65, -0.45]}>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial color="#16213e" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Desk */}
      <mesh position={[0, -0.85, 0.3]}>
        <boxGeometry args={[2.8, 0.08, 1.2]} />
        <meshStandardMaterial color="#0f3460" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Desk leg */}
      <mesh position={[0, -1.6, 0.4]}>
        <boxGeometry args={[0.08, 1.5, 0.08]} />
        <meshStandardMaterial color="#0f3460" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Laptop base */}
      <mesh position={[0, -0.77, 0.2]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.2, 0.06, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Laptop screen */}
      <group position={[0, -0.5, -0.2]} rotation={[-1.0, 0, 0]}>
        {/* Screen bezel */}
        <mesh>
          <boxGeometry args={[1.2, 0.75, 0.04]} />
          <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Screen glass */}
        <mesh ref={screenRef} position={[0, 0, 0.03]}>
          <boxGeometry args={[1.1, 0.65, 0.01]} />
          <meshStandardMaterial
            color={new THREE.Color(0.08, 0.55, 0.45).multiplyScalar(screenBrightness)}
            emissive={new THREE.Color(0.05, 0.4, 0.35)}
            emissiveIntensity={screenBrightness}
            roughness={0.0}
            metalness={0.0}
          />
        </mesh>
        {/* Code lines on screen */}
        {[-0.22, -0.1, 0.02, 0.14, 0.25].map((y, i) => (
          <mesh key={i} position={[-0.1 + Math.sin(i * 1.5) * 0.1, y, 0.04]}>
            <boxGeometry args={[0.3 + Math.cos(i) * 0.2, 0.025, 0.001]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#2dd4a8" : "#d4a82d"}
              emissive={i % 2 === 0 ? "#2dd4a8" : "#d4a82d"}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Body */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.85, 0.9, 0.45]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Hoodie detail */}
      <mesh position={[0, 0.1, 0.21]}>
        <boxGeometry args={[0.4, 0.3, 0.02]} />
        <meshStandardMaterial color="#152a44" metalness={0.05} roughness={0.9} />
      </mesh>

      {/* Left arm */}
      <group ref={leftArmRef} position={[-0.55, -0.15, 0.1]} rotation={[0.3, 0, 0.1]}>
        <mesh position={[0, -0.3, 0.1]}>
          <boxGeometry args={[0.22, 0.6, 0.22]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.65, 0.2]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#c9a87c" metalness={0.0} roughness={0.9} />
        </mesh>
      </group>

      {/* Right arm */}
      <group ref={rightArmRef} position={[0.55, -0.15, 0.1]} rotation={[0.3, 0, -0.1]}>
        <mesh position={[0, -0.3, 0.1]}>
          <boxGeometry args={[0.22, 0.6, 0.22]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.65, 0.2]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#c9a87c" metalness={0.0} roughness={0.9} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 0.28, 0.05]}>
        <cylinderGeometry args={[0.14, 0.16, 0.25, 12]} />
        <meshStandardMaterial color="#c9a87c" metalness={0.0} roughness={0.9} />
      </mesh>

      {/* Head group — tracks mouse */}
      <group ref={headRef} position={[0, 0.72, 0]}>
        {/* Head */}
        <mesh>
          <boxGeometry args={[0.6, 0.65, 0.55]} />
          <meshStandardMaterial color="#c9a87c" metalness={0.0} roughness={0.85} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.3, -0.05]}>
          <boxGeometry args={[0.63, 0.18, 0.58]} />
          <meshStandardMaterial color="#1a0a00" metalness={0.0} roughness={0.9} />
        </mesh>
        <mesh position={[-0.3, 0.22, 0]}>
          <boxGeometry args={[0.08, 0.25, 0.55]} />
          <meshStandardMaterial color="#1a0a00" metalness={0.0} roughness={0.9} />
        </mesh>
        <mesh position={[0.3, 0.22, 0]}>
          <boxGeometry args={[0.08, 0.25, 0.55]} />
          <meshStandardMaterial color="#1a0a00" metalness={0.0} roughness={0.9} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.15, 0.05, 0.28]}>
          <boxGeometry args={[0.13, 0.09, 0.02]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.28]}>
          <boxGeometry args={[0.13, 0.09, 0.02]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Glasses */}
        <mesh position={[-0.15, 0.05, 0.29]}>
          <torusGeometry args={[0.085, 0.015, 8, 16]} />
          <meshStandardMaterial color="#2dd4a8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.15, 0.05, 0.29]}>
          <torusGeometry args={[0.085, 0.015, 8, 16]} />
          <meshStandardMaterial color="#2dd4a8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glasses bridge */}
        <mesh position={[0, 0.05, 0.29]}>
          <boxGeometry args={[0.13, 0.015, 0.01]} />
          <meshStandardMaterial color="#2dd4a8" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Mouth / tiny smile */}
        <mesh position={[0, -0.15, 0.28]}>
          <boxGeometry args={[0.18, 0.025, 0.01]} />
          <meshStandardMaterial color="#a07050" />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.31, 0, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#c9a87c" metalness={0.0} roughness={0.9} />
        </mesh>
        <mesh position={[0.31, 0, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#c9a87c" metalness={0.0} roughness={0.9} />
        </mesh>

        {/* Headphones */}
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.37, 0.04, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#0d1520" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.37, 0.08, 0]}>
          <boxGeometry args={[0.12, 0.18, 0.1]} />
          <meshStandardMaterial color="#0d1520" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.37, 0.08, 0]}>
          <boxGeometry args={[0.12, 0.18, 0.1]} />
          <meshStandardMaterial color="#0d1520" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Coffee mug on desk */}
      <group position={[0.9, -0.78, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.08, 0.22, 12]} />
          <meshStandardMaterial color="#e74c3c" metalness={0.1} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.02, 12]} />
          <meshStandardMaterial color="#5c1a1a" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.13, -0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.015, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#e74c3c" metalness={0.1} roughness={0.7} />
        </mesh>
      </group>

      {/* Potted plant on desk */}
      <group position={[-0.95, -0.72, 0.25]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#5c2d0a" />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="#2d7a20" metalness={0.0} roughness={0.9} />
        </mesh>
      </group>

      {/* Screen glow light */}
      <pointLight
        position={[0, -0.4, 0.5]}
        color="#2dd4a8"
        intensity={screenBrightness * 4}
        distance={3}
        decay={2}
      />
    </group>
  );
}

// ----- Floating particles around the scene -----
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(
      Array.from({ length: 80 }, () => [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ]).flat()
    );
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.04} color="#2dd4a8" transparent opacity={0.5} />
    </points>
  );
}

// ----- Main exported section -----
export function FloatingCoderSection() {
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
    <section className="relative py-0 bg-background overflow-hidden border-t border-border">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container px-5 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[550px] sm:min-h-[600px] md:min-h-[700px]">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="py-16 sm:py-20 lg:py-0"
          >
            <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-5 sm:mb-6">
              👾 Meet the Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-5 leading-[1.05]">
              Senior engineers,<br />
              <span className="text-primary">not juniors.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed max-w-md mb-8">
              Every project is handled by a senior-level engineer who ships clean, scalable code. No middlemen, no juniors learning on your dime — just craftsmanship.
            </p>
            <div className="flex flex-wrap gap-3">
              {["TypeScript", "React", "Three.js", "Rust", "Go", "AI/ML"].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Canvas */}
          <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-full w-full relative">
            {isMobile ? (
              // CSS fallback for mobile
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div
                    className="absolute inset-0 rounded-full bg-primary/10 animate-ping"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center text-5xl">
                    👨‍💻
                  </div>
                </div>
              </div>
            ) : (
              <Canvas
                camera={{ position: [0, 0, 5.5], fov: 42 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, powerPreference: "high-performance" }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
                  <pointLight position={[-4, 3, 2]} intensity={6} color="#d4a82d" distance={10} decay={2} />
                  <pointLight position={[4, -2, 2]} intensity={4} color="#6b8cce" distance={8} decay={2} />
                  <FloatingParticles />
                  <CoderCharacter mouseX={mouseX} mouseY={mouseY} />
                </Suspense>
              </Canvas>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
