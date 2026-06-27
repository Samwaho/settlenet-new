'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Settlenet gave us a practical way to offer internet to residents without building our own technical team.",
      author: "Property Manager",
      position: "Residential apartments",
      company: "Managed residential property"
    },
    {
      id: 2,
      quote: "The biggest benefit is that provisioning and support are handled for us. Our team can focus on the building.",
      author: "Operations Lead",
      position: "Mixed-use building",
      company: "Commercial property team"
    },
    {
      id: 3,
      quote: "Tenants get a simpler internet option, and the property gets an additional monthly income stream.",
      author: "Property Owner",
      position: "Multi-tenant property",
      company: "Owner-managed portfolio"
    }
  ];
  
  const [current, setCurrent] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <MotionSection id="testimonials" className="section-padding bg-[var(--primary-dark)] text-white">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.span 
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Owner Feedback
          </motion.span>
          
          <MotionText 
            as="h2" 
            className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl"
          >
            Built for property owners who want simple internet revenue
          </MotionText>
        </div>
        
        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="overflow-hidden rounded-lg border border-white/10 bg-white shadow-xl shadow-black/20"
            >
              <div className="grid md:grid-cols-[0.7fr_1.3fr]">
                <div className="bg-[var(--ink)] p-8 text-white md:p-10">
                  <svg className="h-12 w-12 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Property outcome</p>
                  <h3 className="mt-3 text-3xl font-black">{testimonials[current].company}</h3>
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-2xl font-bold leading-10 text-slate-950">&quot;{testimonials[current].quote}&quot;</p>
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <h4 className="text-lg font-black text-slate-950">{testimonials[current].author}</h4>
                    <p className="mt-1 text-slate-600">{testimonials[current].position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white shadow-sm hover:bg-white/16 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white shadow-sm hover:bg-white/16 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full focus:outline-none ${
                  index === current ? 'w-8 bg-[var(--secondary)]' : 'w-2 bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}


