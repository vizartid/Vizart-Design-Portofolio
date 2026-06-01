/* eslint-disable react/no-unknown-property */
import { Component, ReactNode, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import cardGLB from '../assets/lanyard/card.glb';
import './Lanyard.css';

// ─── WebGL error boundary ────────────────────────────────────────────────────
class WebGLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

// ─── CSS fallback card (always shown when WebGL unavailable) ─────────────────
function FallbackCard() {
  return (
    <div className="lanyard-fallback">
      <div className="lanyard-fallback-cord">
        <svg viewBox="0 0 80 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path d="M 40 0 C 40 0, 20 30, 20 60 C 20 90, 40 95, 40 110"
            fill="none" stroke="url(#cg)" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <div className="lanyard-fallback-clip"><div className="lanyard-fallback-clip-inner" /></div>
      </div>

      <div className="lanyard-fallback-card">
        <div className="lfc-header">
          <div className="lfc-dot" /><span className="lfc-co">PORTFOLIO</span>
          <span className="lfc-badge">DEV</span>
        </div>
        <div className="lfc-photo">
          <img src="/myself.png" alt="Rizky Pratama" className="lfc-photo-img" />
        </div>
        <div className="lfc-info">
          <h3 className="lfc-name">Rizky Pratama</h3>
          <p className="lfc-role">Fullstack Dev · AI Engineer</p>
        </div>
        <div className="lfc-divider" />
        <div className="lfc-stats">
          <div className="lfc-stat"><span className="lfc-sv">50+</span><span className="lfc-sl">Projects</span></div>
          <div className="lfc-stat"><span className="lfc-sv">3+</span><span className="lfc-sl">Years</span></div>
          <div className="lfc-stat"><span className="lfc-sv">8</span><span className="lfc-sl">Skills</span></div>
        </div>
        <div className="lfc-holo" />
      </div>
    </div>
  );
}

// ─── WebGL support detection ─────────────────────────────────────────────────
function hasWebGL(): boolean {
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

// ─── Main export ─────────────────────────────────────────────────────────────
export default function Lanyard({ position = [0, 0, 26], fov = 20, transparent = true }: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [webglOk] = useState(() => typeof window !== 'undefined' && hasWebGL());

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  // No WebGL — render CSS card immediately, no Canvas attempted
  if (!webglOk) {
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
          gl={{ alpha: transparent, failIfMajorPerformanceCaveat: false }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0), transparent ? 0 : 1)}
        >
          <ambientLight intensity={2} />
          <pointLight position={[5, 5, 5]} intensity={3} />
          <CardScene isMobile={isMobile} />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}

// ─── 3-D pendulum scene ───────────────────────────────────────────────────────
function CardScene({ isMobile }: { isMobile: boolean }) {
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const photoTex = useTexture('/myself.png');
  const cardRef = useRef<THREE.Group>(null!);

  const angle = useRef(0.3);
  const vel = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const isHovered = useRef(false);

  useEffect(() => {
    if (photoTex) {
      photoTex.wrapS = photoTex.wrapT = THREE.ClampToEdgeWrapping;
      photoTex.needsUpdate = true;
    }
  }, [photoTex]);

  useFrame((_, delta) => {
    if (dragging.current) return;
    const dt = Math.min(delta, 0.033);
    vel.current += -3.5 * Math.sin(angle.current) * dt;
    vel.current *= 0.97;
    angle.current += vel.current * dt;
    if (cardRef.current) {
      cardRef.current.position.x = Math.sin(angle.current) * 2.2;
      cardRef.current.position.y = -Math.cos(angle.current) * 2.2 + 1.5;
      cardRef.current.rotation.z = -angle.current * 0.25;
    }
  });

  return (
    <>
      <CordLine cardRef={cardRef} isMobile={isMobile} />
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.1} />
      </mesh>

      <group
        ref={cardRef}
        position={[Math.sin(0.3) * 2.2, -Math.cos(0.3) * 2.2 + 1.5, 0]}
        onPointerEnter={() => { isHovered.current = true; document.body.style.cursor = 'grab'; }}
        onPointerLeave={() => { isHovered.current = false; document.body.style.cursor = 'auto'; }}
        onPointerDown={(e: any) => {
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          dragging.current = true;
          lastX.current = e.clientX;
          document.body.style.cursor = 'grabbing';
        }}
        onPointerUp={(e: any) => {
          e.target.releasePointerCapture(e.pointerId);
          dragging.current = false;
          document.body.style.cursor = isHovered.current ? 'grab' : 'auto';
        }}
        onPointerMove={(e: any) => {
          if (!dragging.current) return;
          const dx = e.clientX - lastX.current;
          lastX.current = e.clientX;
          vel.current += dx * 0.0015;
          angle.current += dx * 0.004;
        }}
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
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </group>
    </>
  );
}

// ─── Rope ────────────────────────────────────────────────────────────────────
function CordLine({ cardRef, isMobile }: { cardRef: React.RefObject<THREE.Group>; isMobile: boolean }) {
  const geomRef = useRef(new THREE.BufferGeometry());
  const lineRef = useRef<any>(null);
  const mat = useRef(new THREE.LineBasicMaterial({ color: '#7c3aed', linewidth: 2 }));

  useFrame(() => {
    if (!cardRef.current) return;
    const cp = cardRef.current.position;
    const pts = [
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(cp.x * 0.25, 3.2, 0),
      new THREE.Vector3(cp.x * 0.6, cp.y + 2, 0),
      new THREE.Vector3(cp.x, cp.y + 1.2, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(pts);
    const positions = new Float32Array(curve.getPoints(isMobile ? 16 : 28).flatMap(p => [p.x, p.y, p.z]));
    geomRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geomRef.current.computeBoundingSphere();
    if (lineRef.current) lineRef.current.geometry = geomRef.current;
  });

  return <primitive object={new THREE.Line(geomRef.current, mat.current)} ref={lineRef} />;
}
