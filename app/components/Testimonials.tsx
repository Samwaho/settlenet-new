export default function Testimonials() {
  const testimonials = [
    {
      quote: "Settlenet transformed our property's network infrastructure. The WebYield model has created a new revenue stream we hadn't considered before.",
      author: "Sarah Johnson",
      role: "Property Manager, Skyline Apartments",
      image: "/testimonial-1.jpg"
    },
    {
      quote: "The team at Settlenet provided exceptional service from initial consultation through implementation. Our tenants are thrilled with the network performance.",
      author: "Michael Chen",
      role: "Real Estate Developer, Urban Living",
      image: "/testimonial-2.jpg"
    },
    {
      quote: "We've seen a 30% increase in property value after implementing Settlenet's smart network solutions. The ROI has been remarkable.",
      author: "David Rodriguez",
      role: "Investment Director, Horizon Properties",
      image: "/testimonial-3.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-[var(--secondary-light)] text-[var(--secondary)] rounded-full text-sm font-medium mb-3">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">What Our Clients Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from property owners who have transformed their network infrastructure with Settlenet
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow-md animate-fade-in hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  {/* Placeholder for testimonial image */}
                  <div className="w-full h-full bg-[var(--primary-dark)] flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}