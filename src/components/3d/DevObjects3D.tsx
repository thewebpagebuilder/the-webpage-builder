"use client";
import { useRef, Suspense, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";

// ----- 3D Browser Window -----
function BrowserWindow({ position, rotation, scale = 1 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Browser frame */}
      <mesh>
        <boxGeometry args={[2, 1.4, 0.06]} />
        <meshStandardMaterial color="#0d1520" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Address bar */}
      <mesh position={[0, 0.56, 0.04]}>
        <boxGeometry args={[1.8, 0.14, 0.02]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Browser dots */}
      {[-0.82, -0.72, -0.62].map((x, i) => (
        <mesh key={i} position={[x, 0.56, 0.05]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={["#e74c3c", "#f39c12", "#2dd4a8"][i]}
            emissive={["#e74c3c", "#f39c12", "#2dd4a8"][i]}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      {/* Screen content */}
      <mesh position={[0, -0.08, 0.04]}>
        <boxGeometry args={[1.85, 1.05, 0.01]} />
        <meshStandardMaterial color="#0a1628" emissive="#0a1628" emissiveIntensity={0.3} />
      </mesh>
      {/* Code lines on screen */}
      {[0.28, 0.14, 0.0, -0.14, -0.28, -0.42].map((y, i) => (
        <mesh key={i} position={[-0.1 + (i % 2) * 0.15, y, 0.055]}>
          <boxGeometry args={[0.5 + Math.sin(i * 2.3) * 0.3, 0.025, 0.001]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#2dd4a8" : i % 3 === 1 ? "#d4a82d" : "#6b8cce"}
            emissive={i % 3 === 0 ? "#2dd4a8" : i % 3 === 1 ? "#d4a82d" : "#6b8cce"}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
      {/* Screen glow */}
      <pointLight position={[0, 0, 1]} color="#2dd4a8" intensity={1.5} distance={2} decay={2} />
    </group>
  );
}

// ----- 3D Code Bracket </> -----
function CodeBracket({ position, speed = 0.4 }: {
  position: [number, number, number];
  speed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* < */}
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[-0.72, 0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[-0.72, -0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      {/* / */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.08, 0.85, 0.08]} />
        <meshStandardMaterial color="#d4a82d" emissive="#d4a82d" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      {/* > */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.08, 0.6, 0.08]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0.72, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0.72, -0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.8} metalness={0.8} roughness={0.1} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} color="#2dd4a8" intensity={2} distance={2} decay={2} />
    </group>
  );
}

// ----- 3D Smartphone -----
function Smartphone({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + 1) * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, 0.3, 0.1]}>
      <mesh>
        <boxGeometry args={[0.5, 1.0, 0.07]} />
        <meshStandardMaterial color="#0d1520" metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.44, 0.9, 0.01]} />
        <meshStandardMaterial color="#0a1628" emissive="#6b8cce" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.41, 0.04]}>
        <boxGeometry args={[0.15, 0.02, 0.01]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 0.41, 0.04]}>
        <boxGeometry args={[0.18, 0.03, 0.01]} />
        <meshStandardMaterial color="#0d1520" />
      </mesh>
      {/* App grid */}
      {[-0.1, 0.0, 0.1].map((y, ri) =>
        [-0.12, 0, 0.12].map((x, ci) => (
          <mesh key={`${ri}-${ci}`} position={[x, y, 0.05]}>
            <boxGeometry args={[0.08, 0.08, 0.005]} />
            <meshStandardMaterial
              color={[["#e74c3c", "#2dd4a8", "#d4a82d"], ["#6b8cce", "#ec4899", "#2dd4a8"], ["#d4a82d", "#6b8cce", "#e74c3c"]][ri][ci]}
              emissive={[["#e74c3c", "#2dd4a8", "#d4a82d"], ["#6b8cce", "#ec4899", "#2dd4a8"], ["#d4a82d", "#6b8cce", "#e74c3c"]][ri][ci]}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))
      )}
      <pointLight position={[0, 0, 1]} color="#6b8cce" intensity={1} distance={2} decay={2} />
    </group>
  );
}

