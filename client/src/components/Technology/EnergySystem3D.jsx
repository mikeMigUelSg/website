import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera, Environment, MeshDistortMaterial, Sparkles, Float, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import styles from './EnergySystem3D.module.css';

// Geometria do telhado inclinado (duas águas)
function GableRoof({ isActive, roofColor }) {
  const roofGeo = useMemo(() => {
    // Telhado de duas águas - prisma triangular
    const shape = new THREE.Shape();
    shape.moveTo(-1.7, 0);
    shape.lineTo(0, 1.2);
    shape.lineTo(1.7, 0);
    shape.lineTo(-1.7, 0);
    const extrudeSettings = { depth: 3.4, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh geometry={roofGeo} position={[0, 2, -1.7]} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={roofColor || (isActive ? "#8B2500" : "#8B4513")}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

// Componente Casa com telhado de duas águas
function House({ onClick, isActive }) {
  const groupRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (glowRef.current && isActive) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} onClick={onClick}>
      {/* Glow externo */}
      {isActive && (
        <Sphere ref={glowRef} args={[3.5, 32, 32]} position={[0, 1.5, 0]}>
          <meshBasicMaterial
            color="#1DB9A0"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      )}

      {/* Fundação */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.1, 3.6]} />
        <meshStandardMaterial color="#888888" roughness={0.9} />
      </mesh>

      {/* Paredes da casa */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshPhysicalMaterial
          color={isActive ? "#e0f0ee" : "#F5F0E8"}
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>

      {/* Janelas com luz - frente */}
      {[[-0.8, 1.2, 1.51], [0.8, 1.2, 1.51]].map((pos, i) => (
        <group key={`fw${i}`} position={pos}>
          <mesh>
            <boxGeometry args={[0.55, 0.7, 0.02]} />
            <meshStandardMaterial color="#87CEEB" metalness={0.3} roughness={0.1}
              emissive="#FFD700" emissiveIntensity={isActive ? 1.5 : 0.3} />
          </mesh>
          {/* Moldura */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.6, 0.04, 0.01]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.04, 0.75, 0.01]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {isActive && <pointLight color="#FFD700" intensity={0.5} distance={3} />}
        </group>
      ))}

      {/* Janelas - traseira */}
      {[[-0.8, 1.2, -1.51], [0.8, 1.2, -1.51]].map((pos, i) => (
        <mesh key={`bw${i}`} position={pos}>
          <boxGeometry args={[0.55, 0.7, 0.02]} />
          <meshStandardMaterial color="#87CEEB" metalness={0.3} roughness={0.1}
            emissive="#FFD700" emissiveIntensity={isActive ? 1 : 0.2} />
        </mesh>
      ))}

      {/* Telhado de duas águas */}
      <GableRoof isActive={isActive} />

      {/* Porta */}
      <group position={[0, 0.55, 1.51]}>
        <mesh>
          <boxGeometry args={[0.7, 1.1, 0.02]} />
          <meshStandardMaterial color="#5C3317" metalness={0.2} roughness={0.7} />
        </mesh>
        {/* Maçaneta */}
        <mesh position={[0.25, 0, 0.02]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Chaminé */}
      <mesh position={[0.8, 3, -0.5]} castShadow>
        <boxGeometry args={[0.35, 0.8, 0.35]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Label */}
      {isActive && (
        <Html position={[0, 4.2, 0]} center distanceFactor={10}>
          <div className={styles.label}>
            <div className={styles.labelIcon}>🏠</div>
            <div>Casa / Empresa</div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Painel Solar no telhado inclinado
function SolarPanel({ onClick, isActive, energyFlow }) {
  const groupRef = useRef();

  // O telhado frontal vai de (0, 3.2, 0) no topo até (1.7, 2, 0) na base
  // Inclinação = atan(1.2 / 1.7) ≈ 35 graus
  // Posicionamos o painel na superfície frontal do telhado
  const roofAngle = Math.atan2(1.2, 1.7); // ~35 graus

  return (
    <group ref={groupRef} position={[0, 0, 0]} onClick={onClick}>
      {/* Painel montado na face frontal do telhado */}
      <group position={[0, 3.5, 1.5]} rotation={[roofAngle, 0, 0]}>
        {/* Painel principal */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.06, 1.6]} />
          <meshPhysicalMaterial
            color={energyFlow === 'day' ? "#1a237e" : "#0a0f2e"}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            emissive={energyFlow === 'day' ? "#1DB9A0" : "#000000"}
            emissiveIntensity={energyFlow === 'day' ? 0.5 : 0}
            reflectivity={1}
          />
        </mesh>

        {/* Grid de células solares */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[-1.0 + col * 0.65, 0.04, -0.65 + row * 0.24]}
            >
              <boxGeometry args={[0.55, 0.01, 0.2]} />
              <meshStandardMaterial
                color="#1a237e"
                metalness={1}
                roughness={0.2}
                emissive={energyFlow === 'day' ? "#4169E1" : "#000000"}
                emissiveIntensity={energyFlow === 'day' ? 0.4 : 0}
              />
            </mesh>
          ))
        )}

        {/* Borda de alumínio */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[2.5, 0.04, 1.7]} />
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Sparkles quando gerando */}
      {energyFlow === 'day' && (
        <Sparkles
          count={50}
          scale={[3, 2, 3]}
          size={2}
          speed={0.4}
          color="#FFD700"
          position={[0, 3, 0.5]}
        />
      )}

      {isActive && (
        <Html position={[0, 4.5, 0.5]} center distanceFactor={10}>
          <div className={styles.label}>
            <div className={styles.labelIcon}>☀️</div>
            <div>Painéis Solares<br/><small>Geração Renovável</small></div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Bateria BESS Ultra Realista
function Battery({ onClick, isActive, energyFlow }) {
  const groupRef = useRef();
  const glowRef = useRef();
  const [chargeLevel, setChargeLevel] = useState(0.7);

  useFrame((state) => {
    if (groupRef.current && (energyFlow === 'day' || energyFlow === 'night')) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (glowRef.current) {
      const intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      glowRef.current.scale.setScalar(intensity);
    }
  });

  return (
    <group position={[-4.5, 0, 0]} onClick={onClick}>
      {/* Plataforma base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      <group ref={groupRef}>
        {/* Corpo principal da bateria - cilíndrico moderno */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
          <meshPhysicalMaterial
            color={isActive ? "#1a1a1a" : "#2a2a2a"}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#1DB9A0"
            emissiveIntensity={isActive ? 0.3 : 0.05}
          />
        </mesh>

        {/* Indicador de carga LED */}
        {Array.from({ length: 10 }).map((_, i) => {
          const filled = i < chargeLevel * 10;
          return (
            <mesh key={i} position={[0.81, -0.8 + i * 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.1, 0.05, 0.3]} />
              <meshStandardMaterial
                color={filled ? "#00FF00" : "#1a1a1a"}
                emissive={filled ? "#00FF00" : "#000000"}
                emissiveIntensity={filled ? 1 : 0}
              />
            </mesh>
          );
        })}

        {/* Terminal positivo dourado */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.3, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0.1}
            emissive="#FFD700"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Terminal negativo */}
        <mesh position={[0, -1.15, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Detalhes técnicos - anéis */}
        {[-0.6, 0, 0.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <torusGeometry args={[0.82, 0.03, 16, 32]} />
            <meshStandardMaterial color="#1DB9A0" metalness={1} roughness={0.1} />
          </mesh>
        ))}

        {/* Glow esférico */}
        <Sphere ref={glowRef} args={[1.3, 32, 32]}>
          <meshBasicMaterial
            color="#1DB9A0"
            transparent
            opacity={isActive ? 0.15 : 0.05}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>

      {/* Sparkles de energia */}
      {(energyFlow === 'day' || energyFlow === 'night') && (
        <Sparkles
          count={30}
          scale={2}
          size={3}
          speed={0.3}
          color="#1DB9A0"
        />
      )}

      {isActive && (
        <Html position={[0, 2.5, 0]} center distanceFactor={10}>
          <div className={styles.label}>
            <div className={styles.labelIcon}>🔋</div>
            <div>Bateria BESS<br/><small>7 kWh | 48V DC</small></div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Inversor High-Tech
function Inverter({ onClick, isActive }) {
  const displayRef = useRef();

  useFrame((state) => {
    if (displayRef.current) {
      displayRef.current.material.emissiveIntensity =
        0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group position={[-2, 0.5, -4]} onClick={onClick}>
      {/* Caixa principal do inversor */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.8, 0.4]} />
        <meshPhysicalMaterial
          color={isActive ? "#2a2a2a" : "#424242"}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* Display digital */}
      <mesh ref={displayRef} position={[0, 0, 0.21]}>
        <boxGeometry args={[0.7, 0.4, 0.02]} />
        <meshStandardMaterial
          color="#001a00"
          emissive="#00FF00"
          emissiveIntensity={1}
        />
      </mesh>

      {/* LEDs indicadores */}
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -0.3, 0.21]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial
            color={i < 2 ? "#00FF00" : "#FF0000"}
            emissive={i < 2 ? "#00FF00" : "#FF0000"}
            emissiveIntensity={isActive ? 1 : 0.2}
          />
        </mesh>
      ))}

      {/* Ventilação */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.35 + i * 0.1, 0.15, 0.21]}>
          <boxGeometry args={[0.05, 0.25, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Conectores */}
      {[[-0.51, 0, 0], [0.51, 0, 0]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {isActive && (
        <Html position={[0, 1, 0]} center distanceFactor={10}>
          <div className={styles.label}>
            <div className={styles.labelIcon}>⚡</div>
            <div>Inversor<br/><small>48V DC → 230V AC</small></div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Rede Elétrica Detalhada
function Grid({ onClick, isActive, energyFlow }) {
  const sparkRef = useRef();

  return (
    <group position={[4.5, 0, 0]} onClick={onClick}>
      {/* Poste de concreto */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 4, 16]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>

      {/* Isoladores */}
      {[3.5, 3.7, 3.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            metalness={0.2}
            roughness={0.1}
            clearcoat={1}
          />
        </mesh>
      ))}

      {/* Transformador */}
      <group position={[0, 4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.6, 0.6]} />
          <meshPhysicalMaterial
            color={isActive ? "#1a1a1a" : "#4a4a4a"}
            metalness={0.9}
            roughness={0.2}
            emissive={energyFlow === 'export' ? "#FFD700" : "#1DB9A0"}
            emissiveIntensity={energyFlow === 'export' ? 0.8 : isActive ? 0.3 : 0}
          />
        </mesh>

        {/* Dissipadores de calor */}
        {[-0.25, 0, 0.25].map((z, i) => (
          <mesh key={i} position={[0.41, 0, z]}>
            <boxGeometry args={[0.02, 0.5, 0.08]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Cabos de alta tensão */}
      {[0.3, 0, -0.3].map((z, i) => (
        <mesh key={i} position={[0, 4.3, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} />
        </mesh>
      ))}

      {/* Efeito de energia quando exportando */}
      {energyFlow === 'export' && (
        <>
          <Sparkles
            ref={sparkRef}
            count={40}
            scale={[1.5, 2, 1.5]}
            size={4}
            speed={0.8}
            color="#FFD700"
            position={[0, 4, 0]}
          />
          <pointLight color="#FFD700" intensity={2} distance={5} position={[0, 4, 0]} />
        </>
      )}

      {isActive && (
        <Html position={[0, 5, 0]} center distanceFactor={10}>
          <div className={styles.label}>
            <div className={styles.labelIcon}>🔌</div>
            <div>Rede Elétrica<br/><small>Distribuição</small></div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Tubos de energia animados
function EnergyTube({ from, to, active, color = "#1DB9A0" }) {
  const tubeRef = useRef();
  const particlesRef = useRef();
  const particleCount = 50;

  const { curve, tubeGeometry } = useMemo(() => {
    const points = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = from[0] + (to[0] - from[0]) * t;
      const y = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI) * 0.5;
      const z = from[2] + (to[2] - from[2]) * t;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.05, 8, false);
    return { curve, tubeGeometry };
  }, [from, to]);

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const point = curve.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      sizes[i] = Math.random() * 0.15 + 0.05;
    }
    return { positions, sizes };
  }, [curve]);

  useFrame((state) => {
    if (tubeRef.current && active) {
      tubeRef.current.material.emissiveIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }

    if (particlesRef.current && active) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime * 1.5;

      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount + time) % 1);
        const point = curve.getPoint(t);
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <>
      {/* Tubo base */}
      <mesh ref={tubeRef} geometry={tubeGeometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Partículas */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color={color}
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// Ambiente e iluminação dinâmica
function SceneEnvironment({ energyFlow }) {
  const isDaytime = energyFlow === 'day' || energyFlow === 'export';

  return (
    <>
      {/* Iluminação ambiental - boa visibilidade sempre */}
      <ambientLight intensity={isDaytime ? 1.2 : 0.7} />

      {/* Luz direcional principal (sol/lua) */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={isDaytime ? 3.5 : 1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color={isDaytime ? "#FFF5E6" : "#8AAED9"}
      />

      {/* Luzes de preenchimento */}
      <pointLight
        position={[-5, 5, -5]}
        intensity={isDaytime ? 2 : 1}
        color={isDaytime ? "#FFF5E6" : "#A8C5E8"}
      />
      <pointLight
        position={[5, 5, 5]}
        intensity={isDaytime ? 1.5 : 0.8}
        color={isDaytime ? "#ffffff" : "#8AAED9"}
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={1}
        intensity={isDaytime ? 2 : 0.8}
        castShadow
        color={isDaytime ? "#FFF5E6" : "#A8C5E8"}
      />
      {/* Luz de preenchimento adicional */}
      <hemisphereLight
        intensity={isDaytime ? 1 : 0.5}
        color={isDaytime ? "#FFF5E6" : "#8AAED9"}
        groundColor="#042b29"
      />

      {/* Luz de lua à noite - mais forte */}
      {!isDaytime && (
        <pointLight
          position={[-10, 10, -10]}
          intensity={1.5}
          color="#B8D5F0"
          distance={30}
        />
      )}
    </>
  );
}

// Casa VPP tamanho real com telhado de duas águas, painel solar e bateria
function VPPHouse({ position, index }) {
  const rotation = Math.atan2(-position[0], -position[2]);
  const roofAngle = Math.atan2(1.2, 1.7);

  const roofGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.7, 0);
    shape.lineTo(0, 1.2);
    shape.lineTo(1.7, 0);
    shape.lineTo(-1.7, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 3.4, bevelEnabled: false });
  }, []);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Fundação */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.1, 3.6]} />
        <meshStandardMaterial color="#888888" roughness={0.9} />
      </mesh>

      {/* Paredes */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshPhysicalMaterial color="#F5F0E8" metalness={0.1} roughness={0.6} />
      </mesh>

      {/* Janelas */}
      {[[-0.8, 1.2, 1.51], [0.8, 1.2, 1.51]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.55, 0.7, 0.02]} />
          <meshStandardMaterial color="#87CEEB" metalness={0.3} roughness={0.1}
            emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Porta */}
      <mesh position={[0, 0.55, 1.51]}>
        <boxGeometry args={[0.7, 1.1, 0.02]} />
        <meshStandardMaterial color="#5C3317" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Telhado de duas águas */}
      <mesh geometry={roofGeo} position={[0, 2, -1.7]} castShadow>
        <meshPhysicalMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Painel solar no telhado frontal */}
      <group position={[0, 2.6, 0.85]} rotation={[-roofAngle, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.4, 0.06, 1.6]} />
          <meshPhysicalMaterial
            color="#1a237e" metalness={0.9} roughness={0.1} clearcoat={1}
            emissive="#1DB9A0" emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[2.5, 0.04, 1.7]} />
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Bateria BESS ao lado da casa */}
      <group position={[2, 0, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          <meshPhysicalMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} clearcoat={1}
            emissive="#1DB9A0" emissiveIntensity={0.3} />
        </mesh>
        {[-0.2, 0.1, 0.4].map((y, i) => (
          <mesh key={i} position={[0, y + 0.2, 0]}>
            <torusGeometry args={[0.52, 0.02, 16, 32]} />
            <meshStandardMaterial color="#1DB9A0" metalness={1} roughness={0.1} />
          </mesh>
        ))}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Sparkles */}
      <Sparkles count={10} scale={[4, 3, 4]} size={1.5} speed={0.2} color="#1DB9A0" />
    </group>
  );
}

// Cena principal
function Scene({ energyFlow, activeComponent, setActiveComponent }) {
  const isVPP = energyFlow === 'vpp';
  const isDaytime = energyFlow === 'day' || energyFlow === 'export' || energyFlow === 'vpp';

  return (
    <>
      <PerspectiveCamera makeDefault position={isVPP ? [30, 20, 30] : [10, 8, 10]} fov={50} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={isVPP ? 20 : 8}
        maxDistance={isVPP ? 50 : 20}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={isVPP ? 0.5 : 0.8}
        dampingFactor={0.05}
        enableDamping
      />

      <SceneEnvironment energyFlow={energyFlow} />

      {/* Fog para profundidade - muda com dia/noite */}
      <fog attach="fog" args={[
        isDaytime ? '#87CEEB' : '#1a2a3a',
        isVPP ? 40 : 20,
        isVPP ? 80 : 40
      ]} />

      {/* Componentes do sistema - Casa e Painel juntos sem Float para manter alinhados */}
      <House
        onClick={() => setActiveComponent(activeComponent === 'house' ? null : 'house')}
        isActive={activeComponent === 'house'}
      />

      <SolarPanel
        onClick={() => setActiveComponent(activeComponent === 'solar' ? null : 'solar')}
        isActive={activeComponent === 'solar'}
        energyFlow={energyFlow}
      />

      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.2}>
        <Battery
          onClick={() => setActiveComponent(activeComponent === 'battery' ? null : 'battery')}
          isActive={activeComponent === 'battery'}
          energyFlow={energyFlow}
        />
      </Float>

      <Inverter
        onClick={() => setActiveComponent(activeComponent === 'inverter' ? null : 'inverter')}
        isActive={activeComponent === 'inverter'}
      />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Grid
          onClick={() => setActiveComponent(activeComponent === 'grid' ? null : 'grid')}
          isActive={activeComponent === 'grid'}
          energyFlow={energyFlow}
        />
      </Float>

      {/* Fluxos de energia com tubos animados */}
      {/* Inversor está em [-2, 0.5, -4] */}
      {/* Dia: Solar -> Inversor -> Casa + Bateria */}
      <EnergyTube
        from={[0, 3, 0.85]}
        to={[-2, 0.5, -4]}
        active={energyFlow === 'day'}
        color="#1DB9A0"
      />
      <EnergyTube
        from={[-2, 0.5, -4]}
        to={[0, 1.5, 0]}
        active={energyFlow === 'day'}
        color="#1DB9A0"
      />
      <EnergyTube
        from={[-2, 0.5, -4]}
        to={[-4.5, 0.8, 0]}
        active={energyFlow === 'day'}
        color="#1DB9A0"
      />

      {/* Noite: Bateria -> Inversor -> Casa */}
      <EnergyTube
        from={[-4.5, 0.8, 0]}
        to={[-2, 0.5, -4]}
        active={energyFlow === 'night'}
        color="#FFD700"
      />
      <EnergyTube
        from={[-2, 0.5, -4]}
        to={[0, 1.5, 0]}
        active={energyFlow === 'night'}
        color="#FFD700"
      />

      {/* Export: Solar + Bateria -> Inversor -> Rede */}
      <EnergyTube
        from={[0, 3, 0.85]}
        to={[-2, 0.5, -4]}
        active={energyFlow === 'export'}
        color="#1DB9A0"
      />
      <EnergyTube
        from={[-4.5, 0.8, 0]}
        to={[-2, 0.5, -4]}
        active={energyFlow === 'export'}
        color="#FFD700"
      />
      <EnergyTube
        from={[-2, 0.5, -4]}
        to={[4.5, 4, 0]}
        active={energyFlow === 'export'}
        color="#FF6B00"
      />

      {/* VPP: 10 casas tamanho real conectadas à rede */}
      {isVPP && (
        <>
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const radius = 18;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
              <React.Fragment key={i}>
                <VPPHouse position={[x, 0, z]} index={i} />
                <EnergyTube
                  from={[x, 1.5, z]}
                  to={[4.5, 3, 0]}
                  active={true}
                  color="#1DB9A0"
                />
              </React.Fragment>
            );
          })}
          {/* Hub central -> Rede */}
          <EnergyTube
            from={[0, 1.5, 0]}
            to={[4.5, 3, 0]}
            active={true}
            color="#FFD700"
          />
        </>
      )}

      {/* Terreno com relva */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[isVPP ? 60 : 30, isVPP ? 60 : 30]} />
        <meshStandardMaterial
          color={isDaytime ? "#4a7c4f" : "#2a4a2f"}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Estrada de asfalto */}
      {!isVPP && (
        <>
          {/* Estrada principal horizontal */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]} receiveShadow>
            <planeGeometry args={[25, 3]} />
            <meshStandardMaterial color={isDaytime ? "#3a3a3a" : "#252525"} roughness={0.85} metalness={0.1} />
          </mesh>
          {/* Linha central da estrada */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 5]}>
            <planeGeometry args={[20, 0.1]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.1} />
          </mesh>
          {/* Passeio/calçada em frente à casa */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 3]} receiveShadow>
            <planeGeometry args={[8, 1]} />
            <meshStandardMaterial color={isDaytime ? "#c0b8a8" : "#8a8278"} roughness={0.9} metalness={0.05} />
          </mesh>
          {/* Entrada da garagem / caminho */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2.2]} receiveShadow>
            <planeGeometry args={[2, 1.5]} />
            <meshStandardMaterial color={isDaytime ? "#5a5a5a" : "#3a3a3a"} roughness={0.85} metalness={0.1} />
          </mesh>
        </>
      )}

      {/* Estrada circular para VPP */}
      {isVPP && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <ringGeometry args={[16, 19, 64]} />
          <meshStandardMaterial color={isDaytime ? "#3a3a3a" : "#252525"} roughness={0.85} metalness={0.1} />
        </mesh>
      )}

      {/* Partículas ambientais */}
      <Sparkles
        count={100}
        scale={[20, 10, 20]}
        size={1}
        speed={0.1}
        opacity={0.3}
        color="#1DB9A0"
      />
    </>
  );
}

