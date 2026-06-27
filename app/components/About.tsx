'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';
import MotionScrollReveal from './animations/MotionScrollReveal';

const benefits = [
  'Internet packages for tenants and guests',
  'User provisioning and access control',
  'Network monitoring and support',
  'Clear revenue reporting for owners',
];

const modelSteps = [
  {
    title: 'Owner gets a new income stream',
    body: 'Your property can earn from internet subscriptions, short-stay access, office plans, or guest packages.',
  },
  {
    title: 'Settlenet handles the work',
    body: 'We provide the technical setup, provision users, manage the network, and support customers day to day.',
  },
  {
    title: 'Tenants get reliable internet',
    body: 'Residents, businesses, and guests get simple internet access without the property team becoming an ISP.',
  },
];

export default function About() {
  return (
    <MotionSection id="about" className="bg-white py-10 md:py-12 lg:py-14">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <MotionScrollReveal direction="left" className="h-[360px] sm:h-[430px] lg:h-full lg:pt-1">
            <div className="relative h-full overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-xl shadow-slate-900/10">
              <Image
                src="/generated/settlenet-webyield-property.png"
                alt="Property earning revenue from managed internet service"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200">WebYield</p>
                <p className="mt-2 max-w-md text-2xl font-black">Internet sales managed for property owners.</p>
              </div>
            </div>
          </MotionScrollReveal>

          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              WebYield Model
            </motion.span>

            <MotionText as="h2" className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              You provide the property. We run the internet service.
            </MotionText>

            <MotionText className="mt-5 text-lg leading-8 text-slate-600" delay={0.2}>
              WebYield is Settlenet&apos;s managed model for helping property owners sell internet inside their buildings without hiring a technical team or managing customers themselves.
            </MotionText>

            <MotionScrollReveal direction="up" delay={0.2}>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                    {benefit}
                  </div>
                ))}
              </div>
            </MotionScrollReveal>

            <div className="mt-6 space-y-3">
              {modelSteps.map((step, index) => (
                <MotionScrollReveal key={step.title} direction="up" delay={0.08 * index}>
                  <motion.div
                    className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[48px_1fr]"
                    whileHover={{ y: -3, borderColor: 'var(--primary)' }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--primary-dark)] text-sm font-black text-white">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-950">{step.title}</h3>
                      <p className="mt-1 leading-7 text-slate-600">{step.body}</p>
                    </div>
                  </motion.div>
                </MotionScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
