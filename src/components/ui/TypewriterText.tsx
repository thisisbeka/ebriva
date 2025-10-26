import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

let ctx: AudioContext | null = null;
let master: GainNode;
let hpf: BiquadFilterNode;
let lpf: BiquadFilterNode;
let comp: DynamicsCompressorNode;

function ensureContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.25;

    hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 220;

    lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 6000;

    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -24;
    comp.knee.value = 30;
    comp.ratio.value = 2.0;
    comp.attack.value = 0.002;
    comp.release.value = 0.08;

    master.connect(hpf).connect(lpf).connect(comp).connect(ctx.destination);
  }
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function playAppleClick() {
  ensureContext();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const clickLen = 0.028;
  const bodyLen = 0.04;

  const gainJitter = rand(0.92, 1.06);
  const panJitter = rand(-0.04, 0.04);
  const pitchJitter = rand(-0.03, 0.03);

  const panner = new StereoPannerNode(ctx, { pan: panJitter });

  const noise = ctx.createBufferSource();
  const noiseBuf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * clickLen), ctx.sampleRate);
  const ch = noiseBuf.getChannelData(0);

  for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * 0.7;

  noise.buffer = noiseBuf;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 3300;
  bp.Q.value = 2.2;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0, t0);
  noiseGain.gain.linearRampToValueAtTime(0.9 * gainJitter, t0 + 0.003);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, t0 + clickLen);

  const impulse = ctx.createOscillator();
  impulse.type = "square";
  const baseHz = 3300 * (1 + pitchJitter);
  impulse.frequency.setValueAtTime(baseHz, t0);

  const impulseGain = ctx.createGain();
  impulseGain.gain.setValueAtTime(0.001, t0);
  impulseGain.gain.linearRampToValueAtTime(0.2 * gainJitter, t0 + 0.0015);
  impulseGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.012);

  const body = ctx.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(380 * (1 + pitchJitter), t0);

  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.0, t0);
  bodyGain.gain.linearRampToValueAtTime(0.12 * gainJitter, t0 + 0.004);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, t0 + bodyLen);

  noise.connect(bp).connect(noiseGain).connect(panner).connect(master);
  impulse.connect(impulseGain).connect(panner).connect(master);
  body.connect(bodyGain).connect(panner).connect(master);

  noise.start(t0);
  noise.stop(t0 + clickLen + 0.005);

  impulse.start(t0);
  impulse.stop(t0 + 0.015);

  body.start(t0);
  body.stop(t0 + bodyLen + 0.01);
}

export default function TypewriterText({ words, className = '', cursorClassName = '' }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = words.map(w => w.text).join(' ');

  useEffect(() => {
    if (!isDeleting && charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        playAppleClick();
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
