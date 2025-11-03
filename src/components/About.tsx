import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Users } from 'lucide-react';

export default function About() {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Mutlu Müşteri' },
    { icon: Award, value: '15+', label: 'Yıl Deneyim' },
    { icon: Sparkles, value: '100%', label: 'Memnuniyet' },
  ];

  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      id="about"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      <div className="floating-orb" style={{ width: '550px', height: '550px', top: '15%', left: '-12%', animationDelay: '3s' }} />
      <div className="floating-orb" style={{ width: '480px', height: '480px', bottom: '15%', right: '-8%', animationDelay: '8s' }} />

      <div className="container mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="aurora-text text-5xl md:text-7xl font-black text-center mb-6 uppercase tracking-tight">
            Hakkımızda
          </h2>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Güzelliğinizi en üst seviyeye taşımak için buradayız
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="premium-card rounded-3xl p-12 md:p-16 mb-12"
          >
            <div className="relative z-10">
              <p className="text-xl md:text-2xl leading-relaxed text-center font-light text-gray-300 mb-8">
                EBRIVA Hair Design'da güzellik bir{' '}
                <span className="text-[#D4AF37] font-semibold">sanat formu</span> olarak görülür.
                Salonumuz, yetenekli stilistlerimizin sizin için mükemmel görünümü yaratmaya
                adandıkları bir{' '}
                <span className="text-[#D4AF37] font-semibold">lüks ve profesyonellik</span> sığınağıdır.
                En son teknikleri zamansiz zarafetle birleştirerek, her müşterimizin kendinden emin
                ve ışıl ışıl hissederek ayrılmasını sağlarız.
              </p>

              <div className="flex justify-center">
                <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#F5D47A]/10 border border-[#D4AF37]/30">
                  <p className="text-center text-2xl font-bold bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] bg-clip-text text-transparent">
                    Güzelliğiniz Bizim İşimiz
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="premium-card rounded-2xl p-8 text-center group cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="text-[#D4AF37] w-10 h-10" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-4xl font-black text-[#D4AF37] mb-2 font-['Outfit']">{stat.value}</h3>
                <p className="text-gray-400 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
