"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
import type { ModelEntry } from "./data";
import { PrismModel } from "./PrismModels";

/**
 * Hand-rolled OrbitControls bridge (no `drei`, keeping the dependency set unchanged — see
 * NEXT_STAGE_PROMPT.md). Zoom is clamped (min/maxDistance); panning is disabled so the model
 * always stays centered. `resetToken` changing re-homes the camera (the "Reset View" button).
 */
function Controls({ resetToken, paused }: { resetToken: number; paused: boolean }) {
  const { camera, gl, invalidate } = useThree();
  const controls = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const c = new OrbitControlsImpl(camera, gl.domElement);
    c.enableDamping = true;
    c.dampingFactor = 0.08;
    c.enablePan = false;
    c.minDistance = 3;
    c.maxDistance = 9;
    c.addEventListener("change", invalidate);
    controls.current = c;
    return () => { c.dispose(); controls.current = null; };
  }, [camera, gl, invalidate]);

  useEffect(() => {
    controls.current?.reset();
  }, [resetToken]);

  useFrame(() => {
    if (!paused) controls.current?.update();
  });
  return null;
}

/** Slow idle auto-rotation of the model group; pauses once the person starts dragging or when off-screen. */
function AutoRotate({ children, active }: { children: React.ReactNode; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (active && ref.current) ref.current.rotation.y += dt * 0.12;
  });
  return <group ref={ref}>{children}</group>;
}

export default function PrismScene({ entry, resetToken, idleSpin, inView }: { entry: ModelEntry; resetToken: number; idleSpin: boolean; inView: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.5], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={inView ? "always" : "demand"}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={70} color="#8B6CFF" />
      <pointLight position={[-4, -2, 3]} intensity={50} color="#00D9FF" />
      <pointLight position={[0, -4, -4]} intensity={20} color="#A58FFF" />
      <AutoRotate active={idleSpin && inView}>
        <PrismModel entry={entry} />
      </AutoRotate>
      <Controls resetToken={resetToken} paused={!inView} />
    </Canvas>
  );
}
