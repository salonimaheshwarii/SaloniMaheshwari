'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 1000 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Use deterministic pseudo-random generation to avoid hydration issues
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      // Deterministic positions based on index
      positions[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 100;
      positions[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 100;
      positions[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 100;

      // Deterministic colors (mostly blues and cyans)
      const color = new THREE.Color();
      color.setHSL(0.5 + seededRandom(i + 1000) * 0.2, 0.8, 0.5 + seededRandom(i + 2000) * 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}