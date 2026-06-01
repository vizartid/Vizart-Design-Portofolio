/* eslint-disable react/no-unknown-property */
import { Component, ReactNode, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import cardGLB from '../assets/lanyard/card.glb';
import './Lanyard.css';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

interface WebGLBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface WebGLBoundaryState {
  failed: boolean;
}

interface CardSceneProps {
  isMobile: boolean;
}

interface CordLineProps {
  cardRef: React.RefObject<THREE.Group>;
  isMobile: boolean;
}

// ============================================================================
// WebGL Error Boundary
// ============================================================================

class WebGLBoundary extends Component<WebGLBoundaryProps, WebGLBoundaryState> {
  state: WebGLBoundaryState = { failed: false };

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { failed: true };
  }

  render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

// ============================================================================
// Fallback Card Component (CSS-only for non-WebGL devices)
// ============================================================================

function FallbackCard(): JSX.Element {
  return (
    <div className="lanyard-fallback">
      {/* Cord SVG */}
      <div className="lanyard-fallback-cord">
        <svg viewBox="0 0 80 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cord-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path
            d="M 40 0 C 40 0, 20 30, 20 60 C 20 90, 40 95, 40 110"
            fill="none"
            stroke="url(#cord-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        <div className="lanyard-fallback-clip">
          <div className="lanyard-fallback-clip-inner" />
        </div>
      </div>

      {/* ID Card */}
      <div className="lanyard-fallback-card">
        <header className="lfc-header">
          <div className="lfc-dot" />
          <span className="lfc-co">PORTFOLIO</span>
          <span className="lfc-badge">DEV</span>
        </header>

        <div className="lfc-photo">
          <img 
            src="/myself.png" 
            alt="Rizky Pratama" 
            className="lfc-photo-img"
            loading="lazy"
          />
        </div>

        <div className="lfc-info">
          <h3 className="lfc-name">Rizky Pratama</h3>
          <p className="lfc-role">Fullstack Dev - AI Engineer</p>
        </div>

        <div className="lfc-divider" />

        <div className="lfc-stats">
          <div className="lfc-stat">
            <span className="lfc-sv">50+</span>
            <span className="lfc-sl">Projects</span>
          </div>
          <div className="lfc-stat">
            <span className="lfc-sv">3+</span>
            <span className="lfc-sl">Years</span>
          </div>
          <div className="lfc-stat">
            <span className="lfc-sv">8</span>
            <span className="lfc-sl">Skills</span>
          </div>
        </div>

        <div className="lfc-holo" />
      </div>
    </div>
  );
}

// ============================================================================
// 3D Cord Line Component
// ============================================================================

function CordLine({ cardRef, isMobile }: CordLineProps): JSX.Element {
  const geomRef = useRef(new THREE.BufferGeometry());
  const lineRef = useRef<THREE.Line>(null);
  const matRef = useRef(new THREE.LineBasicMaterial({ 
    color: '#7c3aed', 
    linewidth: 2 
  }));

  useFrame(() => {
    if (!cardRef.current) return;

    const cardPos = cardRef.current.position;
    const points = [
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(cardPos.x * 0.25, 3.2, 0),
      new THREE.Vector3(cardPos.x * 0.6, cardPos.y + 2, 0),
      new THREE.Vector3(cardPos.x, cardPos.y + 1.2, 0),
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(isMobile ? 16 : 28);
    const positions = new Float32Array(
      curvePoints.flatMap(p => [p.x, p.y, p.z])
    );

    geomRef.current.setAttribute(
      'position', 
      new THREE.BufferAttribute(positions, 3)
    );
    geomRef.current.computeBoundingSphere();

    if (lineRef.current) {
      lineRef.current.geometry = geomRef.current;
    }
  });

  return (
    <primitive 
      object={new THREE.Line(geomRef.current, matRef.current)} 
      ref={lineRef} 
    />
  );
}

// ============================================================================
// 3D Card Scene Component
// ============================================================================

function CardScene({ isMobile }: CardSceneProps): JSX.Element {
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const photoTex = useTexture('/myself.png');
  const cardRef = useRef<THREE.Group>(null!);

  // Physics state
  const angle = useRef(0.3);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const isHovered = useRef(false);

  // Initial position calculation
  const initialX = Math.sin(0.3) * 2.2;
  const initialY = -Math.cos(0.3) * 2.2 + 1.5;

  useEffect(() => {
    if (photoTex) {
      photoTex.wrapS = photoTex.wrapT = THREE.ClampToEdgeWrapping;
      photoTex.needsUpdate = true;
    }
  }, [photoTex]);

  useFrame((_, delta) => {
    if (isDragging.current || !cardRef.current) return;

    const dt = Math.min(delta, 0.033);
    
    // Simple pendulum physics
    velocity.current += -3.5 * Math.sin(angle.current) * dt;
    velocity.current *= 0.97; // Damping
    angle.current += velocity.current * dt;

    // Update card position
    cardRef.current.position.x = Math.sin(angle.current) * 2.2;
    cardRef.current.position.y = -Math.cos(angle.current) * 2.2 + 1.5;
    cardRef.current.rotation.z = -angle.current * 0.25;
  });

  const handlePointerEnter = () => {
    isHovered.current = true;
    document.body.style.cursor = 'grab';
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    document.body.style.cursor = 'auto';
  };

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    isDragging.current = true;
    lastX.current = e.clientX;
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = (e: any) => {
    e.target.releasePointerCapture(e.pointerId);
    isDragging.current = false;
    document.body.style.cursor = isHovered.current ? 'grab' : 'auto';
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current) return;
    
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velocity.current += dx * 0.0015;
    angle.current += dx * 0.004;
  };

  return (
    <>
      {/* Cord */}
      <CordLine cardRef={cardRef} isMobile={isMobile} />

      {/* Anchor point */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color="#9ca3af" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      {/* Card */}
      <group
        ref={cardRef}
        position={[initialX, initialY, 0]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <group scale={2.25} position={[0, -1.2, -0.05]}>
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial
              map={photoTex}
              map-anisotropy={16}
              clearcoat={isMobile ? 0 : 1}
              clearcoatRoughness={0.15}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
          <mesh 
            geometry={nodes.clip.geometry} 
            material={materials.metal} 
            material-roughness={0.3} 
          />
          <mesh 
            geometry={nodes.clamp.geometry} 
            material={materials.metal} 
          />
        </group>
      </group>
    </>
  );
}

// ============================================================================
// Main Lanyard Component
// ============================================================================

export default function Lanyard({ 
  position = [0, 0, 26], 
  fov = 20, 
  transparent = true 
}: LanyardProps): JSX.Element {
  const isMobile = useIsMobile();
  const [webglSupported] = useState(() => hasWebGL());

  // Render CSS fallback if WebGL is not supported
  if (!webglSupported) {
    return (
      <div className="lanyard-wrapper">
        <FallbackCard />
      </div>
    );
  }

  return (
    <div className="lanyard-wrapper">
      <WebGLBoundary fallback={<FallbackCard />}>
        <Canvas
          camera={{ position, fov }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ 
            alpha: transparent, 
            failIfMajorPerformanceCaveat: false 
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0), transparent ? 0 : 1);
          }}
        >
          <ambientLight intensity={2} />
          <pointLight position={[5, 5, 5]} intensity={3} />
          <CardScene isMobile={isMobile} />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
