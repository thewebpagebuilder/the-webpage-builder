"use client";
import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";

// ----- Coder Character (made from Three.js primitives) -----
function CoderCharacter({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);

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
      <mesh position={[0, -1.2, -0.2]}>
        <boxGeometry args={[0.9, 0.08, 0.7]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Chair back */}
      <mesh position={[0, -0.5, -0.5]}>
        <boxGeometry args={[0.85, 1.3, 0.06]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Chair legs */}
      {[[-0.35, -1.6, -0.25], [0.35, -1.6, -0.25], [-0.35, -1.6, 0.15], [0.35, -1.6, 0.15]].map((pos, i) => (
        <mesh key={`leg-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
          <meshStandardMaterial color="#0d0d1a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Body / Hoodie */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.75, 1.0, 0.5]} />
        <meshStandardMaterial color="#162033" metalness={0.2} roughness={0.7} />
      </mesh>
      {/* Hoodie hood (behind head) */}
      <mesh position={[0, 0.25, -0.15]}>
        <sphereGeometry args={[0.38, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#162033" metalness={0.2} roughness={0.7} />
      </mesh>
      {/* Hoodie pocket */}
      <mesh position={[0, -0.7, 0.26]}>
        <boxGeometry args={[0.35, 0.18, 0.01]} />
        <meshStandardMaterial color="#1a2740" />
      </mesh>
      {/* Hoodie logo (TWB dot) */}
      <mesh position={[0.15, -0.2, 0.26]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.5} />
      </mesh>

      {/* HEAD GROUP (tracks mouse) */}
      <group ref={headRef} position={[0, 0.55, 0.05]}>
        {/* Head */}
        <mesh>
          <boxGeometry args={[0.5, 0.55, 0.45]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.2, -0.05]}>
          <boxGeometry args={[0.53, 0.3, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Hair top */}
        <mesh position={[0, 0.32, 0.03]}>
          <boxGeometry args={[0.5, 0.12, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Glasses frame */}
        <group position={[0, 0.02, 0.23]}>
          {/* Left lens */}
          <mesh position={[-0.12, 0, 0]}>
            <boxGeometry args={[0.17, 0.12, 0.02]} />
            <meshStandardMaterial color="#0d1520" metalness={0.8} roughness={0.1} transparent opacity={0.7} />
          </mesh>
          {/* Right lens */}
          <mesh position={[0.12, 0, 0]}>
            <boxGeometry args={[0.17, 0.12, 0.02]} />
            <meshStandardMaterial color="#0d1520" metalness={0.8} roughness={0.1} transparent opacity={0.7} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 0.02, 0.02]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Lens shine */}
          <mesh position={[-0.12, 0.02, 0.015]}>
            <boxGeometry args={[0.05, 0.03, 0.001]} />
            <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.3} transparent opacity={0.4} />
          </mesh>
        </group>
        {/* Eyes */}
        <mesh position={[-0.11, 0.02, 0.23]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.11, 0.02, 0.23]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.11, 0.02, 0.255]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.11, 0.02, 0.255]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Mouth (slight smile) */}
        <mesh position={[0, -0.12, 0.22]}>
          <boxGeometry args={[0.12, 0.025, 0.01]} />
          <meshStandardMaterial color="#c4856a" />
        </mesh>
        {/* Headphones */}
        <mesh position={[0, 0.15, 0]}>
          <torusGeometry args={[0.32, 0.025, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Earcups */}
        <mesh position={[-0.31, 0, 0]}>
          <boxGeometry args={[0.06, 0.14, 0.1]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.31, 0, 0]}>
          <boxGeometry args={[0.06, 0.14, 0.1]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Earcup pads (teal accent) */}
        <mesh position={[-0.28, 0, 0]}>
          <boxGeometry args={[0.01, 0.1, 0.07]} />
          <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.28, 0, 0]}>
          <boxGeometry args={[0.01, 0.1, 0.07]} />
          <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={rightArmRef} position={[0.55, -0.35, 0.15]}>
        <mesh>
          <boxGeometry args={[0.2, 0.7, 0.2]} />
          <meshStandardMaterial color="#162033" metalness={0.2} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.4, 0.05]}>
          <boxGeometry args={[0.14, 0.14, 0.12]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
      </group>

      <group ref={leftArmRef} position={[-0.55, -0.35, 0.15]}>
        <mesh>
          <boxGeometry args={[0.2, 0.7, 0.2]} />
          <meshStandardMaterial color="#162033" metalness={0.2} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.4, 0.05]}>
          <boxGeometry args={[0.14, 0.14, 0.12]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
      </group>

      {/* Laptop */}
      <group position={[0, -0.8, 0.55]}>
        {/* Laptop base */}
        <mesh rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[1.0, 0.04, 0.65]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Keyboard area */}
        <mesh position={[0, 0.025, 0]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.85, 0.005, 0.5]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Key rows */}
        {[0.12, 0.04, -0.04, -0.12].map((z, ri) =>
          Array.from({ length: 10 }).map((_, ci) => (
            <mesh key={`key-${ri}-${ci}`} position={[-0.36 + ci * 0.08, 0.03, z]} rotation={[-0.15, 0, 0]}>
              <boxGeometry args={[0.055, 0.008, 0.055]} />
              <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
            </mesh>
          ))
        )}
        {/* Laptop screen */}
        <group position={[0, 0.5, -0.3]} rotation={[-0.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.68, 0.03]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Screen display */}
          <mesh position={[0, 0.01, 0.02]}>
            <boxGeometry args={[0.88, 0.56, 0.005]} />
            <meshStandardMaterial
              color="#0a1628"
              emissive="#2dd4a8"
              emissiveIntensity={screenBrightness * 0.15}
            />
          </mesh>
          {/* Code lines on screen */}
          {[0.2, 0.13, 0.06, -0.01, -0.08, -0.15, -0.22].map((y, i) => (
            <mesh key={`code-${i}`} position={[-0.1 + (i % 3) * 0.05, y, 0.025]}>
              <boxGeometry args={[0.25 + Math.sin(i * 1.7) * 0.15, 0.018, 0.001]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#2dd4a8" : i % 3 === 1 ? "#d4a82d" : "#6b8cce"}
                emissive={i % 3 === 0 ? "#2dd4a8" : i % 3 === 1 ? "#d4a82d" : "#6b8cce"}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
          {/* Screen glow */}
          <pointLight position={[0, 0, 0.8]} color="#2dd4a8" intensity={3} distance={3} decay={2} />
        </group>
      </group>

      {/* Coffee mug */}
      <group position={[0.75, -0.85, 0.55]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.06, 0.16, 8]} />
          <meshStandardMaterial color="#e8e2d8" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 0.02, 0]}>
          <torusGeometry args={[0.04, 0.012, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#e8e2d8" roughness={0.9} />
        </mesh>
        {/* Steam */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Plant pot */}
      <group position={[-0.8, -0.85, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.06, 0.14, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.9} />
        </mesh>
        {/* Plant leaves */}
        {[0, 0.7, 1.4, 2.1, 2.8].map((angle, i) => (
          <mesh key={`leaf-${i}`} position={[Math.cos(angle) * 0.04, 0.12 + i * 0.03, Math.sin(angle) * 0.04]} rotation={[Math.sin(angle) * 0.4, angle, 0]}>
            <boxGeometry args={[0.08, 0.02, 0.04]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#2dd4a8" : "#1fb88c"} />
          </mesh>
        ))}
      </group>
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

// ----- Hero-embedded version (no section wrapper, just the 3D canvas) -----
export function HeroFloatingCoder() {
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

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-full">
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
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
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
  );
}

// ----- Standalone section version (kept for re-use) -----
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
          <div className="py-16 sm:py-20 lg:py-0">
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
          </div>

          {/* Right: 3D Canvas */}
          <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-full w-full relative">
            {isMobile ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center text-5xl">👨‍💻</div>
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
