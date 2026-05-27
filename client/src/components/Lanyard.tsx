import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Lanyard.css';

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard(_props: LanyardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [18, -18]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-18, 18]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, [-150, 150], [0, 100]);
  const glowY = useTransform(mouseY, [-150, 150], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div className="lanyard-wrapper">
      <div className="lanyard-scene">
        {/* Cord / Lanyard strap */}
        <div className="lanyard-cord-container">
          <svg viewBox="0 0 100 120" className="lanyard-cord-svg" preserveAspectRatio="none">
            <path
              d="M 50 0 C 50 0, 30 30, 30 60 C 30 90, 50 95, 50 110"
              fill="none"
              stroke="url(#lanyardGrad)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="lanyardGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>

          {/* Metal clip */}
          <div className="lanyard-clip">
            <div className="lanyard-clip-inner" />
          </div>
        </div>

        {/* ID Card */}
        <motion.div
          ref={cardRef}
          className="id-card"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
          whileHover={{ scale: 1.02 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        >
          {/* Glow overlay */}
          <motion.div
            className="id-card-glow"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,0.35) 0%, transparent 65%)`
              ),
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Card content */}
          <div className="id-card-header">
            <div className="id-card-logo-area">
              <div className="id-card-logo-dot" />
              <span className="id-card-company">PORTFOLIO</span>
            </div>
            <div className="id-card-badge">DEV</div>
          </div>

          <div className="id-card-avatar">
            <div className="id-card-avatar-inner">
              <span className="id-card-avatar-initials">RP</span>
            </div>
          </div>

          <div className="id-card-info">
            <h3 className="id-card-name">Rizky Pratama</h3>
            <p className="id-card-role">Fullstack Developer & AI Engineer</p>
          </div>

          <div className="id-card-divider" />

          <div className="id-card-footer">
            <div className="id-card-stat">
              <span className="id-card-stat-value">50+</span>
              <span className="id-card-stat-label">Projects</span>
            </div>
            <div className="id-card-stat">
              <span className="id-card-stat-value">3+</span>
              <span className="id-card-stat-label">Years</span>
            </div>
            <div className="id-card-stat">
              <span className="id-card-stat-value">8</span>
              <span className="id-card-stat-label">Skills</span>
            </div>
          </div>

          {/* Holographic strip */}
          <div className="id-card-holo" />

          {/* Barcode */}
          <div className="id-card-barcode">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="id-card-barcode-line"
                style={{ width: `${Math.random() > 0.5 ? 2 : 1}px`, opacity: Math.random() * 0.5 + 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
