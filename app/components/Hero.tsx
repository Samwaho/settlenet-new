'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.jpg" 
          alt="Network infrastructure" 
          fill 
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[var(--primary-dark)]/60"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-white max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-medium mb-6">
                Network Infrastructure Solutions
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Property's <span className="text-[var(--secondary)]">Network</span> Into Revenue
              </h1>
              
              <p className="text-lg sm:text-xl mb-8 text-gray-200 leading-relaxed">
                Settlenet helps property owners monetize their network infrastructure with our innovative WebYield model. Increase tenant satisfaction while creating new revenue streams.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#services">
                  <motion.button 
                    className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-white px-8 py-4 rounded-md font-medium shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Our Solutions
                  </motion.button>
                </Link>
                
                <Link href="#contact">
                  <motion.button 
                    className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-md font-medium transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Stats and highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
              <h3 className="text-white text-xl font-semibold mb-6">Why Property Owners Choose Us</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "250+", label: "Properties Served" },
                  { number: "35%", label: "Average Revenue Increase" },
                  { number: "99.9%", label: "Network Uptime" },
                  { number: "24/7", label: "Support Available" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="text-[var(--secondary)] font-bold text-3xl mb-1">{stat.number}</div>
                    <div className="text-gray-200 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-[var(--primary-${i % 2 ? 'light' : 'dark'})]`}></div>
                    ))}
                  </div>
                  <div className="text-white">
                    <div className="font-medium">Trusted by leading property managers</div>
                    <div className="text-sm text-gray-300">Join our network of satisfied clients</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