// ----- Orbiting rings (decorative) -----
function OrbitRing({ position, rotation, radius, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  radius: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={rotation}>
        <torusGeometry args={[radius, 0.02, 8, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ===== SCATTERED FLOATING OBJECTS — renders a spread-out collection =====
function ScatteredScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -5, 5]} intensity={1.5} color="#2dd4a8" />
      <pointLight position={[5, -8, 3]} intensity={1.5} color="#d4a82d" />

      {/* Browsers — spread wide */}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <BrowserWindow position={[-8, 3, -2]} rotation={[0.1, 0.3, 0.05]} scale={0.6} />
      </Float>
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.3}>
        <BrowserWindow position={[9, -2, -3]} rotation={[0.05, -0.4, -0.05]} scale={0.5} />
      </Float>
      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.35}>
        <BrowserWindow position={[-6, -4, -1]} rotation={[-0.1, 0.2, 0.1]} scale={0.45} />
      </Float>
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.3}>
        <BrowserWindow position={[7, 5, -4]} rotation={[0.08, -0.15, 0.02]} scale={0.35} />
      </Float>

      {/* Code brackets — scattered */}
      <CodeBracket position={[-5, 1, 0]} speed={0.3} />
      <CodeBracket position={[6, 3, -1]} speed={0.5} />
      <CodeBracket position={[-3, -3, 1]} speed={0.4} />
      <CodeBracket position={[4, -5, -2]} speed={0.35} />
      <CodeBracket position={[-9, -1, -1]} speed={0.25} />
      <CodeBracket position={[10, 0, 0]} speed={0.45} />

      {/* Smartphones — spread around */}
      <Smartphone position={[3, 2, -1]} />
      <Smartphone position={[-7, -2, 0]} />
      <Smartphone position={[8, -4, -2]} />
      <Smartphone position={[-4, 4, -1]} />
      <Smartphone position={[5, -1, 1]} />
      <Smartphone position={[-10, 1, -2]} />

      {/* Orbit rings for visual interest */}
      <OrbitRing position={[0, 0, -3]} rotation={[Math.PI / 3, 0, 0]} radius={4} color="#2dd4a8" />
      <OrbitRing position={[6, -3, -5]} rotation={[Math.PI / 4, Math.PI / 6, 0]} radius={3} color="#d4a82d" />
      <OrbitRing position={[-7, 2, -4]} rotation={[Math.PI / 5, 0, Math.PI / 3]} radius={2.5} color="#6b8cce" />
      <OrbitRing position={[3, 4, -6]} rotation={[0, Math.PI / 4, Math.PI / 6]} radius={2} color="#2dd4a8" />
    </>
  );
}

// ===== Exported: Full-page scattered floating objects background =====
export function ScatteredDevObjects() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 1]} gl={{ powerPreference: "low-power" }}>
        <Suspense fallback={null}>
          <ScatteredScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ===== Kept: Original concentrated section version =====
function DevObjectsScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
      <pointLight position={[-5, -3, 3]} intensity={2} color="#2dd4a8" />
      <pointLight position={[3, -4, 2]} intensity={2} color="#d4a82d" />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <BrowserWindow position={[0, 0, 0]} rotation={[0.1, -0.2, 0]} scale={0.9} />
      </Float>

      <CodeBracket position={[-3.2, 0.5, 0]} speed={0.4} />
      <CodeBracket position={[3.5, -0.8, -0.5]} speed={0.4} />

      <Smartphone position={[2.8, 0.3, 0]} />
      <Smartphone position={[-2.8, -0.5, -0.5]} />

      <OrbitRing position={[2.5, 0, -1]} rotation={[Math.PI / 3, 0, 0]} radius={1.2} color="#2dd4a8" />
      <OrbitRing position={[-2.5, 0.5, -1]} rotation={[Math.PI / 4, 0, Math.PI / 6]} radius={1.0} color="#d4a82d" />
    </>
  );
}

export function DevObjects3D() {
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

  if (isMobile) return null;

  return (
    <div className="h-[380px] sm:h-[450px] w-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <DevObjectsScene mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
