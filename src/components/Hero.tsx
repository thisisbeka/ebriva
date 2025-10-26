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
    <section
      id="home"
      className="hero-section relative min-h-screen lg:min-h-[min(820px,calc(100svh-88px))] flex flex-col justify-center lg:justify-start items-center text-center px-4 z-10 pt-20 lg:pt-[88px] pb-0 lg:pb-6 mb-0 overflow-clip"
    >
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

      <div className="container mx-auto lg:grid lg:grid-rows-[auto_auto_auto] lg:gap-4 xl:gap-6 lg:h-full">
        {/* 1) Orbit scene */}
        <div
          className={`relative mx-auto transition-all duration-1000 lg:origin-center lg:scale-[0.90] xl:scale-[0.95] 2xl:scale-100 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
          style={{
            height: isMobile ? '40vh' : 'clamp(380px, 50vh, 560px)',
            width: isMobile ? '100%' : 'clamp(380px, 50vh, 560px)',
            minHeight: isMobile ? '280px' : '380px',
            maxHeight: isMobile ? '350px' : '560px',
          }}
        >
        <div
          className="relative w-full h-full flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: isMobile ? '800px' : '1000px' }}>
            {imagesLoaded && images.map((image, index) => {
              const angle = (rotatingCards[index] || 0) * (Math.PI / 180);
              const isDesktop = window.innerWidth >= 1024;
              const radius = isMobile ? 110 : (isDesktop ? (window.innerWidth >= 1280 ? 210 : window.innerWidth >= 1536 ? 220 : 190) : 140);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const perspectiveX = (isHovering && !isMobile) ? (mousePosition.x - 0.5) * 15 : 0;
              const perspectiveY = (isHovering && !isMobile) ? (mousePosition.y - 0.5) * 15 : 0;

              return (
                <div
                  key={image.id}
                  className="absolute w-20 h-24 sm:w-30 sm:h-38"
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
                      boxShadow: isMobile ? '0 10px 40px rgba(212, 175, 55, 0.3)' : '0 0 24px rgba(212, 175, 55, 0.20)',
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
                className={`w-32 h-32 md:w-56 md:h-56 ${
                  prefersReducedMotion ? '' : 'breathing-animation'
                }`}
                src="/logo1.png"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))',
                }}
              />
            </div>
          </div>
        </div>
        </div>

        {/* 2) Title + Subtitle */}
        <div className={`text-center lg:-mt-2 xl:-mt-3 transition-all duration-1000 delay-300 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5'
        }`}>
        <div className="mb-4 relative">
          <div className="relative">
            <span className="absolute inset-0 blur-3xl bg-[#D4AF37]/20 -z-10 animate-pulse"></span>
            <AuroraText className="gold-foil text-4xl sm:text-5xl md:text-7xl lg:text-[clamp(40px,7vw,96px)] font-black font-heading mb-2 lg:leading-[0.95] leading-tight tracking-tight uppercase">
              EBRIVA
            </AuroraText>
          </div>
          <div className="h-0.5 w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 mb-4 lg:hidden" />
        </div>

        <p className="mt-2 text-sm md:text-base lg:text-[clamp(14px,1.6vw,18px)] text-gray-400 lg:text-gray-300/85 max-w-2xl mx-auto">
          Güzelliğiniz Bizim <span className="text-[#F5D47A] font-semibold">İşimiz</span>
        </p>
      </div>

      {/* 3) CTA + Features - Desktop: pushed to bottom */}
      <div className={`lg:mt-auto flex flex-col items-center gap-4 transition-all duration-1000 delay-300 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5'
      }`}>

        <a
          ref={btnRef}
          href="https://wa.me/905316498371?text=Merhaba,%20randevu%20almak%20istiyorum"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm md:text-lg transition-all duration-300 active:scale-95 group relative overflow-hidden"
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
            className={`w-5 h-5 ${
              prefersReducedMotion ? '' : 'group-hover:translate-x-1'
            } transition-transform relative z-10`}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#F5D47A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </a>

        <ul className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm text-gray-500 lg:text-gray-300/80">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Premium Service</span>
          </li>
          <li className="opacity-40">|</li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Expert Team</span>
          </li>
        </ul>
      </div>

      {!isMobile && imagesLoaded && (
        <>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 1.5, -1.5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-6 w-[140px] h-[180px] rounded-2xl overflow-hidden backdrop-blur-md border border-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.15)] hidden lg:block"
          >
            <img src="/gallery/PHOTO-2025-10-11-22-06-09.jpg" className="object-cover w-full h-full" alt="Floating work 1" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 12, 0],
              rotateZ: [0, -1.5, 1.5, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-6 w-[120px] h-[160px] rounded-2xl overflow-hidden backdrop-blur-md border border-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.15)] hidden lg:block"
          >
            <img src="/gallery/PHOTO-2025-10-11-22-06-15.jpg" className="object-cover w-full h-full" alt="Floating work 2" />
          </motion.div>
        </>
      )}
      </div>
    </section>
  );
}
