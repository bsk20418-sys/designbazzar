import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
  className?: string;
  disabled?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 0.35,
  padding = 60,
  className = '',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);
      const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxDistance) {
        setIsHovered(true);
        setPosition({
          x: distX * strength,
          y: distY * strength,
        });
      } else if (isHovered) {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseLeave();
    };
  }, [disabled, strength, padding, isHovered]);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 150,
        mass: 0.1,
      }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};
