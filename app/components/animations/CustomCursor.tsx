'use client';

import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

interface CustomCursorProps {
  children: ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {children}
      {isMounted && (
        <div 
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            opacity: isVisible ? 1 : 0,
            width: '20px',
            height: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transition: 'opacity 0.2s ease'
          }}
        />
      )}
    </>
  );
}
