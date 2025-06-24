import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/network-pattern.svg')] opacity-10"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Smart Network Management for Properties
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-lg">
              Maximize your property investment with our WebYield model. Turn bandwidth into a new revenue stream.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-[var(--primary)] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn More
              </button>
              <button className="bg-[var(--secondary)] hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Contact Us
              </button>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-200 flex justify-center">
            <div className="relative w-full max-w-md h-80 bg-white/10 rounded-lg backdrop-blur-sm p-6 shadow-xl transform hover:scale-105 transition-transform">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--secondary)] flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">WebYield Technology</p>
                  <p className="text-sm text-white/80 mt-2">Patented network optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}