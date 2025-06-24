'use client';

import { motion } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';
import MotionScrollReveal from './animations/MotionScrollReveal';

export default function CTA() {
  return (
    <MotionSection className="py-16 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <MotionText 
              as="h2" 
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to transform your property&apos;s network infrastructure?
            </MotionText>
            
            <MotionText 
              className="text-xl mb-8 text-white/90"
              delay={0.2}
            >
              Schedule a consultation with our experts to learn how Settlenet can help you maximize your property&apos;s value.
            </MotionText>
            
            <MotionScrollReveal 
              direction="up" 
              delay={0.4}
            >
              <motion.button 
                className="bg-white text-[var(--primary)] hover:bg-gray-100 px-6 py-3 rounded-md font-medium shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                Schedule a Consultation
              </motion.button>
            </MotionScrollReveal>
          </div>
          
          <MotionScrollReveal 
            direction="right" 
            delay={0.2}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <motion.input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <motion.input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <div>
                  <label htmlFor="property" className="block text-sm font-medium mb-1">Property Type</label>
                  <motion.select 
                    id="property" 
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="" className="bg-[var(--primary)]">Select property type</option>
                    <option value="apartment" className="bg-[var(--primary)]">Apartment Complex</option>
                    <option value="office" className="bg-[var(--primary)]">Office Building</option>
                    <option value="retail" className="bg-[var(--primary)]">Retail Space</option>
                    <option value="mixed" className="bg-[var(--primary)]">Mixed Use</option>
                    <option value="other" className="bg-[var(--primary)]">Other</option>
                  </motion.select>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-[var(--secondary)] hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium shadow-lg mt-6"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  Submit Request
                </motion.button>
              </form>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--secondary)] rounded-full opacity-30 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </MotionScrollReveal>
        </div>
      </div>
    </MotionSection>
  );
}

