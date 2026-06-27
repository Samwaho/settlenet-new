'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';
import MotionScrollReveal from './animations/MotionScrollReveal';

export default function CTA() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          propertyType: formData.get('propertyType'),
          message: formData.get('message'),
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? 'Your message could not be sent. Please try again.');
      }

      form.reset();
      setStatus('success');
      setStatusMessage('Thanks. Your property details have been sent.');
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.');
    }
  }

  return (
    <MotionSection className="dark-band relative overflow-hidden py-20 text-white">
      <div className="absolute inset-0 network-grid opacity-20"></div>
      <div className="section-shell relative">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <MotionText 
              as="h2" 
              className="text-4xl font-black tracking-tight md:text-6xl"
            >
              Want to sell internet in your property?
            </MotionText>
            
            <MotionText 
              className="mt-5 text-lg leading-8 text-cyan-50/80"
              delay={0.2}
            >
              Tell us about your building. Settlenet will estimate the opportunity, recommend the setup, and explain how provisioning and management would work.
            </MotionText>
            
            <MotionScrollReveal 
              direction="up" 
              delay={0.4}
            >
              <motion.button 
                className="aceternity-border mt-8 rounded-lg p-[1px] font-bold text-[var(--primary-dark)] shadow-lg shadow-black/15"
                whileHover={{ y: -3, boxShadow: "0 18px 35px -16px rgba(0, 0, 0, 0.55)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <span className="block rounded-lg bg-white px-6 py-3 hover:bg-cyan-50">
                  Request a Revenue Estimate
                </span>
              </motion.button>
            </MotionScrollReveal>
          </div>
          
          <MotionScrollReveal 
            direction="right" 
            delay={0.2}
            className="relative"
          >
            <div className="rounded-lg border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/25 backdrop-blur-md md:p-8">
              <h3 className="text-2xl font-black">Check Your Property</h3>
              <p className="mt-2 text-sm leading-6 text-cyan-50/70">Share a few details and we will recommend the best way to start selling internet.</p>
              
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-1">Name</label>
                  <motion.input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-white/25 bg-white/15 px-4 py-3 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-1">Email</label>
                  <motion.input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-white/25 bg-white/15 px-4 py-3 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <div>
                  <label htmlFor="property" className="block text-sm font-bold mb-1">Property Type</label>
                  <motion.select 
                    id="property" 
                    name="propertyType"
                    required
                    className="w-full rounded-lg border border-white/25 bg-white/15 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
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

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-1">Message</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/25 bg-white/15 px-4 py-3 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Number of tenants, location, or current setup"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {statusMessage && (
                  <p
                    className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                      status === 'success'
                        ? 'bg-emerald-500/15 text-emerald-50'
                        : 'bg-red-500/15 text-red-50'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {statusMessage}
                  </p>
                )}
                
                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="mt-6 w-full rounded-lg bg-[var(--secondary)] px-6 py-3 font-bold text-white shadow-lg shadow-orange-950/20 hover:bg-[var(--secondary-dark)] disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ y: -2, boxShadow: "0 18px 35px -16px rgba(0, 0, 0, 0.55)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Property Details'}
                </motion.button>
              </form>
            </div>
          </MotionScrollReveal>
        </div>
      </div>
    </MotionSection>
  );
}

