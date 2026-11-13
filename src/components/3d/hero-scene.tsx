"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AmbientCyberSculpture({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Subtle rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.18;
      meshRef.current.rotation.y += delta * 0.22;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.12;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.3;
    }

    // Gentle parallax tracking mouse
    if (groupRef.current) {
      const targetX = (mouseRef.current.x * 0.6);
      const targetY = (mouseRef.current.y * 0.4);
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Main central iridescent torus sculpture */}
        <mesh ref={meshRef} scale={1.8}>
          <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
          <MeshDistortMaterial
            color="#090d16"
            emissive="#00f0ff"
            emissiveIntensity={0.3}
            roughness={0.15}
            metalness={0.9}
            distort={0.25}
            speed={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Ambient orbital wireframe ring */}
        <mesh ref={ringRef} scale={3.2}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.25}
            wireframe
          />
        </mesh>

        {/* Inner pulsating core */}
        <mesh ref={coreRef} scale={0.7}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function AmbientStarfield({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00f0ff"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      const r = 5.0 + Math.random() * 7.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function AmbientHeroBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="w-full h-full opacity-65"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[-10, -5, -5]} intensity={2.2} color="#8b5cf6" />
        <pointLight position={[0, 8, 2]} intensity={1.5} color="#38bdf8" />

        <AmbientCyberSculpture mouseRef={mouseRef} />
        <AmbientStarfield count={500} />
      </Canvas>

      {/* Multi-layered Vignette & Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/80 via-[#070709]/55 to-[#070709]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#070709_95%)] opacity-85" />
    </div>
  );
}
