import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      id="gallery"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      <div className="floating-orb" style={{ width: '600px', height: '600px', top: '5%', right: '-15%', animationDelay: '5s' }} />
      <div className="floating-orb" style={{ width: '450px', height: '450px', bottom: '10%', left: '-10%', animationDelay: '15s' }} />

      <div className="container mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="aurora-text text-5xl md:text-7xl font-black text-center mb-6 uppercase tracking-tight">
            Galeri
          </h2>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Eserlerimize göz atın ve mükemmel sonuçları görün
          </p>
        </div>

        <div className="masonry-grid">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="masonry-item group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  src={image.src}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="absolute inset-0 ring-2 ring-inset ring-[#D4AF37]/50 rounded-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
