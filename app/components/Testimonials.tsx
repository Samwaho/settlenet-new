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
      quote: "Settlenet transformed our property's network infrastructure into a significant revenue stream. Their WebYield model has been a game-changer for our business.",
      author: "Sarah Johnson",
      position: "Property Manager",
      company: "Skyline Properties"
    },
    {
      id: 2,
      quote: "The tenant experience platform has drastically reduced our support tickets and improved satisfaction scores. Our residents love the seamless connectivity.",
      author: "Michael Chen",
      position: "Director of Operations",
      company: "Urban Living Apartments"
    },
    {
      id: 3,
      quote: "Their IoT integration capabilities have helped us future-proof our buildings. We're now able to offer smart home features that our competitors can't match.",
      author: "David Rodriguez",
      position: "CTO",
      company: "NextGen Real Estate"
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
    <MotionSection id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block px-3 py-1 bg-[var(--primary-light)] text-[var(--primary)] rounded-full text-sm font-medium mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Testimonials
          </motion.span>
          
          <MotionText 
            as="h2" 
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            What Our Clients Say
          </MotionText>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <svg className="h-12 w-12 text-[var(--secondary)] mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-600 mb-4">&quot;Working with Settlenet has been a game-changer for our property management. Their solutions have not only improved our network reliability but also opened new revenue streams.&quot;</p>
                <div>
                  <h4 className="font-semibold text-lg">{testimonials[current].author}</h4>
                  <p className="text-gray-600">{testimonials[current].position}, {testimonials[current].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  index === current ? 'w-8 bg-[var(--secondary)]' : 'w-2 bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}


