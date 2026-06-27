'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionSection from './animations/MotionSection';
import MotionText from './animations/MotionText';
import MotionScrollReveal from './animations/MotionScrollReveal';

const services = [
  {
    eyebrow: '01',
    title: 'We check your property',
    description:
      'Settlenet reviews your building, tenant numbers, existing internet setup, coverage gaps, and the best way to sell internet on-site.',
  },
  {
    eyebrow: '02',
    title: 'We install the network',
    description:
      'Our team handles the routers, Wi-Fi, cabling, access points, and any upgrades needed to deliver reliable service across the property.',
  },
  {
    eyebrow: '03',
    title: 'We connect and provision users',
    description:
      'Tenants and guests get simple internet packages. Settlenet provisions access, manages accounts, and keeps the connection controlled.',
  },
  {
    eyebrow: '04',
    title: 'We manage it for you',
    description:
      'We monitor the network, handle support, keep users connected, and help the property owner earn recurring income from internet sales.',
  },
];

export default function Services() {
  return (
    <MotionSection id="services" className="dark-band section-padding text-white">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <MotionScrollReveal direction="left" className="lg:sticky lg:top-28">
            <p className="section-kicker">How It Works</p>
            <MotionText as="h2" className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Settlenet turns your building internet into monthly income.
            </MotionText>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200/76">
              You own the property. We handle the technical work: installation, provisioning, user access, monitoring, and support.
            </p>

            <div className="relative mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl shadow-black/25">
              <Image
                src="/generated/settlenet-service-infrastructure.png"
                alt="Structured internet infrastructure managed by Settlenet"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(6,16,26,0.92)] to-transparent p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Installed and managed for you</p>
              </div>
            </div>
          </MotionScrollReveal>

          <div className="space-y-4">
            {services.map((service, index) => (
              <MotionScrollReveal key={service.title} direction="up" delay={index * 0.08}>
                <motion.article
                  className="group grid gap-5 rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/10 backdrop-blur md:grid-cols-[88px_1fr]"
                  whileHover={{ y: -4, borderColor: 'rgba(34, 211, 238, 0.45)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--secondary)] text-xl font-black text-white">
                    {service.eyebrow}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black md:text-3xl">{service.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-200/74">{service.description}</p>
                  </div>
                </motion.article>
              </MotionScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
