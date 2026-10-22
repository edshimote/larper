"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { ModelEntry } from "./data";

/** Centers and normalizes any loaded object to a consistent on-screen size (auto-centering / auto-fit camera target). */
function useAutoFit(ref: React.RefObject<THREE.Object3D | null>, deps: readonly unknown[]) {
  useEffect(() => {
    const obj = ref.current;
    if (!obj) return;
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.6 / maxAxis;
    obj.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    obj.scale.setScalar(scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ───────────── Aurora Prism — faceted crystal core ───────────── */
function AuroraPrism({ accent, accent2 }: { accent: string; accent2: string }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (core.current) { core.current.rotation.y += dt * 0.25; core.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15; }
    if (group.current) group.current.rotation.y += dt * 0.06;
  });
  return (
    <group ref={group}>
      <mesh ref={core}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color="#171D2B" emissive={accent} emissiveIntensity={0.5} metalness={0.85} roughness={0.2} flatShading />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1.32, 0]} />
        <meshBasicMaterial color={accent2} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* ───────────── Helix Lattice — interlocking torus lattice ───────────── */
function HelixLattice({ accent, accent2 }: { accent: string; accent2: string }) {
  const group = useRef<THREE.Group>(null);
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (a.current) a.current.rotation.x += dt * 0.3;
    if (b.current) b.current.rotation.y += dt * 0.25;
    if (group.current) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
  });
  return (
    <group ref={group}>
      <mesh ref={a} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.1, 0.14, 24, 100]} />
        <meshStandardMaterial color="#171D2B" emissive={accent2} emissiveIntensity={0.6} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.07, 24, 100]} />
        <meshStandardMaterial color="#171D2B" emissive={accent} emissiveIntensity={0.55} metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

/* ───────────── Nova Cluster — orbiting icosahedra ───────────── */
function NovaCluster({ accent, accent2 }: { accent: string; accent2: string }) {
  const group = useRef<THREE.Group>(null);
  const sats = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ r: 1.3 + (i % 2) * 0.35, speed: 0.4 + i * 0.08, offset: (i / 5) * Math.PI * 2, size: 0.18 + (i % 3) * 0.05 })), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    sats.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = t * s.speed + s.offset;
      m.position.set(Math.cos(a) * s.r, Math.sin(a * 0.7) * 0.5, Math.sin(a) * s.r);
      m.rotation.y += 0.01;
    });
    if (group.current) group.current.rotation.y += 0.0015;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#171D2B" emissive={accent} emissiveIntensity={0.6} metalness={0.75} roughness={0.3} flatShading />
      </mesh>
      {sats.map((s, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <icosahedronGeometry args={[s.size, 0]} />
          <meshStandardMaterial color="#171D2B" emissive={accent2} emissiveIntensity={0.55} metalness={0.7} roughness={0.3} flatShading />
        </mesh>
      ))}
    </group>
  );
}

const PROCEDURAL: Record<string, (p: { accent: string; accent2: string }) => React.JSX.Element> = {
  aurora: AuroraPrism, helix: HelixLattice, nova: NovaCluster,
};

/** Prepared for real assets: loads a .glb/.gltf by path, auto-centers and auto-scales it. Suspends while loading. */
function GLTFModel({ path }: { path: string }) {
  const gltf = useLoader(GLTFLoader, path);
  const ref = useRef<THREE.Group>(null);
  useAutoFit(ref, [gltf]);
  return <primitive ref={ref} object={gltf.scene} />;
}

/** Resolves a registry entry to its rendered geometry — procedural today, GLB/GLTF-ready for tomorrow. */
export function PrismModel({ entry }: { entry: ModelEntry }) {
  if (entry.kind === "glb") {
    return (
      <Suspense fallback={null}>
        <GLTFModel path={entry.path} />
      </Suspense>
    );
  }
  const Comp = PROCEDURAL[entry.id];
  return <Comp accent={entry.accent} accent2={entry.accent2} />;
}
