import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', lightMode = false }) => {
  const sizeClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-10 sm:h-13',
    lg: 'h-11 sm:h-13',
    xl: 'h-14 sm:h-18',
  };

  return (
    <img
      src="/assets/designbazzar-logo-cropped-new.png"
      alt="DesignBazzar — Graphic Design Portfolio"
      className={`${sizeClasses[size]} max-w-[240px] w-auto object-contain select-none ${lightMode ? '' : ''} ${className}`}
      draggable={false}
    />
  );
};
