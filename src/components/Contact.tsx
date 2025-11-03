import { Phone, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      id="contact"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      <div className="floating-orb" style={{ width: '520px', height: '520px', top: '20%', right: '-10%', animationDelay: '6s' }} />
      <div className="floating-orb" style={{ width: '420px', height: '420px', bottom: '25%', left: '-8%', animationDelay: '12s' }} />

      <div className="container mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="aurora-text text-5xl md:text-7xl font-black text-center mb-6 uppercase tracking-tight">
            İletişim
          </h2>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Randevu almak veya sorularınız için bizimle iletişime geçin
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="premium-card rounded-3xl p-12 md:p-16"
          >
            <div className="relative z-10">
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <a
                  className="group p-6 rounded-2xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
                  href="https://wa.me/905316498371"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="WhatsApp"
                    className="h-16 w-16 group-hover:scale-110 transition-transform"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfh15UMJJHScAs9LMlsiHLTl_KXIeX19gaf858u0P3R9ePiasF7JuH5P356cdoAn0zpAkn2LWX0uG3tmrPOk-dk5IECNJjptHUXQMyXbvDVdGQZcxkxMrZ_dGqA_9eZY75DR9A25CeJhKekvWjxChYJgGtdGVcMoxB95phNd36tkpvxOYO5HoYgJN8oCisHYa4fmyAL4mJ3G66Fb8Kc4I8vkCJWlUjmU-M6L8XZ8wEhpa7e6b-oPXC1_lpDtQ825awKRVqBYAmrzfB"
                  />
                </a>
                <a
                  className="group p-6 rounded-2xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
                  href="https://www.instagram.com/ebriva_hairdesign/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Instagram"
                    className="h-16 w-16 group-hover:scale-110 transition-transform"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBAnfNIX9CqDK20N2Z-AsmNn2PieQl7dEoTVXJgXu3iKekkWsuEekg62_Lnc9j_X8941LZ-VwG4EIJVX4WuWOcEz9lcx3cpg63j3T2ufdkeC4XSkS96Keefihh5ST9cupSgiiwDcMe3PpyT2sr76_sgM3j-33kpXjyM5F-SMIafBhmLgZ7Gq3cSVfJBSq273p7nLWcFtPMyn_dLBj3z2GGpUug140F3_wKyA0BwYfXeOjbN4EpQ1WvPo4m9kxjQozuiSLOQ2GRIKB7"
                  />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <a
                  href="tel:+905316498371"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-[#D4AF37]/5"
                >
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5">
                    <Phone className="text-[#D4AF37] w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    +90 531 649 83 71
                  </span>
                </a>

                <a
                  href="https://maps.app.goo.gl/NbbVLMh8ARDZ5xcO3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-[#D4AF37]/5"
                >
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5">
                    <MapPin className="text-[#D4AF37] w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    Altınşehir, Kumru Caddesi, 28/A, Ümraniye, İstanbul
                  </span>
                </a>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl">
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5">
                    <Clock className="text-[#D4AF37] w-8 h-8" />
                  </div>
                  <div className="text-gray-300">
                    <p className="mb-2">Pazartesi - Cumartesi</p>
                    <p className="text-sm text-gray-400 mb-3">09:00 - 20:00</p>
                    <p className="mb-2">Pazar</p>
                    <p className="text-sm text-gray-400">09:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://wa.me/905316498371?text=Merhaba,%20randevu%20almak%20istiyorum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F5D47A 100%)',
                    color: '#0A0A0A',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)',
                  }}
                >
                  <span>Hemen Randevu Al</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
