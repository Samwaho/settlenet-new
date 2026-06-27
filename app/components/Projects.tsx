'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';
import MotionScrollReveal from './animations/MotionScrollReveal';

// Project data
const projects = [
  {
    id: 1,
    title: 'Apartment Internet Revenue Setup',
    description: 'Building-wide internet service for residents with managed access, support, and owner revenue reporting.',
    category: 'Residential',
    image: '/project1.jpg',
  },
  {
    id: 2,
    title: 'Office Tenant Connectivity',
    description: 'Reliable internet packages for office tenants, with provisioning handled by Settlenet.',
    category: 'Commercial',
    image: '/project2.jpg',
  },
  {
    id: 3,
    title: 'Short-Stay Guest Internet',
    description: 'Simple guest access for furnished apartments and short-stay units, managed from setup to support.',
    category: 'Residential',
    image: '/project3.jpg',
  },
  {
    id: 4,
    title: 'Mixed-Use Property Network',
    description: 'Separate packages for residents, shops, and offices on one managed property network.',
    category: 'Commercial',
    image: '/project4.jpg',
  },
  {
    id: 5,
    title: 'Residential Estate Internet',
    description: 'Managed Wi-Fi and tenant subscriptions for multi-unit residential communities.',
    category: 'Residential',
    image: '/project5.jpg',
  },
  {
    id: 6,
    title: 'Managed Business Connectivity',
    description: 'Provisioned internet access for high-demand buildings that need reliable managed service.',
    category: 'Healthcare',
    image: '/project6.jpg',
  },
  {
    id: 7,
    title: 'Hospitality Guest Access',
    description: 'Guest internet packages for hotels, conference venues, and serviced apartments.',
    category: 'Hospitality',
    image: '/project7.jpg',
  },
];

// Filter categories
const categories = ['All', 'Residential', 'Commercial', 'Healthcare', 'Hospitality'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <MotionSection id="projects" className="section-padding bg-[var(--background)]">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.span 
            className="eyebrow"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Example Properties
          </motion.span>
          
          <MotionText as="h2" className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Where property internet can earn
          </MotionText>
          
          <MotionText 
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600"
            delay={0.2}
          >
            Settlenet can support different property types where tenants, businesses, or guests need reliable internet access.
          </MotionText>
        </div>
        
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                activeCategory === category
                  ? 'bg-[var(--primary-dark)] text-white shadow-lg shadow-cyan-950/10'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <MotionScrollReveal 
              key={project.id} 
              direction="up" 
              delay={0.1 * index}
              className="h-full"
            >
              <motion.div 
                layout
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>
                  <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase tracking-wide text-[var(--primary-dark)] backdrop-blur">
                    {project.category}
                  </div>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="text-xl font-black text-slate-950">{project.title}</h3>
                  <p className="mt-3 flex-grow leading-7 text-slate-600">{project.description}</p>
                  <motion.button 
                    className="mt-6 inline-flex w-fit items-center gap-2 font-bold text-[var(--primary)] hover:text-[var(--secondary)]"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </MotionScrollReveal>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary-dark)] px-6 py-3 text-base font-bold text-white shadow-lg shadow-cyan-950/10 transition-colors hover:bg-[var(--primary)]"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Discuss Your Property
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </MotionSection>
  );
}
