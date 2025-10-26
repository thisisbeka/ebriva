import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AuroraText } from './ui/AuroraText';
import TypewriterText from './ui/TypewriterText';
import AuroraLayer from './ui/AuroraLayer';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotatingCards, setRotatingCards] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  const images = useMemo(() => [
    { id: '1', src: '/fn1.jpeg', alt: 'Salon Work 1', rotation: -15 },
    { id: '2', src: '/fn2.jpeg', alt: 'Salon Work 2', rotation: -8 },
    { id: '3', src: '/fn3.jpeg', alt: 'Salon Work 3', rotation: 5 },
    { id: '4', src: '/fn4.jpeg', alt: 'Salon Work 4', rotation: 12 },
    { id: '5', src: '/fn5.jpeg', alt: 'Salon Work 5', rotation: -12 },
    { id: '6', src: '/fn6.jpg', alt: 'Salon Work 6', rotation: 8 },
    { id: '7', src: '/fn7.jpeg', alt: 'Salon Work 7', rotation: -5 },
    { id: '8', src: '/fn8.jpg', alt: 'Salon Work 8', rotation: 10 },
  ], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    setTimeout(() => setIsVisible(true), 100);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const preloadImages = images.map(img => {
      const image = new Image();
      image.src = img.src;
      return image;
    });

    Promise.all(
      preloadImages.map(img =>
        new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        })
      )
    ).then(() => setImagesLoaded(true));
  }, [images]);

  useEffect(() => {
    setRotatingCards(images.map((_, i) => i * (360 / images.length)));
  }, [images]);

  useEffect(() => {
    const node = document.querySelector('.hero-section');
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      setHeroVisible(entries[0].isIntersecting);
    }, { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || prefersReducedMotion || !heroVisible) return;

    const fps = isMobile ? 30 : 60;
    const rotationSpeed = isMobile ? 0.5 : 0.3;
    const interval = setInterval(() => {
      setRotatingCards((prev) => prev.map((angle) => (angle + rotationSpeed) % 360));
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [isMobile, imagesLoaded, prefersReducedMotion, heroVisible]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, [isMobile]);

  return (
    <section className="hero-section relative overflow-clip pt-20 md:pt-24 pb-6 lg:pb-8 flex flex-col" style={{ minHeight: 'min(820px, calc(100svh - 88px))' }}>
      <AuroraLayer />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0" />

      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 212, 122, 0.1) 0%, transparent 50%)',
            animation: prefersReducedMotion ? 'none' : 'shimmer 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="container mx-auto px-4 grid grid-rows-[auto_auto_auto] gap-4 lg:gap-6 h-full relative z-10">
        <div
          className={`relative mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{
            width: 'clamp(320px, 85vw, 560px)',
            height: 'clamp(320px, 50vh, 480px)',
            maxHeight: '480px',
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center scale-90 md:scale-95 lg:scale-100 origin-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: isMobile ? '800px' : '1000px' }}>
              {imagesLoaded && images.map((image, index) => {
                const angle = (rotatingCards[index] || 0) * (Math.PI / 180);
                const radius = isMobile ? 90 : (window.innerWidth < 640 ? 130 : window.innerWidth < 1024 ? 170 : 190);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const perspectiveX = (isHovering && !isMobile) ? (mousePosition.x - 0.5) * 15 : 0;
                const perspectiveY = (isHovering && !isMobile) ? (mousePosition.y - 0.5) * 15 : 0;

                return (
                  <div
                    key={image.id}
                    className="absolute w-20 h-24 sm:w-28 sm:h-36 md:w-30 md:h-38"
                    style={{
                      transform: `
                        translate(${x}px, ${y}px)
                        rotateX(${perspectiveY}deg)
                        rotateY(${perspectiveX}deg)
                        rotateZ(${image.rotation}deg)
                      `,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                    }}
                  >
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 8px 32px rgba(212, 175, 55, 0.25)',
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ backfaceVisibility: 'hidden' }}
                      />
                      {!isMobile && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      <div className="absolute inset-0 ring-1 ring-[#D4AF37]/20 rounded-2xl" />
                    </div>
                  </div>
                );
              })}

              <div className="relative z-10">
                <img
                  alt="EBRIVA Hair Design Logo"
                  className={`w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52 ${
                    prefersReducedMotion ? '' : 'breathing-animation'
                  }`}
                  src="/logo1.png"
                  style={{
                    filter: 'drop-shadow(0 0 28px rgba(212, 175, 55, 0.5))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`text-center -mt-2 lg:-mt-3 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="mb-3 relative">
            <div className="relative">
              <span className="absolute inset-0 blur-3xl bg-[#D4AF37]/20 -z-10 animate-pulse"></span>
              <AuroraText
                className="gold-foil font-black font-heading uppercase tracking-tight leading-[0.95]"
                style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
              >
                EBRIVA
              </AuroraText>
            </div>
            <div className="h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 mt-2" />
          </div>

          <TypewriterText
            words={[
              { text: "Güzelliğiniz", className: "gradient-text font-light" },
              { text: "Bizim", className: "gradient-text font-light" },
              { text: "İşimiz", className: "gradient-text font-semibold" }
            ]}
            className="mb-4"
            cursorClassName="bg-[#D4AF37]"
            style={{ fontSize: 'clamp(14px, 1.6vw, 18px)' }}
          />

          <p
            className="text-gray-300/85 mb-4 max-w-2xl mx-auto leading-relaxed font-light px-4"
            style={{ fontSize: 'clamp(13px, 1.4vw, 16px)' }}
          >
            Premium saç tasarımı ve güzellik hizmetleriyle
            <span className="text-[#D4AF37]"> size özel </span>
            deneyim yaşayın
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
          <a
            ref={btnRef}
            href="https://wa.me/905316498371?text=Merhaba,%20randevu%20almak%20istiyorum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 active:scale-95 group relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5D47A 100%)',
              color: '#0A0A0A',
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.35)',
            }}
            onMouseMove={(e) => {
              if (isMobile || !btnRef.current) return;
              const r = btnRef.current.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
              const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
              btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }}
            onMouseLeave={() => {
              if (btnRef.current) {
                btnRef.current.style.transform = 'translate(0, 0)';
              }
            }}
          >
            <span className="relative z-10">Randevu Al</span>
            <ArrowRight
              className={`w-4 h-4 md:w-5 md:h-5 ${
                prefersReducedMotion ? '' : 'group-hover:translate-x-1'
              } transition-transform relative z-10`}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#F5D47A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400/80 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Premium Service</span>
            </div>
            <div className="w-px h-4 bg-[#D4AF37]/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Expert Team</span>
            </div>
          </div>
        </div>
      </div>

      {!isMobile && imagesLoaded && (
        <>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 1.5, -1.5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-6 w-[120px] h-[160px] rounded-2xl overflow-hidden backdrop-blur-md border border-[#D4AF37]/15 shadow-[0_0_18px_rgba(212,175,55,0.15)] hidden lg:block"
          >
            <img src="/gallery/PHOTO-2025-10-11-22-06-09.jpg" className="object-cover w-full h-full" alt="Floating work 1" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 12, 0],
              rotateZ: [0, -1.5, 1.5, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-6 w-[100px] h-[140px] rounded-2xl overflow-hidden backdrop-blur-md border border-[#D4AF37]/15 shadow-[0_0_18px_rgba(212,175,55,0.15)] hidden lg:block"
          >
            <img src="/gallery/PHOTO-2025-10-11-22-06-15.jpg" className="object-cover w-full h-full" alt="Floating work 2" />
          </motion.div>
        </>
      )}
    </section>
  );
}
