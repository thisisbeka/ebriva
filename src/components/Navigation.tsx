import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
                : '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: scrolled ? '0' : '9999px',
              padding: scrolled ? '0' : '0.5rem 1rem',
              boxShadow: scrolled
                ? 'none'
                : '0 4px 30px rgba(212, 175, 55, 0.1)',
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
              className="md:hidden text-[#D4AF37] hover:text-[#F5D47A] transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                  strokeWidth={1.5}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                  strokeWidth={1.5}
                />
              </div>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            className="mt-3 mx-4 rounded-2xl md:hidden overflow-hidden"
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2)',
            }}
          >
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="mobile-menu-item block text-center py-4 font-medium text-base cursor-pointer hover:bg-[#D4AF37]/10 active:scale-[0.98] transition-all duration-300 font-sans border-b border-[#D4AF37]/10 last:border-b-0"
                style={{
                  color: '#D4AF37',
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {item.name}
              </a>
            ))}

            <div className="h-1 w-16 mx-auto my-2 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          </div>
        )}
      </header>
    </>
  );
}
