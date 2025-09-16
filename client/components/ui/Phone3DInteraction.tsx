import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

function PhoneModel() {
  // Load a simple phone model or create a box as placeholder
  // For simplicity, create a box with screen
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 3, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.3, 2.7]} />
        <meshStandardMaterial color="#0a84ff" />
      </mesh>
    </>
  );
}

function HandModel() {
  // Simple representation of a hand as a sphere and fingers as cylinders
  // For demo purposes, animate the hand moving to tap the phone screen
  const handRef = useRef();

  useFrame(({ clock }) => {
    if (handRef.current) {
      const t = clock.getElapsedTime();
      handRef.current.position.x = 0.5 * Math.sin(t);
      handRef.current.position.y = -0.5 + 0.1 * Math.cos(t * 2);
      handRef.current.position.z = 0.5 + 0.1 * Math.sin(t * 3);
      handRef.current.rotation.x = 0.2 * Math.sin(t * 1.5);
      handRef.current.rotation.y = 0.5 * Math.cos(t * 1.2);
    }
  });

  return (
    <group ref={handRef} position={[0.5, -0.5, 0.5]}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f5c6a5" />
      </mesh>
      {/* Fingers */}
      {[...Array(4)].map((_, i) => (
        <mesh
          key={i}
          position={[0.3 - i * 0.15, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#f5c6a5" />
        </mesh>
      ))}
    </group>
  );
}

export default function Phone3DInteraction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] md:h-[500px]"
    >
      <Canvas
        shadows
        camera={{ position: [2, 2, 3], fov: 50 }}
        style={{ borderRadius: "1rem" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <PhoneModel />
        <HandModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
}
