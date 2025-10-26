import { Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      className="relative py-16 md:py-20 px-4 overflow-hidden"
      id="contact"
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

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

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
            İletişim
          </h2>

          <div className="h-1 w-24 mx-auto mb-12 md:mb-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden group"
            style={{
              background: 'rgba(10, 10, 10, 0.6)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.25), inset 0 0 60px rgba(212, 175, 55, 0.08)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15), transparent 70%)',
              }}
            />

            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"
              style={{
                animation: 'borderFlow 4s ease-in-out infinite',
              }}
            />

            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"
              style={{
                animation: 'borderFlow 4s ease-in-out infinite',
                animationDelay: '2s',
              }}
            />

            <div
              className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-50"
              style={{
                animation: 'borderFlowVertical 4s ease-in-out infinite',
                animationDelay: '1s',
              }}
            />

            <div
              className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-50"
              style={{
                animation: 'borderFlowVertical 4s ease-in-out infinite',
                animationDelay: '3s',
              }}
            />

            <div className="relative z-10 flex flex-col space-y-6">
              <div className="flex justify-center space-x-6 mb-4">
                <a
                  className="rounded-full p-4 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                  }}
                  href="https://wa.me/905316498371"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="WhatsApp Icon"
                    className="h-10 w-10 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfh15UMJJHScAs9LMlsiHLTl_KXIeX19gaf858u0P3R9ePiasF7JuH5P356cdoAn0zpAkn2LWX0uG3tmrPOk-dk5IECNJjptHUXQMyXbvDVdGQZcxkxMrZ_dGqA_9eZY75DR9A25CeJhKekvWjxChYJgGtdGVcMoxB95phNd36tkpvxOYO5HoYgJN8oCisHYa4fmyAL4mJ3G66Fb8Kc4I8vkCJWlUjmU-M6L8XZ8wEhpa7e6b-oPXC1_lpDtQ825awKRVqBYAmrzfB"
                  />
                </a>
                <a
                  className="rounded-full p-4 transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                  }}
                  href="https://www.instagram.com/ebriva_hairdesign/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Instagram Icon"
                    className="h-10 w-10 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBAnfNIX9CqDK20N2Z-AsmNn2PieQl7dEoTVXJgXu3iKekkWsuEekg62_Lnc9j_X8941LZ-VwG4EIJVX4WuWOcEz9lcx3cpg63j3T2ufdkeC4XSkS96Keefihh5ST9cupSgiiwDcMe3PpyT2sr76_sgM3j-33kpXjyM5F-SMIafBhmLgZ7Gq3cSVfJBSq273p7nLWcFtPMyn_dLBj3z2GGpUug140F3_wKyA0BwYfXeOjbN4EpQ1WvPo4m9kxjQozuiSLOQ2GRIKB7"
                  />
                </a>
              </div>

              <a
                className="flex items-center justify-center space-x-3 contact-link-group"
                href="tel:+905316498371"
              >
                <Phone className="text-[#D4AF37] transition-transform contact-link-group-hover:scale-110" size={20} />
                <span
                  className="contact-link-group-hover:underline font-light"
                  style={{
                    color: '#E0E0E0',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  +90 531 649 83 71
                </span>
              </a>

              <a
                className="flex items-center justify-center space-x-3 contact-link-group text-center"
                href="https://maps.app.goo.gl/NbbVLMh8ARDZ5xcO3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="text-[#D4AF37] transition-transform contact-link-group-hover:scale-110 flex-shrink-0" size={20} />
                <span
                  className="contact-link-group-hover:underline font-light"
                  style={{
                    color: '#E0E0E0',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Altınşehir, Kumru Caddesi, 28/A, Ümraniye, İstanbul
                </span>
              </a>

              <div className="text-center mt-4 pt-6 border-t border-[#D4AF37]/20">
                <p className="font-semibold text-[#D4AF37] mb-3 font-heading uppercase tracking-wide text-sm">
                  Çalışma Saatleri
                </p>
                <p
                  className="font-light text-sm"
                  style={{
                    color: '#E0E0E0',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Pazartesi - Cumartesi: 09:00 - 20:00
                </p>
                <p
                  className="font-light text-sm"
                  style={{
                    color: '#E0E0E0',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Pazar: 09:00 - 18:00
                </p>
              </div>
            </div>

            <div className="absolute inset-0 rounded-3xl pointer-events-none">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
}
