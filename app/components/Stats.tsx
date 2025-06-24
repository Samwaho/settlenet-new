'use client';

import { motion } from 'framer-motion';
import MotionCounter from './animations/MotionCounter';

export default function Stats() {
  const stats = [
    { value: 200, label: "Properties Served", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
    { value: 30, label: "Average Revenue Increase", suffix: "%" },
    { value: 24, label: "Support Available", suffix: "/7" }
  ];

  return (
    <section className="py-12 bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <MotionCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  duration={2}
                />
              </div>
              <div className="text-sm md:text-base text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
