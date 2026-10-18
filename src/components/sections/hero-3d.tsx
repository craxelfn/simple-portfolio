"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function Core({ pointer }: { pointer: RefObject<Pointer> }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  // Right of the copy on wide screens; small and tucked into the top corner on phones.
  const isWide = viewport.aspect > 1.15;
  const baseX = isWide ? viewport.width * 0.27 : viewport.width * 0.22;
  const baseY = isWide ? 0 : viewport.height * 0.3;
  const baseScale = isWide ? 0.82 : 0.42;

  useFrame((_, delta) => {
    const group = groupRef.current;
    const wire = wireRef.current;
    if (!group || !wire) return;

    wire.rotation.x += delta * 0.12;
    wire.rotation.y += delta * 0.18;

    const p = pointer.current ?? { x: 0, y: 0 };
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, p.x * 0.6, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -p.y * 0.4, 0.05);
    group.position.x = THREE.MathUtils.lerp(group.position.x, baseX + p.x * 0.18, 0.05);
    group.position.y = THREE.MathUtils.lerp(group.position.y, baseY + p.y * 0.12, 0.05);

    const scrolled = Math.min(window.scrollY / window.innerHeight, 1);
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, baseScale * (1 - scrolled * 0.35), 0.1));
  });

  return (
    <group ref={groupRef} position={[baseX, baseY, 0]} scale={baseScale}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={wireRef} scale={1.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            wireframe
            color="#38bdf8"
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>
        <mesh scale={0.72}>
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            emissive="#22d3ee"
            emissiveIntensity={0.25}
            distort={0.38}
            speed={1.8}
            roughness={0.15}
            metalness={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
      <Sparkles count={70} scale={[4.2, 3.2, 2.4]} size={2.4} speed={0.4} color="#7dd3fc" opacity={0.8} />
    </group>
  );
}

export function Hero3D() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 sm:opacity-90 dark:opacity-80 sm:dark:opacity-100">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        frameloop={reduceMotion ? "demand" : "always"}
        className="h-full w-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 6]} intensity={1.2} />
        <pointLight position={[-4, -2, 3]} intensity={1.5} color="#a78bfa" />
        <Core pointer={pointer} />
      </Canvas>
    </div>
  );
}
