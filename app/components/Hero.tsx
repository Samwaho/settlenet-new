'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const metrics = [
    "Sell internet packages",
    "Settlenet provisions users",
    "Settlenet manages support",
    "Owners earn recurring revenue",
  ];

  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-[var(--ink)] pt-24 text-white md:min-h-[92vh] md:pt-28">
      <div className="image-vignette absolute inset-0 z-0">
        <Image 
          src="/generated/settlenet-hero-property-network.png" 
          alt="Modern property with connected network infrastructure"
          fill 
          priority
          className="object-cover object-[64%_center]"
          quality={90}
        />
        <div className="absolute inset-0 network-grid opacity-30"></div>
        <div className="aceternity-spotlight absolute inset-0 opacity-80"></div>
      </div>
      
      <div className="section-shell relative z-10 flex min-h-[calc(86vh-6rem)] items-center py-10 md:min-h-[calc(92vh-7rem)] md:py-16">
        <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--secondary)]"></span>
                Internet revenue for apartments, offices, and mixed-use properties
              </span>
              
              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] sm:text-6xl lg:text-7xl xl:text-8xl">
                Turn your property into an internet business.
              </h1>
              
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/85 sm:text-xl">
                Settlenet helps property owners sell internet to tenants and guests. We install the network, provision users, manage support, and keep the service running while you grow recurring revenue.
              </p>
              
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#services" className="group w-full sm:w-auto">
                  <motion.span 
                    className="aceternity-border inline-flex w-full rounded-lg p-[1px] shadow-xl shadow-orange-950/25 sm:w-auto"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--secondary)] px-7 py-4 font-bold text-white transition-colors group-hover:bg-[var(--secondary-dark)] sm:w-auto">
                      See How It Works
                    </span>
                  </motion.span>
                </Link>
                
                <Link href="#contact">
                  <motion.button 
                    className="w-full rounded-lg border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/18 sm:w-auto"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request a Revenue Estimate
                  </motion.button>
                </Link>
              </div>

              <motion.div 
                className="mt-10 flex max-w-3xl flex-wrap gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } }
                }}
              >
                {metrics.map((metric, index) => (
                  <motion.div 
                    key={metric}
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-black">{index + 1}</span>
                    <span>{metric}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}



