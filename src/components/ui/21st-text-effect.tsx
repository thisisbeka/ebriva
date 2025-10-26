import { useEffect, useRef } from 'react';

export const AuroraHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement>(null);
    const auroraTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        const stars = starsRef.current;
        const auroraText = auroraTextRef.current;

        if (!hero || !stars || !auroraText) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = hero;

            const x = (clientX / offsetWidth - 0.5) * 2;
            const y = (clientY / offsetHeight - 0.5) * 2;

            stars.style.transform = `translateX(${x * -20}px) translateY(${y * -20}px)`;

            const bgPosX = 50 + x * 20;
            const bgPosY = 50 + y * 20;
            auroraText.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
        };

        hero.addEventListener('mousemove', handleMouseMove);

        return () => {
            hero.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={heroRef} className="hero-container">
            <div ref={starsRef} className="stars"></div>
            <main className="relative z-10">
                <h1 ref={auroraTextRef} className="aurora-text text-6xl sm:text-8xl lg:text-9xl font-black uppercase">
                    21st.dev
                </h1>
                <p className="mt-4 text-lg text-gray-400 max-w-lg mx-auto">
                    A dynamic text effect where light and color flow like the northern lights.
                </p>
            </main>
        </div>
    );
};
