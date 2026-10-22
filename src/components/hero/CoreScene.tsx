"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const n = 420, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.1 + Math.random() * 1.5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      arr.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
    }
    return arr;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (outer.current) { outer.current.rotation.y += dt * 0.12; outer.current.rotation.x = Math.sin(t * 0.25) * 0.2; }
    if (inner.current) { inner.current.rotation.y -= dt * 0.35; inner.current.rotation.z += dt * 0.15; inner.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04); }
    if (ring.current) ring.current.rotation.z += dt * 0.2;
    if (cloud.current) cloud.current.rotation.y += dt * 0.04;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.5, 3, dt);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.35, 3, dt);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#7958FF" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color="#171D2B" emissive="#00D9FF" emissiveIntensity={0.55} metalness={0.7} roughness={0.25} flatShading />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.35, 0.012, 8, 160]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
      </mesh>
      <points ref={cloud}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#A58FFF" size={0.03} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
      </points>
    </group>
  );
}

export default function CoreScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#7958FF" />
      <pointLight position={[-4, -2, 3]} intensity={45} color="#00D9FF" />
      <Core />
    </Canvas>
  );
}
