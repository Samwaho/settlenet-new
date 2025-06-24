'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface MotionScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export default function MotionScrollReveal({
  children,
  className = '',
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1
}: MotionScrollRevealProps) {
  // Set initial position based on direction
  let initial = {};
  
  switch (direction) {
    case 'up':
      initial = { opacity: 0, y: distance };
      break;
    case 'down':
      initial = { opacity: 0, y: -distance };
      break;
    case 'left':
      initial = { opacity: 0, x: distance };
      break;
    case 'right':
      initial = { opacity: 0, x: -distance };
      break;
    default:
      initial = { opacity: 0, y: distance };
  }
  
  // Animation variants
  const variants: Variants = {
    hidden: initial,
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}