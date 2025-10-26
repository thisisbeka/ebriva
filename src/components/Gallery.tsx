import { useState, useEffect } from 'react';

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    '/gallery/PHOTO-2025-08-15-00-40-37.jpg',
    '/gallery/PHOTO-2025-08-23-19-54-09.jpg',
    '/gallery/PHOTO-2025-08-24-01-03-54.jpg',
    '/gallery/PHOTO-2025-08-24-01-03-58.jpg',
    '/gallery/PHOTO-2025-08-24-01-07-42.jpg',
    '/gallery/PHOTO-2025-10-09-00-08-56.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-09.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-11%202.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-11%203.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-11.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-13.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-15%202.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-15%203.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-15.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-16%202.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-16.jpg',
    '/gallery/PHOTO-2025-10-11-22-06-17.jpg',
  ];

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
            Galeri
          </h2>

          <div className="h-1 w-24 mx-auto mb-12 md:mb-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        <div className="masonry-grid">
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`masonry-item group relative overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${idx * 50}ms`,
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
              }}
            >
              <img
                alt={'Gallery image ' + (idx + 1)}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                src={image}
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(10, 10, 10, 0.6) 100%)',
                }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#D4AF37]/0 group-hover:ring-[#D4AF37]/50 transition-all duration-300 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
}
