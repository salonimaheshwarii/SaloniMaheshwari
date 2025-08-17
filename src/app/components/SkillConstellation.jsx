'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'React.js', position: [2, 1, 0], color: '#61dafb' },
  { name: 'Next.js', position: [-2, 0.5, 1], color: '#000000' },
  { name: 'Vue.js', position: [0, -1, -1], color: '#4fc08d' },
  { name: 'TypeScript', position: [1.5, -0.5, 0.5], color: '#3178c6' },
  { name: 'AWS', position: [-1, 1.5, -0.5], color: '#ff9900' },
  { name: 'Docker', position: [0, 2, 1], color: '#2496ed' },
  { name: 'Terraform', position: [-1.5, -1, 0], color: '#623ce4' },
  { name: 'Node.js', position: [2.5, 0, -1], color: '#339933' },
  { name: 'Redux', position: [-2.5, -0.5, 0.5], color: '#764abc' },
  { name: 'Tailwind', position: [1, -2, -0.5], color: '#06b6d4' }
];

function SkillStar({ skill, isHovered, onHover }) {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;

      if (isHovered) {
        meshRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 5) * 0.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        position={skill.position}
        onPointerEnter={() => onHover(skill.name)}
        onPointerLeave={() => onHover(null)}
      >
        {/* Star shape */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 6]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isHovered ? 0.5 : 0.2}
          />
        </mesh>

        {/* Skill name */}
        <Text
          ref={textRef}
          position={[0, 0.3, 0]}
          fontSize={0.2}
          color={isHovered ? '#ffffff' : skill.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/space-mono.woff"
        >
          {skill.name}
        </Text>

        {/* Connection lines when hovered */}
        {isHovered && (
          <mesh>
            <cylinderGeometry args={[0.005, 0.005, 2, 8]} />
            <meshStandardMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function SkillConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill) => (
        <SkillStar
          key={skill.name}
          skill={skill}
          isHovered={hoveredSkill === skill.name}
          onHover={setHoveredSkill}
        />
      ))}

      {/* Central hub */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#00bcd4"
          emissive="#00bcd4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}