'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MotionParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative values move in opposite direction
  direction?: 'vertical' | 'horizontal';
}

export default function MotionParallax({ 
  children, 
  className = "", 
  speed = 0.5,
  direction = 'vertical'
}: MotionParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform based on direction
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'vertical' ? [speed * 100, -speed * 100] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'horizontal' ? [speed * 100, -speed * 100] : [0, 0]
  );
  
  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div style={{ y, x }}>
        {children}
      </motion.div>
    </div>
  );
}