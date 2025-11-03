import { useState, useEffect } from 'react';

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    { src: '/gallery/PHOTO-2025-08-15-00-40-37.jpg', alt: 'EBRIVA gelin saçı İstanbul' },
    { src: '/gallery/PHOTO-2025-08-23-19-54-09.jpg', alt: 'EBRIVA profesyonel makyaj İstanbul' },
    { src: '/gallery/PHOTO-2025-08-24-01-03-54.jpg', alt: 'EBRIVA tırnak tasarımı nail art' },
    { src: '/gallery/PHOTO-2025-08-24-01-03-58.jpg', alt: 'EBRIVA güzellik salonu hizmetleri' },
    { src: '/gallery/PHOTO-2025-08-24-01-07-42.jpg', alt: 'EBRIVA kuaför saç kesimi' },
    { src: '/gallery/PHOTO-2025-10-09-00-08-56.jpg', alt: 'EBRIVA premium manikür pedikür' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-09.jpg', alt: 'EBRIVA gelin başı İstanbul' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-11%202.jpg', alt: 'EBRIVA saç boyama renklendirme' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-11%203.jpg', alt: 'EBRIVA ombre sombre röfle' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-11.jpg', alt: 'EBRIVA keratin bakım İstanbul' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-13.jpg', alt: 'EBRIVA topuz tasarımı' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-15%202.jpg', alt: 'EBRIVA türban tasarımı tesettür bölümü' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-15%203.jpg', alt: 'EBRIVA nişan başı söz başı' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-15.jpg', alt: 'EBRIVA microblading kaş alımı' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-16%202.jpg', alt: 'EBRIVA protez tırnak uygulaması' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-16.jpg', alt: 'EBRIVA brezilya fönü düz fön' },
    { src: '/gallery/PHOTO-2025-10-11-22-06-17.jpg', alt: 'EBRIVA lüks güzellik salonu İstanbul' },
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
                boxShadow: '0 6px 24px rgba(212, 175, 55, 0.12)',
              }}
            >
              <img
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                src={image.src}
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
    </section>
  );
}
