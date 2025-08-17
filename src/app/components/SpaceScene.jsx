'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';
import SkillConstellation from './SkillConstellation';

// Realistic Spaceship Component
function Spaceship({ currentSection }) {
  const meshRef = useRef();
  const engineRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth movement based on current section
      const targetX = (currentSection - 4) * 2;
      const targetY = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02);

      // Banking rotation when moving
      const bankAngle = (targetX - meshRef.current.position.x) * 0.5;
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, bankAngle, 0.1);
      meshRef.current.rotation.y += 0.003;
    }

    // Animate engine glow
    if (engineRef.current) {
      engineRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 8) * 0.5;
      engineRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 6) * 0.2);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={meshRef} position={[0, 0, 2]}>
        {/* Main fuselage */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 1.2, 12]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.8}
            roughness={0.2}
            emissive="#1a1a2e"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Cockpit */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.2, 12, 8]} />
          <meshStandardMaterial
            color="#4a90e2"
            metalness={0.1}
            roughness={0.1}
            transparent
            opacity={0.8}
            emissive="#1e3a8a"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Wings */}
        <mesh position={[-0.6, -0.1, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.8, 0.05, 0.3]} />
          <meshStandardMaterial
            color="#b0b0b0"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.6, -0.1, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.8, 0.05, 0.3]} />
          <meshStandardMaterial
            color="#b0b0b0"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Engine nozzles */}
        <mesh position={[-0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 8]} />
          <meshStandardMaterial
            color="#404040"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 8]} />
          <meshStandardMaterial
            color="#404040"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Engine flames */}
        <mesh ref={engineRef} position={[-0.2, -0.9, 0]}>
          <coneGeometry args={[0.1, 0.4, 6]} />
          <meshStandardMaterial
            color="#ff4500"
            emissive="#ff6b35"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.2, -0.9, 0]}>
          <coneGeometry args={[0.1, 0.4, 6]} />
          <meshStandardMaterial
            color="#ff4500"
            emissive="#ff6b35"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Navigation lights */}
        <mesh position={[-0.8, -0.1, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh position={[0.8, -0.1, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Engine lights */}
        <pointLight position={[-0.2, -1, 0]} color="#ff6b35" intensity={2} distance={4} />
        <pointLight position={[0.2, -1, 0]} color="#ff6b35" intensity={2} distance={4} />
        <pointLight position={[0, 0.6, 0]} color="#4a90e2" intensity={1} distance={3} />
      </group>
    </Float>
  );
}

// Realistic Planet Component
function Planet({ position, size, color, emissive, currentSection, sectionIndex }) {
  const meshRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();
  const isActive = currentSection === sectionIndex;

  useFrame((state) => {
    if (meshRef.current) {
      // Realistic planet rotation
      meshRef.current.rotation.y += 0.005;

      // Glow effect for active planet
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }

    // Animate clouds
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.008;
    }

    // Animate atmosphere
    if (atmosphereRef.current) {
      atmosphereRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
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

        {/* Active planet effects */}
        {isActive && (
          <>
            {/* Orbital glow */}
            <mesh>
              <sphereGeometry args={[size * 1.3, 32, 32]} />
              <meshStandardMaterial
                color={emissive}
                transparent
                opacity={0.15}
                emissive={emissive}
                emissiveIntensity={0.4}
              />
            </mesh>

            {/* Particle ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.6, size * 1.65, 32]} />
              <meshStandardMaterial
                color={emissive}
                transparent
                opacity={0.8}
                emissive={emissive}
                emissiveIntensity={1}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}

        {/* Planet lighting */}
        <pointLight
          position={[size * 2, size * 2, size * 2]}
          color={emissive}
          intensity={isActive ? 1.5 : 0.5}
          distance={size * 8}
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
  const planets = [
    // Earth-like (Home) - Blue with atmosphere
    { position: [-15, 0, -10], size: 1.5, color: "#4a90e2", emissive: "#1e3a8a", name: "Earth" },
    // Mars-like (About) - Red desert planet
    { position: [-10, 3, -8], size: 1.2, color: "#cd5c5c", emissive: "#8b0000", name: "Mars" },
    // Gas Giant (Education) - Orange/yellow with bands
    { position: [-5, -2, -6], size: 2, color: "#ffa500", emissive: "#ff8c00", name: "Jupiter" },
    // Ringed Planet (Experience) - Purple with rings
    { position: [0, 1, -4], size: 1.8, color: "#9370db", emissive: "#4b0082", name: "Saturn" },
    // Ocean World (Projects) - Teal with water
    { position: [5, -1, -6], size: 1.6, color: "#20b2aa", emissive: "#008b8b", name: "Neptune" },
    // Forest Planet (Skills) - Green with vegetation
    { position: [10, 2, -8], size: 1.3, color: "#32cd32", emissive: "#228b22", name: "Venus" },
    // Volcanic World (Achievements) - Red/orange with lava
    { position: [15, -3, -10], size: 1.1, color: "#ff4500", emissive: "#dc143c", name: "Mercury" },
    // Ice Planet (Certificates) - Light blue/white
    { position: [20, 0, -12], size: 1.4, color: "#87ceeb", emissive: "#4682b4", name: "Uranus" },
    // Crystal Planet (Contact) - Pink/purple crystalline
    { position: [25, 1, -14], size: 0.9, color: "#da70d6", emissive: "#ba55d3", name: "Pluto" }
  ];

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

      {/* Spaceship */}
      <Spaceship currentSection={currentSection} />

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet
          key={index}
          position={planet.position}
          size={planet.size}
          color={planet.color}
          emissive={planet.emissive}
          currentSection={currentSection}
          sectionIndex={index}
        />
      ))}

      {/* Asteroid field */}
      <AsteroidField />

      {/* Particle field */}
      <ParticleField count={2000} />

      {/* Skill constellation (only show on skills section) */}
      {currentSection === 5 && (
        <group position={[0, 0, 2]}>
          <SkillConstellation />
        </group>
      )}

      {/* Nebula effect */}
      <mesh position={[0, 0, -30]} scale={[50, 50, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1a0033"
          transparent
          opacity={0.3}
          emissive="#4a148c"
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
}