import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterText({ words, className = '', cursorClassName = '' }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const fullText = words.map(w => w.text).join(' ');

  const playKeySound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    if (!isDeleting && charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        playKeySound();
        setDisplayedText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && charIndex === fullText.length) {
      setIsComplete(true);
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIsComplete(false);
    }
  }, [charIndex, fullText, isDeleting]);

  const getCharClassName = (index: number) => {
    let currentLength = 0;
    for (let i = 0; i < words.length; i++) {
      const wordLength = words[i].text.length;
      if (index >= currentLength && index < currentLength + wordLength) {
        return words[i].className || '';
      }
      currentLength += wordLength + 1;
    }
    return '';
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-xl md:text-2xl font-light tracking-wide whitespace-nowrap">
        {displayedText.split('').map((char, index) => (
          <span key={index} className={getCharClassName(index)}>
            {char}
          </span>
        ))}
        <span
          className={`inline-block w-0.5 h-6 md:h-8 ml-1 ${cursorClassName} ${isComplete ? 'animate-pulse' : ''}`}
          style={{
            animation: isComplete ? 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
          }}
        />
      </div>
    </div>
  );
}
