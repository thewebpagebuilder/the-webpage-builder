"use client";
import { useRef, Suspense, useEffect, useState } from "react";
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
        <meshStandardMaterial
          color="#0a1628"
          emissive="#0a1628"
          emissiveIntensity={0.3}
        />
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
function CodeBracket({ position, mouseX, mouseY }: {
  position: [number, number, number];
  mouseX: number;
  mouseY: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4 + mouseX * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + mouseY * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* < */}
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
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

      {/* Glow */}
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
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[0.5, 1.0, 0.07]} />
        <meshStandardMaterial color="#0d1520" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.44, 0.9, 0.01]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#6b8cce"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Home indicator */}
      <mesh position={[0, -0.41, 0.04]}>
        <boxGeometry args={[0.15, 0.02, 0.01]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Notch */}
      <mesh position={[0, 0.41, 0.04]}>
        <boxGeometry args={[0.18, 0.03, 0.01]} />
        <meshStandardMaterial color="#0d1520" />
      </mesh>
      {/* App grid on screen */}
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
function OrbitRings({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const group1 = useRef<THREE.Group>(null);
  const group2 = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group1.current) {
      group1.current.rotation.y = state.clock.elapsedTime * 0.3;
      group1.current.rotation.x = mouseY * 0.2;
    }
    if (group2.current) {
      group2.current.rotation.y = -state.clock.elapsedTime * 0.2;
      group2.current.rotation.z = mouseX * 0.15;
    }
  });

  return (
    <>
      <group ref={group1} position={[2.5, 0, -1]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 8, 64]} />
          <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>
        {/* Orbiting dot */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 6, 6]} />
          <meshStandardMaterial color="#2dd4a8" emissive="#2dd4a8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={group2} position={[-2.5, 0.5, -1]}>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[1.0, 0.02, 8, 64]} />
          <meshStandardMaterial color="#d4a82d" emissive="#d4a82d" emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>
      </group>
    </>
  );
}

// ----- Main Scene -----
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

      <CodeBracket position={[-3.2, 0.5, 0]} mouseX={mouseX} mouseY={mouseY} />
      <CodeBracket position={[3.5, -0.8, -0.5]} mouseX={mouseX} mouseY={mouseY} />

      <Smartphone position={[2.8, 0.3, 0]} />
      <Smartphone position={[-2.8, -0.5, -0.5]} />

      <OrbitRings mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

// ----- Exported component -----
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
