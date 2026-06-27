'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo3.png';
import { AnimatePresence, motion } from 'framer-motion';

const navigation = [
  { label: 'How it works', href: '#services' },
  { label: 'WebYield', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-lg shadow-slate-900/10' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link href="/" className="flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
              <Image src={Logo} alt="Settlenet" className="h-11 w-auto object-contain" width={170} height={82} priority />
            </Link>
          </motion.div>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 * index }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-bold text-slate-700 transition-colors hover:text-[var(--primary)]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="hidden items-center md:flex"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--secondary)] px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-950/12 transition-colors hover:bg-[var(--secondary-dark)]"
            >
              Start earning
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </motion.div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none md:hidden"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t border-slate-200 bg-white shadow-lg md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-2 px-4 py-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 * index }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-[var(--primary)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="#contact"
                className="block rounded-lg bg-[var(--secondary)] px-3 py-3 text-base font-black text-white hover:bg-[var(--secondary-dark)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Start earning
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
