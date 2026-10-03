import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIndex) => {
        const chars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {chars.map((char, charIndex) => {
              const start = charCounter / totalChars;
              const end = (charCounter + 1) / totalChars;
              charCounter++;
              return (
                <Char key={charIndex} progress={scrollYProgress} range={[start, end]}>
                  {char}
                </Char>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
