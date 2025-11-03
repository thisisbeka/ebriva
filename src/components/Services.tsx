import { Scissors, Palette, Sparkles, Wind, Crown, Fingerprint, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: Scissors,
      title: 'Saç Kesimi & Şekillendirme',
      items: ['Düz Kesim', 'Katlı Kesim', 'Bop Kesim'],
    },
    {
      icon: Palette,
      title: 'Saç Boyama & Renklendirme',
      items: ['Ombré, Sombre, Röfle', 'Dip Boya', 'Düz Boya'],
    },
    {
      icon: Wind,
      title: 'Fön & Bakım',
      items: ['Düz Fön', 'Kırık Fön', 'Dalgalı Fön', 'Brezilya Fönü', 'Keratin Bakım'],
    },
    {
      icon: Crown,
      title: 'Özel Gün & Gelin Başı',
      items: ['Gelin Başı', 'Nişan Başı', 'Söz Başı', 'Kına Başı', 'Topuz Tasarımı', 'Türban Tasarımı'],
    },
    {
      icon: Sparkles,
      title: 'Makyaj & Güzellik',
      items: ['Profesyonel Make Up', 'Microblading', 'Altın Oran Kaş Alımı', 'Lifting'],
    },
    {
      icon: Fingerprint,
      title: 'Tırnak & Kişisel Bakım',
      items: ['Protez Tırnak', 'Manikür & Pedikür', 'Tesettür Bölümümüz Mevcuttur'],
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) observer.observe(section);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      id="services"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      <div className="floating-orb" style={{ width: '500px', height: '500px', top: '10%', left: '-10%', animationDelay: '0s' }} />
      <div className="floating-orb" style={{ width: '400px', height: '400px', bottom: '20%', right: '-5%', animationDelay: '10s' }} />

      <div className="container mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="aurora-text text-5xl md:text-7xl font-black text-center mb-6 uppercase tracking-tight">
            Hizmetlerimiz
          </h2>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Premium güzellik hizmetleri ile mükemmel görünümünüz için buradayız
          </p>
        </div>

        {isMobile ? (
          <div className="relative flex items-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-[#D4AF37]" size={24} strokeWidth={2.5} />
            </button>

            <div className="overflow-hidden mx-16">
              <div
                className="flex transition-all duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div
                      className={`premium-card rounded-3xl p-10 text-center transition-all duration-700 ${
                        currentSlide === index
                          ? 'scale-100 opacity-100'
                          : 'scale-90 opacity-40'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-center mb-8 p-5 rounded-2xl mx-auto w-fit bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5">
                          <service.icon className="text-[#D4AF37]" size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-[#D4AF37] font-['Outfit'] uppercase tracking-wide">
                          {service.title}
                        </h3>
                        <ul className="text-gray-300 font-light leading-relaxed space-y-2.5 text-left">
                          {service.items.map((item, idx) => (
                            <li key={idx} className="flex items-start group">
                              <span className="text-[#D4AF37] mr-3 mt-1 text-lg">→</span>
                              <span className="group-hover:text-white transition-colors">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
              aria-label="Next slide"
            >
              <ChevronRight className="text-[#D4AF37]" size={24} strokeWidth={2.5} />
            </button>

            <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-12 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="premium-card rounded-3xl p-10 text-center group cursor-pointer"
              >
                <div className="relative z-10">
                  <div className="flex justify-center mb-8 p-6 rounded-2xl mx-auto w-fit bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="text-[#D4AF37] group-hover:rotate-12 transition-transform duration-500" size={56} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-[#D4AF37] font-['Outfit'] uppercase tracking-wide group-hover:text-[#F5D47A] transition-colors">
                    {service.title}
                  </h3>
                  <ul className="text-gray-300 font-light leading-relaxed space-y-3 text-left">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <span className="text-[#D4AF37] mr-3 mt-1 text-lg group-hover/item:translate-x-1 transition-transform">→</span>
                        <span className="group-hover/item:text-white group-hover/item:translate-x-1 transition-all">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
