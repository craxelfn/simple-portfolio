"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function WireMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          wireframe
          color="#38bdf8"
          emissive="#0ea5e9"
          emissiveIntensity={0.18}
          metalness={0.2}
          roughness={0.35}
        />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 dark:opacity-100">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <WireMesh />
      </Canvas>
    </div>
  );
}
