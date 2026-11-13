"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export interface TechRobotProps {
  gesture: "idle" | "wave" | "nod";
  onGestureComplete?: () => void;
  onMascotClick?: () => void;
  modelUrl?: string;
}

// Fallback / Loader component for optional custom Blender .glb export
function CustomModel({ url, gesture }: { url: string; gesture: "idle" | "wave" | "nod" }) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 2) * 0.06;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.4,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.25,
      0.08
    );
  });

  return (
    <primitive
      ref={groupRef}
      object={gltf.scene}
      scale={1.2}
      position={[0, -0.6, 0]}
    />
  );
}

export function ProceduralTechRobot({
  gesture,
  onGestureComplete,
  onMascotClick,
  modelUrl,
}: TechRobotProps) {
  // Try custom model if provided
  if (modelUrl) {
    return <CustomModel url={modelUrl} gesture={gesture} />;
  }

  return (
    <ProceduralMesh
      gesture={gesture}
      onGestureComplete={onGestureComplete}
      onMascotClick={onMascotClick}
    />
  );
}

function ProceduralMesh({
  gesture,
  onGestureComplete,
  onMascotClick,
}: Omit<TechRobotProps, "modelUrl">) {
  // References for hierarchical articulation
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const baseRingRef = useRef<THREE.Mesh>(null);

  // Gesture state timers
  const gestureTimeRef = useRef(0);
  const currentGestureRef = useRef<"idle" | "wave" | "nod">(gesture);
  const [isHovered, setIsHovered] = useState(false);

  // Blinking timer state
  const nextBlinkTime = useRef(2.5);
  const isBlinking = useRef(false);
  const blinkProgress = useRef(0);

  // Sync prop gesture changes
  useEffect(() => {
    currentGestureRef.current = gesture;
    gestureTimeRef.current = 0;
  }, [gesture]);

  // Shared reusable materials matching site aesthetic (monochrome matte titanium + charcoal + emerald glow)
  const materials = useMemo(() => {
    return {
      titaniumWhite: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e6e6e8"),
        metalness: 0.25,
        roughness: 0.2,
      }),
      obsidianCharcoal: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#18181b"),
        metalness: 0.5,
        roughness: 0.3,
      }),
      darkGlass: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#09090b"),
        metalness: 0.9,
        roughness: 0.1,
      }),
      emeraldVisor: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#10b981"),
        emissive: new THREE.Color("#10b981"),
        emissiveIntensity: 2.4,
        roughness: 0.1,
        metalness: 0.1,
      }),
      emeraldCore: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#34d399"),
        emissive: new THREE.Color("#10b981"),
        emissiveIntensity: 1.8,
        roughness: 0.2,
      }),
      jointMetal: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#27272a"),
        metalness: 0.8,
        roughness: 0.25,
      }),
    };
  }, []);

  // Shared geometries with clean disposal
  const geometries = useMemo(() => {
    return {
      headDome: new THREE.SphereGeometry(0.52, 32, 24),
      headVisorCutout: new THREE.CylinderGeometry(0.48, 0.48, 0.2, 32, 1, false, 0, Math.PI),
      visorStrip: new THREE.BoxGeometry(0.56, 0.08, 0.12),
      antennaEar: new THREE.CylinderGeometry(0.1, 0.1, 0.16, 16),
      antennaTip: new THREE.SphereGeometry(0.06, 12, 12),
      torsoChest: new THREE.CylinderGeometry(0.38, 0.44, 0.65, 24),
      coreDisk: new THREE.CylinderGeometry(0.16, 0.16, 0.06, 24),
      handBody: new THREE.SphereGeometry(0.14, 18, 14),
      handFinger: new THREE.CylinderGeometry(0.035, 0.035, 0.12, 12),
      levitationRing: new THREE.TorusGeometry(0.42, 0.035, 16, 32),
      neckPivot: new THREE.SphereGeometry(0.12, 16, 12),
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m.dispose());
      Object.values(geometries).forEach((g) => g.dispose());
    };
  }, [materials, geometries]);

  // High-performance 60fps/120fps animation loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // 1. Idle Floating & Breathing
    if (rootRef.current) {
      const hoverY = Math.sin(t * 2.2) * 0.08;
      const hoverTilt = Math.cos(t * 1.5) * 0.03;
      rootRef.current.position.y = hoverY;
      rootRef.current.rotation.z = hoverTilt;
    }

    // 2. Levitation Ring Rotation & Glow Pulse
    if (baseRingRef.current) {
      baseRingRef.current.rotation.z = t * 1.2;
      baseRingRef.current.scale.setScalar(1 + Math.sin(t * 3.5) * 0.04);
    }

    // 3. Torso Core Pulse
    if (coreRef.current) {
      const corePulse = 1.4 + Math.sin(t * 4) * 0.6;
      materials.emeraldCore.emissiveIntensity = corePulse;
    }

    // 4. Random Visor Blink Logic
    if (t > nextBlinkTime.current) {
      isBlinking.current = true;
      blinkProgress.current += delta * 9;
      if (visorRef.current) {
        // Fast eyelid squash
        const scaleY = Math.max(0.08, 1 - Math.sin(blinkProgress.current * Math.PI));
        visorRef.current.scale.y = scaleY;
      }
      if (blinkProgress.current >= 1) {
        isBlinking.current = false;
        blinkProgress.current = 0;
        if (visorRef.current) visorRef.current.scale.y = 1;
        nextBlinkTime.current = t + 3 + Math.random() * 3.5;
      }
    }

    // 5. Head Pitch & Yaw Tracking Cursor
    let nodOffset = 0;
    if (currentGestureRef.current === "nod") {
      gestureTimeRef.current += delta;
      // 2 clean rhythmic nods
      nodOffset = Math.sin(gestureTimeRef.current * 10) * 0.32;
      if (gestureTimeRef.current >= 1.3) {
        currentGestureRef.current = "idle";
        onGestureComplete?.();
      }
    }

    if (headRef.current) {
      const targetHeadYaw = pointer.x * 0.55;
      const targetHeadPitch = -pointer.y * 0.35 + nodOffset;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadYaw, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadPitch, 0.08);
    }

    // 6. Left Hand Gentle Orbit / Idle Float
    if (leftHandRef.current) {
      const leftHoverY = Math.sin(t * 2.5 + 1.2) * 0.06;
      leftHandRef.current.position.y = -0.15 + leftHoverY;
      leftHandRef.current.position.x = -0.68 + Math.cos(t * 1.8) * 0.03;
      leftHandRef.current.rotation.z = 0.2 + Math.sin(t * 2) * 0.08;
    }

    // 7. Right Hand Articulation (Wave Gesture vs Idle Hover)
    if (rightHandRef.current) {
      if (currentGestureRef.current === "wave") {
        gestureTimeRef.current += delta;
        // Raise hand to head height and wave back & forth
        const waveProgress = Math.min(1, gestureTimeRef.current * 3);
        const targetWaveX = 0.65;
        const targetWaveY = THREE.MathUtils.lerp(-0.15, 0.45, waveProgress);
        const targetWaveZ = 0.2;

        rightHandRef.current.position.x = targetWaveX;
        rightHandRef.current.position.y = targetWaveY;
        rightHandRef.current.position.z = targetWaveZ;

        // Expressive waving oscillation
        const waveAngle = Math.sin(gestureTimeRef.current * 12) * 0.45;
        rightHandRef.current.rotation.z = -0.4 + waveAngle;
        rightHandRef.current.rotation.y = 0.2 + Math.cos(gestureTimeRef.current * 12) * 0.2;

        if (gestureTimeRef.current >= 2.2) {
          currentGestureRef.current = "idle";
          onGestureComplete?.();
        }
      } else {
        // Idle hover
        const rightHoverY = Math.sin(t * 2.5) * 0.06;
        rightHandRef.current.position.x = THREE.MathUtils.lerp(rightHandRef.current.position.x, 0.68, 0.1);
        rightHandRef.current.position.y = THREE.MathUtils.lerp(rightHandRef.current.position.y, -0.15 + rightHoverY, 0.1);
        rightHandRef.current.position.z = THREE.MathUtils.lerp(rightHandRef.current.position.z, 0, 0.1);
        rightHandRef.current.rotation.z = THREE.MathUtils.lerp(rightHandRef.current.rotation.z, -0.2, 0.1);
      }
    }
  });

  return (
    <group
      ref={rootRef}
      position={[0, -0.05, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onMascotClick?.();
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* --- HEAD ASSEMBLY --- */}
      <group ref={headRef} position={[0, 0.46, 0]}>
        {/* Main Head Dome */}
        <mesh
          geometry={geometries.headDome}
          material={materials.titaniumWhite}
          scale={[1.0, 0.92, 0.98]}
        />

        {/* Recessed Visor Faceplate */}
        <mesh
          geometry={geometries.headVisorCutout}
          material={materials.darkGlass}
          position={[0, 0.02, 0.1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.02, 1.05, 1.02]}
        />

        {/* Glowing Visor HUD Strip / Eye Bar */}
        <mesh
          ref={visorRef}
          geometry={geometries.visorStrip}
          material={materials.emeraldVisor}
          position={[0, 0.04, 0.46]}
        />

        {/* Left Audio Pod / Antenna */}
        <group position={[-0.52, 0.02, 0]}>
          <mesh
            geometry={geometries.antennaEar}
            material={materials.obsidianCharcoal}
            rotation={[0, 0, Math.PI / 2]}
          />
          <mesh
            geometry={geometries.antennaTip}
            material={materials.emeraldCore}
            position={[-0.1, 0, 0]}
          />
        </group>

        {/* Right Audio Pod / Antenna */}
        <group position={[0.52, 0.02, 0]}>
          <mesh
            geometry={geometries.antennaEar}
            material={materials.obsidianCharcoal}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            geometry={geometries.antennaTip}
            material={materials.emeraldCore}
            position={[0.1, 0, 0]}
          />
        </group>
      </group>

      {/* --- MAGNETIC NECK PIVOT --- */}
      <mesh
        geometry={geometries.neckPivot}
        material={materials.jointMetal}
        position={[0, 0.04, 0]}
      />

      {/* --- TORSO / CHASSIS --- */}
      <group position={[0, -0.32, 0]}>
        {/* Upper Chest Shell */}
        <mesh
          geometry={geometries.torsoChest}
          material={materials.titaniumWhite}
          scale={[1.0, 0.9, 0.85]}
        />

        {/* Inset Charcoal Tech Belt / Trim */}
        <mesh
          geometry={geometries.torsoChest}
          material={materials.obsidianCharcoal}
          position={[0, -0.22, 0]}
          scale={[0.96, 0.28, 0.82]}
        />

        {/* Central Glowing Telemetry Core / Reactor */}
        <mesh
          ref={coreRef}
          geometry={geometries.coreDisk}
          material={materials.emeraldCore}
          position={[0, 0.06, 0.35]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>

      {/* --- FLOATING LEVITATION BASE RING --- */}
      <mesh
        ref={baseRingRef}
        geometry={geometries.levitationRing}
        material={materials.emeraldVisor}
        position={[0, -0.72, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* --- FLOATING LEFT HAND --- */}
      <group ref={leftHandRef} position={[-0.68, -0.15, 0]}>
        {/* Palm */}
        <mesh
          geometry={geometries.handBody}
          material={materials.titaniumWhite}
        />
        {/* Charcoal Joint Collar */}
        <mesh
          geometry={geometries.antennaEar}
          material={materials.obsidianCharcoal}
          scale={[0.7, 0.5, 0.7]}
        />
        {/* Articulated Tech Digit */}
        <mesh
          geometry={geometries.handFinger}
          material={materials.jointMetal}
          position={[0, -0.14, 0.04]}
          rotation={[0.3, 0, 0]}
        />
      </group>

      {/* --- FLOATING RIGHT HAND (Articulates Wave) --- */}
      <group ref={rightHandRef} position={[0.68, -0.15, 0]}>
        {/* Palm */}
        <mesh
          geometry={geometries.handBody}
          material={materials.titaniumWhite}
        />
        {/* Charcoal Joint Collar */}
        <mesh
          geometry={geometries.antennaEar}
          material={materials.obsidianCharcoal}
          scale={[0.7, 0.5, 0.7]}
        />
        {/* Articulated Tech Digit */}
        <mesh
          geometry={geometries.handFinger}
          material={materials.jointMetal}
          position={[0, -0.14, 0.04]}
          rotation={[0.3, 0, 0]}
        />
      </group>
    </group>
  );
}
