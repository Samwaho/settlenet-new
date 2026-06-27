'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo3.png';
import { motion } from 'framer-motion';

const footerGroups = [
  {
    title: 'Services',
    links: ['Network Management', 'WebYield', 'Tenant Experience', 'Infrastructure Audit'],
    href: '#services',
  },
  {
    title: 'Company',
    links: ['About Us', 'Projects', 'Contact'],
    href: '#about',
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    href: '#',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="section-shell py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-block rounded-lg bg-white p-2 focus:outline-none focus:ring-2 focus:ring-white">
              <Image
                src={Logo}
                alt="Settlenet"
                className="h-10 w-auto object-contain"
                width={150}
                height={80}
              />
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Connecting communities through managed property networks, tenant support, and WebYield revenue programs.
            </p>
            <div className="mt-5 flex gap-4">
              {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{social}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs font-black uppercase">
                    {social.slice(0, 1)}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (groupIndex + 1) }}
            >
              <h3 className="mb-4 text-lg font-black">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href={group.href} className="text-slate-400 transition-colors hover:text-[var(--secondary)]">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {currentYear} Settlenet. All rights reserved.</p>
          <p className="mt-2">Designed and built for property owners everywhere.</p>
        </motion.div>
      </div>
    </footer>
  );
}
