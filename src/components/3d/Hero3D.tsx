"use client";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";

function ShiftingLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Light 1 orbits
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.7) * 4;
      light1Ref.current.position.y = Math.cos(time * 0.8) * 4;
      light1Ref.current.position.z = Math.sin(time * 0.5) * 3 + 2;
    }

    // Light 2 orbits
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 0.6) * -4;
      light2Ref.current.position.y = Math.sin(time * 0.9) * 4;
      light2Ref.current.position.z = Math.cos(time * 0.4) * 3 + 2;
    }

    // Light 3 orbits
    if (light3Ref.current) {
      light3Ref.current.position.x = Math.sin(time * 0.5) * 4;
      light3Ref.current.position.y = Math.sin(time * 0.7) * -4;
      light3Ref.current.position.z = Math.cos(time * 0.6) * -3 - 2;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} color="#06b6d4" intensity={12} distance={12} decay={1.5} />
      <pointLight ref={light2Ref} color="#8b5cf6" intensity={12} distance={12} decay={1.5} />
      <pointLight ref={light3Ref} color="#ec4899" intensity={8} distance={10} decay={1.5} />
    </>
  );
}

function MorphingObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        <icosahedronGeometry args={[2, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#3f3f46" : "#18181b"}
          envMapIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          metalness={0.95}
          roughness={0.15}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function MobileFallback() {
  // Beautiful CSS gradient fallback for mobile
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            animationDuration: "4s",
          }}
        />
        <div
          className="absolute inset-8 rounded-full opacity-30 blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(161,161,170,0.4) 0%, transparent 70%)",
            transform: "scale(1)",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-full border border-zinc-700/30"
          style={{
            animation: "spin 20s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

export function Hero3D() {
  const isMobile = useIsMobile();

  // Use lighter CSS animation on mobile for performance
  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none sm:pointer-events-auto mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <ShiftingLights />
          <Environment preset="city" />
          <MorphingObject />
        </Suspense>
      </Canvas>
    </div>
  );
}
