import { useState, useEffect } from 'react';
import { ImageGallery } from './ui/carousel-circular-image-gallery';

export default function Gallery() {
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

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      className="relative py-16 md:py-20 px-4 overflow-hidden"
      id="gallery"
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
            Galeri
          </h2>

          <div className="h-1 w-24 mx-auto mb-12 md:mb-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <ImageGallery />
        </div>
      </div>
    </section>
  );
}
