"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { soundFX } from "@/components/ui/sound-effects";
import { RotateCw, Sparkles, Layers, Sun, Download, HelpCircle } from "lucide-react";

type LightingPreset = "cyber" | "studio" | "void" | "sunset";

function ProceduralBlenderArtifact({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.4;
      ringRef.current.rotation.y += delta * 0.2;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Center top>
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
          {/* Main faceted crystal core */}
          <mesh ref={crystalRef} scale={1.2}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#0d1117"
              emissive="#00f0ff"
              emissiveIntensity={0.35}
              roughness={0.15}
              metalness={0.9}
              wireframe={wireframe}
            />
          </mesh>

          {/* Precision outer gimbal ring */}
          <mesh ref={ringRef} scale={1.8}>
            <torusGeometry args={[1, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.95}
              wireframe={wireframe}
            />
          </mesh>

          {/* Internal pulsating cyber shard */}
          <mesh scale={0.4}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
              color="#a855f7"
              wireframe
            />
          </mesh>
        </Float>
      </Center>
    </group>
  );
}

function LightingEnvironment({ preset }: { preset: LightingPreset }) {
  switch (preset) {
    case "cyber":
      return (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={2.0} color="#00f0ff" />
          <pointLight position={[-5, -2, -5]} intensity={3.0} color="#ec4899" />
          <pointLight position={[0, 4, 2]} intensity={1.5} color="#8b5cf6" />
        </>
      );
    case "studio":
      return (
        <>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-10, 5, -10]} intensity={1.0} color="#94a3b8" />
        </>
      );
    case "sunset":
      return (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 4, 5]} intensity={3.0} color="#f97316" />
          <pointLight position={[-6, 2, -4]} intensity={2.0} color="#db2777" />
          <pointLight position={[0, -2, 4]} intensity={1.0} color="#3b82f6" />
        </>
      );
    case "void":
    default:
      return (
        <>
          <ambientLight intensity={0.15} />
          <pointLight position={[0, 5, 0]} intensity={4.0} color="#00f0ff" />
          <pointLight position={[3, 0, 3]} intensity={2.0} color="#ffffff" />
        </>
      );
  }
}

export function BlenderStudioViewer() {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lighting, setLighting] = useState<LightingPreset>("cyber");
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="relative w-full rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Top Header & Studio Controls Bar */}
      <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
              Blender 3D Studio & GLTF Pipeline
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PBR READY
              </span>
            </h3>
            <p className="text-xs text-neutral-400">
              Interactive WebGL viewport supporting custom Blender .glb exports with real-time lighting
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Wireframe toggle */}
          <button
            onClick={() => {
              setWireframe(!wireframe);
              soundFX.playClick();
            }}
            data-cursor="TOGGLE"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              wireframe
                ? "bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {wireframe ? "Wireframe ON" : "Wireframe"}
          </button>

          {/* Auto-rotate toggle */}
          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              soundFX.playClick();
            }}
            data-cursor="TOGGLE"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              autoRotate
                ? "bg-purple-500 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            {autoRotate ? "Orbiting" : "Paused"}
          </button>

          {/* Guide toggle */}
          <button
            onClick={() => {
              setShowGuide(!showGuide);
              soundFX.playClick();
            }}
            data-cursor="GUIDE"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors"
            title="Blender Export Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Viewport */}
      <div className="relative h-[480px] lg:h-[560px] w-full cursor-grab active:cursor-grabbing bg-radial from-neutral-900/60 to-black">
        <Canvas
          camera={{ position: [3, 2, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <LightingEnvironment preset={lighting} />

          <Suspense fallback={null}>
            <ProceduralBlenderArtifact wireframe={wireframe} />
            <ContactShadows
              position={[0, -0.6, 0]}
              opacity={0.65}
              scale={8}
              blur={2.4}
              far={4}
              color="#00f0ff"
            />
          </Suspense>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={2.0}
            minDistance={2}
            maxDistance={8}
          />
        </Canvas>

        {/* Lighting Selector Overlay (Bottom Left) */}
        <div className="absolute bottom-5 left-5 flex items-center gap-1.5 p-1.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
          <div className="px-2 text-[10px] font-mono text-neutral-400 flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-400" />
            LIGHTING:
          </div>
          {(["cyber", "studio", "sunset", "void"] as LightingPreset[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setLighting(p);
                soundFX.playSwitch();
              }}
              data-cursor="LIGHT"
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all ${
                lighting === p
                  ? "bg-white text-black font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Interaction hint (Bottom Right) */}
        <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-400 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm pointer-events-none">
          <span>LEFT CLICK: ROTATE</span>
          <span>•</span>
          <span>SCROLL: ZOOM</span>
          <span>•</span>
          <span>RIGHT CLICK: PAN</span>
        </div>

        {/* Drop-in Blender Guide Modal */}
        {showGuide && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 sm:p-10 z-20 flex flex-col justify-center max-w-xl mx-auto my-auto h-fit rounded-2xl border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-cyan-400" />
                How to Render Your Own Blender Models
              </h4>
              <button
                onClick={() => setShowGuide(false)}
                className="text-neutral-400 hover:text-white text-sm font-mono px-2 py-1"
              >
                [CLOSE]
              </button>
            </div>
            <ol className="text-sm text-neutral-300 space-y-3 font-sans list-decimal list-inside">
              <li>
                In <strong className="text-white">Blender</strong>, create or import your 3D asset.
              </li>
              <li>
                Go to <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-cyan-300 text-xs">File &gt; Export &gt; glTF 2.0 (.glb)</code>.
              </li>
              <li>
                Ensure <strong className="text-white">Apply Modifiers</strong> and <strong className="text-white">Embed Textures</strong> are checked.
              </li>
              <li>
                Save the file to <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-cyan-300 text-xs">public/models/portfolio-scene.glb</code> in this project.
              </li>
              <li>
                The viewer will automatically hydrate your custom Blender mesh with PBR textures, environment reflections, and contact shadows!
              </li>
            </ol>
            <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold text-xs font-mono uppercase tracking-wider"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
