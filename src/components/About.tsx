import { useState, useEffect } from 'react';

export default function About() {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      className="relative py-16 md:py-20 px-4 overflow-hidden"
      id="about"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0A0A0A 50%, #000000 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
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
            Hakkımızda
          </h2>

          <div className="h-1 w-24 mx-auto mb-12 md:mb-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden group"
            style={{
              background: 'rgba(10, 10, 10, 0.6)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 6px 24px rgba(212, 175, 55, 0.18), inset 0 0 40px rgba(212, 175, 55, 0.06)',
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

            <div className="relative z-10">
              <p
                className="text-base md:text-lg leading-relaxed text-center font-light"
                style={{
                  color: '#E0E0E0',
                  lineHeight: '1.8',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                EBRIVA Hair Design'da güzellik bir{' '}
                <span className="text-[#D4AF37] font-medium">sanat formu</span> olarak görülür.
                Salonumuz, yetenekli stilistlerimizin sizin için mükemmel görünümü yaratmaya
                adandıkları bir{' '}
                <span className="text-[#D4AF37] font-medium">lüks ve profesyonellik</span> sığınağıdır.
                En son teknikleri zamansiz zarafetle birleştirerek, her müşterimizin kendinden emin
                ve ışıl ışıl hissederek ayrılmasını sağlarız.
              </p>

              <div className="mt-8 pt-6 border-t border-[#D4AF37]/20">
                <p
                  className="text-center text-lg md:text-xl font-semibold"
                  style={{
                    background: 'linear-gradient(90deg, #f6e27a, #d4af37, #b89535)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Güzelliğiniz Bizim İşimiz
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
    </section>
  );
}
