export default function Stats() {
  const stats = [
    { value: "200+", label: "Properties Served" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "30%", label: "Average Revenue Increase" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <section className="py-12 bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}