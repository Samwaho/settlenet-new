'use client';

import { motion } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';
import MotionScrollReveal from './animations/MotionScrollReveal';

export default function About() {
  return (
    <MotionSection id="about" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <motion.span 
            className="inline-block px-3 py-1 bg-[var(--primary-light)] text-[var(--primary)] rounded-full text-sm font-medium mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            About Us
          </motion.span>
          
          <MotionText 
            as="h2" 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
          >
            Transforming Property Networks
          </MotionText>
          
          <MotionText 
            className="mt-3 md:mt-4 text-base md:text-xl text-gray-600 max-w-2xl mx-auto"
            delay={0.2}
          >
            We help property owners turn network infrastructure into a valuable asset
          </MotionText>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <MotionScrollReveal direction="up" delay={0.2} className="md:direction-left">
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm h-full">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-4 md:mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6 text-base md:text-lg">
                At Settlenet, we&apos;re on a mission to revolutionize how property owners manage and monetize their network infrastructure. We believe that with the right technology and approach, your property&apos;s network can become a significant source of revenue and tenant satisfaction.
              </p>
              
              <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-4 md:mb-6">Our Story</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Founded in 2018 by a team of network engineers and real estate professionals, Settlenet was born from the realization that property owners were missing out on significant opportunities in the digital age. We&apos;ve since grown to serve hundreds of properties across the country.
              </p>
            </div>
          </MotionScrollReveal>
          
          <MotionScrollReveal direction="up" delay={0.3} className="md:direction-right">
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm h-full">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-4 md:mb-6">Our Approach</h3>
              <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
                We take a holistic approach to network management, considering both the technical requirements and the business opportunities. Our WebYield model is designed to transform your network from a cost center into a revenue-generating asset.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <motion.div 
                  className="bg-white p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-[var(--primary)] mb-2 md:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Trusted Expertise</h4>
                  <p className="text-gray-600 text-sm md:text-base">Over 10 years of combined experience in network management</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-[var(--primary)] mb-2 md:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Innovative Solutions</h4>
                  <p className="text-gray-600 text-sm md:text-base">Cutting-edge technology tailored for property owners</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-[var(--primary)] mb-2 md:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Client-Focused</h4>
                  <p className="text-gray-600 text-sm md:text-base">Dedicated support and personalized solutions</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-[var(--primary)] mb-2 md:mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-1 md:mb-2">Revenue Focused</h4>
                  <p className="text-gray-600 text-sm md:text-base">Proven models to generate new income streams</p>
                </motion.div>
              </div>
            </div>
          </MotionScrollReveal>
        </div>
      </div>
    </MotionSection>
  );
}




