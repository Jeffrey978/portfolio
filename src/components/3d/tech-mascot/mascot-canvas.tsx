"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ProceduralTechRobot, TechRobotProps } from "./procedural-robot";

export default function MascotCanvas({
  gesture,
  onGestureComplete,
  onMascotClick,
  modelUrl,
}: TechRobotProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      className="w-full h-full cursor-pointer pointer-events-auto"
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-3, -2, -1]} intensity={0.4} color="#10b981" />
      <pointLight position={[0, -0.6, 0.4]} intensity={0.8} color="#10b981" distance={2} />

      <Suspense fallback={null}>
        <ProceduralTechRobot
          gesture={gesture}
          onGestureComplete={onGestureComplete}
          onMascotClick={onMascotClick}
          modelUrl={modelUrl}
        />
      </Suspense>
    </Canvas>
  );
}
