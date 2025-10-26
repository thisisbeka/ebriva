import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GoldDivider from './components/ui/GoldDivider';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0a] text-gray-200 transition-colors duration-500">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <motion.main
        animate={mobileMenuOpen ? { scale: 0.96, filter: 'blur(4px)' } : { scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
      >
        <div className="relative min-h-screen overflow-hidden" id="home">
          <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>
          <Hero />
        </div>

        <GoldDivider />
        <Services />

        <GoldDivider />
        <Gallery />

        <GoldDivider />
        <About />

        <GoldDivider />
        <Contact />

        <Footer />
      </motion.main>
    </div>
  );
}

export default App;
