"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';

interface TiltCardProps {
  children: React.ReactNode;
  /** Max tilt in degrees */
  maxTilt?: number;
  /** Scale applied on hover */
  hoverScale?: number;
  /** Enable glossy glare highlight */
  glare?: boolean;
  /** Animation delay for entrance (stagger) */
  delay?: number;
  /** Disable while respecting prefers-reduced-motion */
  respectReducedMotion?: boolean;
  className?: string;
  tabIndex?: number;
  role?: string;
}

/**
 * Accessible, pointer‑driven 3D tilt card with optional glare + spring smoothing.
 * Uses CSS preserve-3d and Framer Motion for buttery interpolation.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 14,
  hoverScale = 1.04,
  glare = true,
  delay = 0,
  respectReducedMotion = true,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!respectReducedMotion) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [respectReducedMotion]);

  // Interpolate motion values into rotate transforms
  const rotateX = useTransform(y, [ -0.5, 0.5 ], [ maxTilt, -maxTilt ]);
  const rotateY = useTransform(x, [ -0.5, 0.5 ], [ -maxTilt, maxTilt ]);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 28, mass: 0.9 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 28, mass: 0.9 });
  const springScale = useSpring(scale, { stiffness: 220, damping: 24, mass: 0.9 });

  function handlePointerMove(e: React.PointerEvent) {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    x.set(px - 0.5);
    y.set(py - 0.5);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!ref.current || reduced) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (touch.clientX - rect.left) / rect.width;
    const py = (touch.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  function handleEnter() {
    setHovered(true);
    if (!reduced) scale.set(hoverScale);
  }
  function handleLeave() {
    setHovered(false);
    reset();
  }

  // Glare position
  const glareX = useTransform(x, v => `${(v + 0.5) * 100}%`);
  const glareY = useTransform(y, v => `${(v + 0.5) * 100}%`);
  const glareOpacity = useTransform(scale, [1, hoverScale], [0, 0.55]);

  const motionProps = {
    initial: { opacity: 0, y: 32, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { delay, duration: 0.65, ease: [0.16,0.84,0.44,1] }
  } as const;

  return (
    <motion.div
      ref={ref}
      className={clsx('relative preserve-3d will-change-transform [transform-style:preserve-3d]', className)}
      style={reduced ? undefined : {
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformPerspective: 1100,
      }}
      {...motionProps}
      onPointerMove={handlePointerMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
  onTouchMove={handleTouchMove}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={rest.tabIndex}
      role={rest.role}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
            className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden"
        >
          <motion.div
            className="absolute -inset-[40%] opacity-0 mix-blend-overlay"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.55), transparent 60%)',
              left: glareX,
              top: glareY,
              opacity: glareOpacity,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        </motion.div>
      )}
      {/* Subtle outline shimmer on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-inherit border border-transparent"
        animate={hovered ? { boxShadow: '0 0 0 1px rgba(64,224,208,0.4), 0 0 32px -4px rgba(64,224,208,0.35)' } : { boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      />
    </motion.div>
  );
}
