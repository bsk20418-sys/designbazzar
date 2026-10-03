import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Logo } from './ui/Logo';

interface FooterProps {
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContactModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#080808] border-t border-[#D7E2EA]/10 text-[#D7E2EA] px-6 md:px-10 py-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="hidden sm:inline-block text-xs font-mono text-[#D7E2EA]/40">|</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60">
              Graphic Design, Branding & Marketing Visuals
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs sm:text-sm uppercase font-medium tracking-wider text-[#D7E2EA]/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#141416] border border-[#D7E2EA]/15 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all duration-200 cursor-pointer flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Three-Column Minimal Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D7E2EA]/10 text-xs font-mono text-[#D7E2EA]/50">
          <div>© 2026 DesignBazzar. All rights reserved.</div>
          <div>Graphic Designer & Creative Designer</div>
          <button
            type="button"
            onClick={onOpenContactModal}
            className="hover:text-[#E55302] transition-colors cursor-pointer uppercase tracking-wider"
          >
            Let's Work Together →
          </button>
        </div>
      </div>
    </footer>
  );
};
