import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const images = useMemo(() => [
    '/fn1.jpeg',
    '/fn2.jpeg',
    '/fn3.jpeg',
    '/fn4.jpeg',
    '/fn5.jpeg',
    '/fn6.jpg'
  ], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#0B0B0B] via-[#0E0E0E] to-[#151515]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)]"></div>

      <div className={`absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,transparent_40%,rgba(245,212,122,0.07)_50%,transparent_60%)] ${prefersReducedMotion ? '' : 'animate-sweep'}`}></div>

      <div className={`relative w-[clamp(280px,80vw,400px)] h-[clamp(280px,80vw,400px)] flex items-center justify-center ${prefersReducedMotion ? '' : 'animate-slow-rotate'}`}>
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute w-[90px] h-[90px] object-cover rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            style={{
              transform: `rotate(${i * 60}deg) translateY(-150px) rotate(-${i * 60}deg)`
            }}
          />
        ))}
      </div>

      <div className="absolute flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[#F5D47A]/25 to-transparent border border-[#D4AF37]/30">
        <img src="/logo1.png" alt="EBRIVA" className="w-14 h-14 opacity-90" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        className="mt-[420px] text-transparent bg-gradient-to-r from-[#D4AF37] to-[#F5D47A] bg-clip-text text-5xl font-black uppercase tracking-wide"
      >
        EBRIVA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-2 text-gray-400 text-sm max-w-xs mx-auto leading-snug"
      >
        Güzelliğiniz Bizim <span className="text-[#F5D47A] font-semibold">İşimiz</span>
      </motion.p>

      <motion.a
        href="https://wa.me/905316498371?text=Merhaba,%20randevu%20almak%20istiyorum"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.6)' }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D47A] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500"
      >
        Randevu Al →
      </motion.a>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent"></div>
    </section>
  );
}
