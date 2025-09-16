import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";

type RotatingBoxProps = {
  position: [number, number, number];
  size: number;
  color: string;
  speed?: [number, number];
};

function RotatingBox({ position, size, color, speed = [0.01, 0.01] }: RotatingBoxProps) {
  const mesh = useRef<Mesh>(null!);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += speed[0];
      mesh.current.rotation.y += speed[1];
    }
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} emissive={color} emissiveIntensity={0.08} />
    </mesh>
  );
}

export default function Decorative3D() {
  const cubes = [
    { position: [-1.1, 0.3, 0], size: 0.55, color: "#a78bfa", speed: [0.012, 0.008] },
    { position: [0, 0, 0], size: 0.9, color: "#8b5cf6", speed: [0.01, 0.01] },
    { position: [1.0, -0.1, -0.2], size: 0.5, color: "#7c3aed", speed: [0.007, 0.013] },
    { position: [0.6, 0.8, 0.4], size: 0.4, color: "#c4b5fd", speed: [0.014, 0.009] },
    { position: [-0.8, -0.4, 0.6], size: 0.45, color: "#a78bfa", speed: [0.009, 0.012] },
  ] as const;

  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        position: "absolute",
        top: "6%",
        right: "4%",
        pointerEvents: "none",
        filter: "drop-shadow(0 0 14px rgba(139, 92, 246, 0.8))",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <Canvas shadows camera={{ position: [3.6, 3.2, 4.2], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 7, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
          <planeGeometry args={[14, 14]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
        {cubes.map((c, i) => (
          <Float key={i} speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
            <RotatingBox position={c.position} size={c.size} color={c.color} speed={c.speed} />
          </Float>
        ))}
      </Canvas>
    </div>
  );
}
