import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingBubbles from './components/FloatingBubbles';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0a] text-gray-200 transition-colors duration-500">
      <div className="relative min-h-screen overflow-hidden" id="home">
        <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>

        <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Hero />
      </div>

      <hr className="my-0 h-px border-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <Services />

      <hr className="my-0 h-px border-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <Gallery />

      <hr className="my-0 h-px border-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <About />

      <hr className="my-0 h-px border-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <Contact />

      <Footer />
    </div>
  );
}

export default App;
