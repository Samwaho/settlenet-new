'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface MotionTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  staggerChildren?: boolean;
}

// Animation for staggered text
const textVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function MotionText({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.5, 
  as = 'p',
  staggerChildren = false
}: MotionTextProps) {
  const Component = motion[as];
  
  if (!staggerChildren) {
    return (
      <Component
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          delay, 
          duration,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </Component>
    );
  }
  
  // For staggered text animation, split the text into characters
  const text = children?.toString() || '';
  const letters = text.split('');
  
  return (
    <Component
      className={className}
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </Component>
  );
}
