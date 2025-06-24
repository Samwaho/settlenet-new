export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in order-2 md:order-1">
            <span className="inline-block px-3 py-1 bg-[var(--secondary-light)] text-[var(--secondary)] rounded-full text-sm font-medium mb-3">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6">About Settlenet</h2>
            <p className="text-gray-600 mb-4 text-lg">
              Settlenet offers network management and infrastructure solutions to properties. Our smart network management system is designed to help property owners and managers maximize their investment.
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              Through our proprietary model, WebYield, property owners can earn not only from renting out space but also from bandwidth subscriptions.
            </p>
            <p className="text-gray-600 text-lg">
              We build smart networks for the future — and make every square meter work harder for you.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-200 order-1 md:order-2">
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-1 rounded-lg shadow-xl">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  Settlenet is continuously expanding its vision and broadening its portfolio by introducing new services that elevate our clients' digital infrastructure.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--secondary-light)] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Innovative Solutions</h4>
                      <p className="text-sm text-gray-500">Cutting-edge technology for modern properties</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--secondary-light)] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Client-Focused</h4>
                      <p className="text-sm text-gray-500">Tailored solutions for your specific needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}