export default function EnergySystem3D() {
  const [energyFlow, setEnergyFlow] = useState('day');
  const [activeComponent, setActiveComponent] = useState(null);

  const flowModes = [
    {
      id: 'day',
      label: '☀️ Modo Dia',
      description: 'Sol alimenta casa e carrega bateria',
      icon: '☀️'
    },
    {
      id: 'night',
      label: '🌙 Modo Noite',
      description: 'Bateria fornece energia à casa',
      icon: '🌙'
    },
    {
      id: 'export',
      label: '⚡ Excedente',
      description: 'Solar + Bateria vendem energia à rede',
      icon: '⚡'
    },
    {
      id: 'vpp',
      label: '🏘️ Modo VPP',
      description: 'Rede de 10 casas funcionando como central virtual',
      icon: '🏘️'
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={[
            energyFlow === 'day' || energyFlow === 'export' || energyFlow === 'vpp' ? '#87CEEB' : '#1a2535'
          ]} />
          <Scene
            energyFlow={energyFlow}
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        </Canvas>
      </div>

      <div className={styles.controls}>
        <h4 className={styles.controlsTitle}>Cenários de Operação</h4>
        <div className={styles.flowButtons}>
          {flowModes.map((mode) => (
            <button
              key={mode.id}
              className={`${styles.flowButton} ${energyFlow === mode.id ? styles.active : ''}`}
              onClick={() => setEnergyFlow(mode.id)}
            >
              <span className={styles.flowIcon}>{mode.icon}</span>
              <span className={styles.flowLabel}>{mode.label}</span>
              <span className={styles.flowDesc}>{mode.description}</span>
            </button>
          ))}
        </div>
        <p className={styles.hint}>
          💡 <strong>Interaja:</strong> Clique nos componentes para informações | Arraste para rotacionar | Scroll para zoom
        </p>
      </div>
    </div>
  );
}
