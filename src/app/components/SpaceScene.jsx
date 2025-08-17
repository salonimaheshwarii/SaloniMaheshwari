'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';
import SkillConstellation from './SkillConstellation';

// Professional Planet System Component
function PlanetSystem({ currentSection, planets }) {
  const systemRef = useRef();

  useFrame((state) => {
    if (systemRef.current) {
      // Rotate the entire planet system based on current section
      const targetRotation = (currentSection * Math.PI * 2) / planets.length;
      systemRef.current.rotation.y = THREE.MathUtils.lerp(
        systemRef.current.rotation.y,
        -targetRotation,
        0.05
      );
    }
  });

  return (
    <group ref={systemRef}>
      {planets.map((planet, index) => (
        <Planet
          key={index}
          position={planet.position}
          size={planet.size}
          color={planet.color}
          emissive={planet.emissive}
          name={planet.name}
          currentSection={currentSection}
          sectionIndex={index}
          isActive={currentSection === index}
        />
      ))}
    </group>
  );
}

// Realistic Planet Component
function Planet({ position, size, color, emissive, name, currentSection, sectionIndex, isActive }) {
  const meshRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();
  const labelRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous planet rotation
      meshRef.current.rotation.y += 0.01;

      // Professional emphasis for active planet
      if (isActive) {
        // Subtle scale increase for active planet
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1);
      } else {
        // Smaller scale for inactive planets
        meshRef.current.scale.setScalar(0.8);
      }
    }

    // Animate clouds for active planet
    if (cloudsRef.current && isActive) {
      cloudsRef.current.rotation.y += 0.015;
    }

    // Enhanced atmosphere for active planet
    if (atmosphereRef.current) {
      if (isActive) {
        atmosphereRef.current.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        atmosphereRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      } else {
        atmosphereRef.current.material.opacity = 0.1;
        atmosphereRef.current.material.emissiveIntensity = 0.1;
      }
    }

    // Label always faces camera
    if (labelRef.current) {
      labelRef.current.lookAt(0, 0, 5);
    }
  });

  // Different planet types based on section
  const getPlanetType = (index) => {
    const types = [
      { type: 'earth', hasAtmosphere: true, hasClouds: true, hasRings: false },
      { type: 'mars', hasAtmosphere: false, hasClouds: false, hasRings: false },
      { type: 'gas', hasAtmosphere: true, hasClouds: true, hasRings: false },
      { type: 'ringed', hasAtmosphere: false, hasClouds: false, hasRings: true },
      { type: 'ice', hasAtmosphere: false, hasClouds: false, hasRings: false },
      { type: 'volcanic', hasAtmosphere: true, hasClouds: false, hasRings: false },
      { type: 'desert', hasAtmosphere: false, hasClouds: false, hasRings: false },
      { type: 'ocean', hasAtmosphere: true, hasClouds: true, hasRings: true },
      { type: 'crystal', hasAtmosphere: false, hasClouds: false, hasRings: false }
    ];
    return types[index] || types[0];
  };

  const planetType = getPlanetType(sectionIndex);

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        {/* Main planet surface */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={isActive ? 0.3 : 0.1}
            metalness={planetType.type === 'crystal' ? 0.8 : 0.1}
            roughness={planetType.type === 'ice' ? 0.1 : 0.7}
          />
        </mesh>

        {/* Cloud layer */}
        {planetType.hasClouds && (
          <mesh ref={cloudsRef}>
            <sphereGeometry args={[size * 1.02, 32, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.4}
              emissive="#ffffff"
              emissiveIntensity={0.1}
            />
          </mesh>
        )}

        {/* Atmosphere */}
        {planetType.hasAtmosphere && (
          <mesh ref={atmosphereRef}>
            <sphereGeometry args={[size * 1.1, 32, 32]} />
            <meshStandardMaterial
              color={emissive}
              transparent
              opacity={0.2}
              emissive={emissive}
              emissiveIntensity={0.2}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {/* Planetary rings */}
        {planetType.hasRings && (
          <>
            <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
              <ringGeometry args={[size * 1.4, size * 1.8, 64]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
                emissive={emissive}
                emissiveIntensity={0.1}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
              <ringGeometry args={[size * 2.0, size * 2.2, 64]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
                emissive={emissive}
                emissiveIntensity={0.05}
              />
            </mesh>
          </>
        )}

        {/* Moons for some planets */}
        {sectionIndex % 4 === 0 && (
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[size * 2.5, 0, 0]}>
              <sphereGeometry args={[size * 0.2, 16, 16]} />
              <meshStandardMaterial
                color="#cccccc"
                emissive="#444444"
                emissiveIntensity={0.1}
                roughness={0.9}
              />
            </mesh>
          </Float>
        )}

        {/* Professional active planet effects */}
        {isActive && (
          <>
            {/* Professional glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.4, size * 1.5, 64]} />
              <meshStandardMaterial
                color={emissive}
                transparent
                opacity={0.6}
                emissive={emissive}
                emissiveIntensity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Outer emphasis ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.8, size * 1.9, 64]} />
              <meshStandardMaterial
                color="#3b82f6"
                transparent
                opacity={0.4}
                emissive="#3b82f6"
                emissiveIntensity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}

        {/* Professional section label */}
        {isActive && (
          <group ref={labelRef} position={[0, size * 1.8, 0]}>
            <mesh>
              <planeGeometry args={[3, 0.6]} />
              <meshStandardMaterial
                color="#1e293b"
                transparent
                opacity={0.9}
              />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[2.8, 0.4]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#3b82f6"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        )}

        {/* Enhanced lighting for active planet */}
        <pointLight
          position={[size * 2, size * 2, size * 2]}
          color={isActive ? "#3b82f6" : emissive}
          intensity={isActive ? 2 : 0.3}
          distance={size * 10}
        />
      </group>
    </Float>
  );
}

// Asteroid Field
function AsteroidField() {
  const asteroids = useMemo(() => {
    const temp = [];
    // Use deterministic pseudo-random generation
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (seededRandom(i * 3 + 1) - 0.5) * 50,
          (seededRandom(i * 3 + 2) - 0.5) * 50,
          (seededRandom(i * 3 + 3) - 0.5) * 50
        ],
        rotation: [
          seededRandom(i + 100) * Math.PI,
          seededRandom(i + 200) * Math.PI,
          seededRandom(i + 300) * Math.PI
        ],
        scale: seededRandom(i + 400) * 0.5 + 0.1
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {asteroids.map((asteroid, index) => (
        <mesh key={index} position={asteroid.position} rotation={asteroid.rotation} scale={asteroid.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}
    </group>
  );
}

// Main Space Scene
export default function SpaceScene({ currentSection }) {
  // Professional circular planet arrangement
  const planets = useMemo(() => {
    const radius = 12;
    const planetData = [
      { size: 1.5, color: "#4a90e2", emissive: "#1e3a8a", name: "Portfolio" },
      { size: 1.3, color: "#06b6d4", emissive: "#0891b2", name: "About" },
      { size: 1.4, color: "#8b5cf6", emissive: "#7c3aed", name: "Education" },
      { size: 1.6, color: "#10b981", emissive: "#059669", name: "Experience" },
      { size: 1.5, color: "#f59e0b", emissive: "#d97706", name: "Projects" },
      { size: 1.3, color: "#ef4444", emissive: "#dc2626", name: "Skills" },
      { size: 1.2, color: "#ec4899", emissive: "#db2777", name: "Achievements" },
      { size: 1.4, color: "#6366f1", emissive: "#4f46e5", name: "Certifications" },
      { size: 1.1, color: "#84cc16", emissive: "#65a30d", name: "Contact" }
    ];

    return planetData.map((planet, index) => {
      const angle = (index / planetData.length) * Math.PI * 2;
      return {
        ...planet,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5) * 2, // Slight vertical variation
          Math.sin(angle) * radius - 8
        ]
      };
    });
  }, []);

  return (
    <>
      {/* Ambient lighting - soft space ambient */}
      <ambientLight intensity={0.15} color="#0a0a2e" />

      {/* Main star light - simulating a distant sun */}
      <directionalLight
        position={[20, 20, 10]}
        intensity={1.2}
        color="#fff8dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Secondary star light from opposite direction */}
      <directionalLight
        position={[-15, -10, -5]}
        intensity={0.3}
        color="#4169e1"
      />

      {/* Nebula lighting effects */}
      <pointLight position={[-20, 10, -15]} color="#ff69b4" intensity={0.4} distance={30} />
      <pointLight position={[25, -15, 10]} color="#00ced1" intensity={0.4} distance={30} />
      <pointLight position={[0, 25, -20]} color="#9370db" intensity={0.3} distance={25} />

      {/* Dynamic cosmic lighting */}
      <pointLight position={[0, 0, 15]} color="#ffd700" intensity={0.6} distance={40} />

      {/* Stars background */}
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />

      {/* Professional Planet System */}
      <PlanetSystem currentSection={currentSection} planets={planets} />

      {/* Subtle particle field for depth */}
      <ParticleField count={800} />

      {/* Professional background gradient */}
      <mesh position={[0, 0, -25]} scale={[40, 40, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          transparent
          opacity={0.6}
          emissive="#1e293b"
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
}