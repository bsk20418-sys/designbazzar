import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Magnet } from './Magnet';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  href?: string;
  whatsappIconOnly?: boolean;
  showWhatsAppIcon?: boolean;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = 'Start a Project',
  onClick,
  className = '',
  size = 'md',
  showIcon = false,
  href,
  whatsappIconOnly = false,
  showWhatsAppIcon = false,
}) => {
  const whatsappHref = 'https://wa.me/919475606917?text=' + encodeURIComponent('Hi DesignBazzar, I found your portfolio and would like to discuss a project.');
  const effectiveHref = (whatsappIconOnly || showWhatsAppIcon) ? whatsappHref : href;

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs sm:text-sm',
    md: 'px-7 py-3.5 text-sm sm:text-base',
    lg: 'px-9 py-4 text-base sm:text-lg',
  };

  const buttonContent = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative inline-flex items-center justify-center gap-2.5
        rounded-full text-white font-medium uppercase tracking-widest cursor-pointer
        contact-btn-gradient contact-btn-outline transition-all duration-300
        ${whatsappIconOnly ? 'w-12 h-12 p-0' : sizeClasses[size]}
        ${showWhatsAppIcon ? 'group' : ''}
        ${className}
      `}
      aria-label={whatsappIconOnly ? 'Chat on WhatsApp' : label}
      title={whatsappIconOnly ? 'Chat on WhatsApp' : label}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap drop-shadow-sm font-semibold">
        {whatsappIconOnly ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
            <path fill="currentColor" d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.6 5.93L.11 24l6.35-1.67a11.84 11.84 0 0 0 5.62 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.24-6.15-3.43-8.42ZM12.09 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.83 9.83 0 0 1-1.51-5.19C2.2 6.43 6.63 2 12.08 2a9.8 9.8 0 0 1 6.97 2.89 9.8 9.8 0 0 1 2.9 6.98c0 5.44-4.43 9.83-9.86 9.83Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.21 3.05c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
          </svg>
        ) : (
          <>
            {showWhatsAppIcon && (
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
                <path fill="currentColor" d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.6 5.93L.11 24l6.35-1.67a11.84 11.84 0 0 0 5.62 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.24-6.15-3.43-8.42ZM12.09 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.83 9.83 0 0 1-1.51-5.19C2.2 6.43 6.63 2 12.08 2a9.8 9.8 0 0 1 6.97 2.89 9.8 9.8 0 0 1 2.9 6.98c0 5.44-4.43 9.83-9.86 9.83Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.21 3.05c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
              </svg>
            )}
            {label}
            {showIcon && <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          </>
        )}
      </span>
    </motion.button>
  );

  const wrapper = effectiveHref ? (
    <a href={effectiveHref} target={(whatsappIconOnly || showWhatsAppIcon) ? '_blank' : undefined} rel={(whatsappIconOnly || showWhatsAppIcon) ? 'noopener noreferrer' : undefined} className="inline-block">
      {buttonContent}
    </a>
  ) : (
    buttonContent
  );

  return (
    <Magnet strength={0.3} padding={40}>
      {wrapper}
    </Magnet>
  );
};
