import { Scissors, Palette, Sparkles, Wind, Crown, Fingerprint, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      className="relative py-16 md:py-20 px-4 overflow-hidden mt-0 mb-0 pt-16 pb-16 shadow-none ring-0"
      id="services"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0A0A0A 50%, #000000 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4 font-heading uppercase tracking-wide"
            style={{
              background: 'linear-gradient(90deg, #f6e27a, #d4af37, #b89535)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hizmetlerimiz
          </h2>

          <div className="h-1 w-24 mx-auto mb-12 md:mb-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {isMobile ? (
          <div className="relative flex items-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-[#D4AF37]" size={20} strokeWidth={2.5} />
            </button>

            <div className="overflow-hidden mx-12">
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
                      className={`rounded-3xl p-8 text-center transition-all duration-700 relative overflow-hidden ${
                        currentSlide === index
                          ? 'scale-100 opacity-100'
                          : 'scale-90 opacity-40'
                      }`}
                      style={{
                        background: 'rgba(10, 10, 10, 0.6)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2), inset 0 0 40px rgba(212, 175, 55, 0.05)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.2), transparent 70%)',
                          }}
                        />
                      </div>

                      <div className="relative z-10">
                        <div
                          className="flex justify-center mb-6 p-4 rounded-full mx-auto w-fit"
                          style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
                          }}
                        >
                          <service.icon className="text-[#D4AF37]" size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-[#D4AF37] font-heading uppercase tracking-wide">
                          {service.title}
                        </h3>
                        <ul className="text-gray-300 font-light leading-relaxed text-sm space-y-1.5 text-left">
                          {service.items.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#D4AF37] mr-2">•</span>
                              <span>{item}</span>
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              aria-label="Next slide"
            >
              <ChevronRight className="text-[#D4AF37]" size={20} strokeWidth={2.5} />
            </button>

            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-8 bg-[#D4AF37]' : 'w-1.5 bg-[#D4AF37]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-3xl p-10 text-center transition-all duration-700 hover:-translate-y-2 relative overflow-hidden group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  background: 'rgba(10, 10, 10, 0.6)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2), inset 0 0 40px rgba(212, 175, 55, 0.05)',
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.3), transparent 70%)',
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div
                    className="flex justify-center mb-6 p-4 rounded-full mx-auto w-fit transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(212, 175, 55, 0.1)',
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    <service.icon className="text-[#D4AF37]" size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-5 text-[#D4AF37] font-heading uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <ul className="text-gray-300 font-light leading-relaxed space-y-2 text-left">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#D4AF37] mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
                    animation: 'borderFlow 3s linear infinite',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
