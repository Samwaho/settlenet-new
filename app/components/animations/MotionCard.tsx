'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
  hoverEffect?: boolean;
}

// Default card variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function MotionCard({ 
  children, 
  className = "", 
  delay = 0, 
  index = 0,
  hoverEffect = true
}: MotionCardProps) {
  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover={hoverEffect ? { 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 }
      } : undefined}
    >
      {children}
    </motion.div>
  );
}