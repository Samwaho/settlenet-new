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
    title: 'Skyline Towers Network Upgrade',
    description: 'Complete network infrastructure overhaul for a 45-story luxury residential building.',
    category: 'Residential',
    image: '/project1.jpg',
  },
  {
    id: 2,
    title: 'Tech Park Connectivity Solution',
    description: 'High-speed fiber network implementation for a multi-building technology campus.',
    category: 'Commercial',
    image: '/project2.jpg',
  },
  {
    id: 3,
    title: 'Harbor View Apartments',
    description: 'WebYield revenue model implementation for 250-unit waterfront property.',
    category: 'Residential',
    image: '/project3.jpg',
  },
  {
    id: 4,
    title: 'Metropolitan Office Complex',
    description: 'Enterprise-grade network design and installation for downtown office hub.',
    category: 'Commercial',
    image: '/project4.jpg',
  },
  {
    id: 5,
    title: 'Sunset Heights Community',
    description: 'Community-wide mesh network deployment for suburban housing development.',
    category: 'Residential',
    image: '/project5.jpg',
  },
  {
    id: 6,
    title: 'Riverside Medical Center',
    description: 'Secure, high-reliability network infrastructure for healthcare facility.',
    category: 'Healthcare',
    image: '/project6.jpg',
  },
  {
    id: 7,
    title: 'Grand Hotel & Conference Center',
    description: 'Comprehensive hospitality network solution with guest and event services.',
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
    <MotionSection id="projects" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block px-3 py-1 bg-[var(--secondary-light)] text-[var(--secondary)] rounded-full text-sm font-medium mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Our Projects
          </motion.span>
          
          <MotionText 
            as="h2" 
            className="text-3xl md:text-4xl font-bold text-[var(--primary)]"
          >
            Featured Work
          </MotionText>
          
          <MotionText 
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
            delay={0.2}
          >
            Explore our portfolio of successful network infrastructure projects
          </MotionText>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <MotionScrollReveal 
              key={project.id} 
              direction="up" 
              delay={0.1 * index}
              className="h-full"
            >
              <motion.div 
                className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <div className="px-6 pb-6">
                  <motion.button 
                    className="text-[var(--primary)] font-medium flex items-center hover:underline"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </MotionScrollReveal>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <motion.button
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </MotionSection>
  );
}