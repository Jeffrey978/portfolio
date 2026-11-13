"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { soundFX } from "@/components/ui/sound-effects";

export type RenderMode = "iridescent" | "wireframe" | "normals" | "cyber";

function CyberSculpture({ mode }: { mode: RenderMode }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.15;
      outerRingRef.current.rotation.x += delta * 0.1;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Morphing Sculpture */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={meshRef} scale={1.35}>
          <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
          {mode === "wireframe" && (
            <meshStandardMaterial
              wireframe
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.6}
            />
          )}
          {mode === "normals" && <meshNormalMaterial wireframe={false} />}
          {mode === "cyber" && (
            <meshStandardMaterial
              color="#111827"
              emissive="#10b981"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.9}
              wireframe={false}
            />
          )}
          {mode === "iridescent" && (
            <MeshDistortMaterial
              color="#0f172a"
              emissive="#38bdf8"
              emissiveIntensity={0.25}
              roughness={0.1}
              metalness={0.95}
              distort={0.28}
              speed={2}
            />
          )}
        </mesh>

        {/* Gyroscopic Outer Ring */}
        <mesh ref={outerRingRef} scale={2.4}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>

        {/* Floating Core */}
        <mesh ref={innerCoreRef} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color("#00f0ff"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroScene() {
  const [mode, setMode] = useState<RenderMode>("iridescent");

  const cycleMode = (newMode: RenderMode) => {
    setMode(newMode);
    soundFX.playSwitch();
  };

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[620px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm">
      {/* Interactive 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -5, -5]} intensity={2.0} color="#a855f7" />
        <pointLight position={[0, 8, 2]} intensity={1.2} color="#00f0ff" />

        <CyberSculpture mode={mode} />
        <ParticleField count={600} />
      </Canvas>

      {/* Cyber HUD Overlay Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
            RENDER_CORE // 60 FPS
          </span>
        </div>

        {/* Shader / View Mode Switcher */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
          {(["iridescent", "wireframe", "normals", "cyber"] as RenderMode[]).map((m) => (
            <button
              key={m}
              onClick={() => cycleMode(m)}
              data-cursor="MODE"
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-all duration-200 ${
                mode === m
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 pointer-events-none">
        <div className="flex items-center gap-4">
          <span>VERTICES: 16,384</span>
          <span className="hidden sm:inline">PBR PIPELINE: ACTIVE</span>
        </div>
        <div className="text-cyan-400/80">
          SPATIAL COORD: [0, 0, 5.2]
        </div>
      </div>
    </div>
  );
}
