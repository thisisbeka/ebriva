import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from './ui/AuroraText';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const navItems = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hizmetler', href: '#services' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'İletişim', href: '#contact' },
  ];

  const beamKey = useMemo(() => (mobileMenuOpen ? `beam-${Date.now()}` : 'beam-off'), [mobileMenuOpen]);

  const variants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
    closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const item = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
    closed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          background: scrolled
            ? 'rgba(10, 10, 10, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <nav className="container mx-auto px-4">
          <div
            className="flex justify-between items-center transition-all duration-500"
            style={{
              background: scrolled
                ? 'transparent'
                : 'rgba(10, 10, 10, 0.4)',
              backdropFilter: scrolled ? 'none' : 'blur(15px)',
              WebkitBackdropFilter: scrolled ? 'none' : 'blur(15px)',
              border: scrolled
                ? 'none'
                : '1px solid rgba(212, 175, 55, 0.18)',
              borderRadius: scrolled ? '0' : '9999px',
              padding: scrolled ? '0' : '0.5rem 1rem',
              boxShadow: scrolled
                ? 'none'
                : '0 2px 18px rgba(212, 175, 55, 0.10)',
            }}
          >
            <div
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className={`cursor-pointer transition-all duration-500 ${
                scrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              <AuroraText className={`font-bold font-heading transition-all duration-500 ${
                scrolled ? 'text-xl' : 'text-2xl'
              }`}>
                EBRIVA
              </AuroraText>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="nav-link-hover text-gray-200 cursor-pointer font-sans text-sm tracking-wide hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <button
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden relative w-8 h-6 flex flex-col justify-between z-[60]"
            >
              <span className={`h-[2px] w-full bg-[#D4AF37] rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
              <span className={`h-[2px] w-full bg-[#D4AF37] rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-full bg-[#D4AF37] rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed inset-0 z-40 md:hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
                    bg-black/50 backdrop-blur-2xl border-t border-[#D4AF37]/15 overflow-hidden`}
        role="dialog"
        aria-modal="true"
      >
        {mobileMenuOpen && !prefersReducedMotion && (
          <div key={beamKey} className="pointer-events-none absolute inset-0">
            <div className="beam-glow animate-beam-diagonal absolute -inset-x-1/2 -inset-y-1/2" />
            <div className="beam-core animate-beam absolute top-1/3 left-0 right-0 h-24 -rotate-[0.5deg]" />
          </div>
        )}

        <motion.ul
          variants={variants}
          animate={mobileMenuOpen ? 'open' : 'closed'}
          className="flex flex-col justify-center items-center h-full space-y-6"
        >
          {navItems.map((link) => (
            <motion.li
              key={link.name}
              variants={item}
              role="menuitem"
            >
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-transparent bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] bg-clip-text
                           text-2xl font-semibold uppercase tracking-wider font-heading
                           hover:brightness-125 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </>
  );
}
