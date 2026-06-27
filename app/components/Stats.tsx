'use client';

import { motion } from 'framer-motion';

const packages = ['Resident', 'Guest', 'Office'];
const operations = ['Provision users', 'Monitor uptime', 'Handle support'];

function RevenueFlow() {
  return (
    <div className="relative mt-6 min-h-[430px] overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#f8fbff,#eef8ff)] p-5 sm:h-64 sm:min-h-0">
      <div className="network-grid absolute inset-0 opacity-60" />
      <svg className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 720 260" fill="none" aria-hidden="true">
        <path d="M110 132 C 230 34, 318 34, 430 132 S 590 230, 640 130" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <path className="beam-path" d="M110 132 C 230 34, 318 34, 430 132 S 590 230, 640 130" stroke="url(#flowGradient)" strokeWidth="5" strokeLinecap="round" />
        <defs>
          <linearGradient id="flowGradient" x1="80" y1="20" x2="650" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2584c3" />
            <stop offset="0.52" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#f47a1f" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 grid h-full grid-cols-1 items-center gap-4 sm:grid-cols-3">
        {[
          { title: 'Property', body: 'Existing tenants and guests' },
          { title: 'Settlenet', body: 'Provisioning, access, support' },
          { title: 'Revenue', body: 'Monthly internet income' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="soft-float rounded-lg border border-white/80 bg-white/85 p-4 shadow-xl shadow-slate-900/10 backdrop-blur"
            style={{ animationDelay: `${index * 0.35}s` }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--secondary)]">0{index + 1}</p>
            <h3 className="mt-2 text-xl font-black text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[var(--background)] py-14 text-[var(--foreground)]">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Revenue Flow</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">A simple model for property internet sales.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Property owners get a clear service model: simple internet packages for users, managed operations by Settlenet, and recurring income for the property.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-6">
          <motion.article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 lg:col-span-4 lg:row-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--primary)]">How value moves</p>
            <h3 className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">Tenants buy internet. Settlenet runs it. Owners earn.</h3>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Settlenet sets up packages for the property, provisions each user, keeps service stable, and gives owners a managed path to recurring internet income.
            </p>
            <RevenueFlow />
          </motion.article>

          <motion.article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--secondary)]">Packages</p>
            <h3 className="mt-3 text-2xl font-black text-slate-950">Sell plans people understand.</h3>
            <div className="mt-5 space-y-3">
              {packages.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="font-bold text-slate-800">{item}</span>
                  <span className="h-2 w-12 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--secondary))]" />
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="rounded-lg border border-slate-200 bg-[var(--primary-dark)] p-5 text-white shadow-xl shadow-slate-900/10 lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Done for you</p>
            <h3 className="mt-3 text-2xl font-black">Settlenet handles daily operations.</h3>
            <div className="mt-5 space-y-3">
              {operations.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.08] px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-black">{index + 1}</span>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
