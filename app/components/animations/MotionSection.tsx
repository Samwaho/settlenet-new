'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  id?: string;
}

// Default animation variants
const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

export default function MotionSection({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.6, 
  variants = defaultVariants,
  id
}: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ 
        delay, 
        duration,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.section>
  );
}
