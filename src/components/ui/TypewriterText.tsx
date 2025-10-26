import { useEffect, useState } from 'react';

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

  const fullText = words.map(w => w.text).join(' ');

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [charIndex, fullText]);

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
