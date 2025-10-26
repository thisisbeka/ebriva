import { useEffect, useRef } from 'react';

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
}

export const AuroraText = ({ children, className = '' }: AuroraTextProps) => {
  const auroraTextRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const auroraText = auroraTextRef.current;

    if (!container || !auroraText) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const { width, height } = rect;

      const x = ((clientX - rect.left) / width - 0.5) * 2;
      const y = ((clientY - rect.top) / height - 0.5) * 2;

      const bgPosX = 50 + x * 20;
      const bgPosY = 50 + y * 20;
      auroraText.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="inline-block">
      <h1 ref={auroraTextRef} className={`aurora-text ${className}`}>
        {children}
      </h1>
    </div>
  );
};
