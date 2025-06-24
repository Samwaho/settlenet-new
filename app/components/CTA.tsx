export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your property's network?</h2>
            <p className="text-xl text-white/90">
              Schedule a free consultation with our experts and discover how Settlenet can help you maximize your property's potential.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-[var(--primary)] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More
            </button>
            <button className="bg-[var(--secondary)] hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}