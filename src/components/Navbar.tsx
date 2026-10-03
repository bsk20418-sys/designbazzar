import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './ui/Logo';
import { ContactButton } from './ui/ContactButton';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0C0C0C]/85 backdrop-blur-md border-b border-[#D7E2EA]/10 py-4 px-6 md:px-10'
            : 'bg-transparent px-6 md:px-10 pt-6 md:pt-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="DesignBazzar Home"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm md:text-lg lg:text-[1.4rem] uppercase font-medium tracking-wider text-[#D7E2EA] hover:text-[#E55302] hover:opacity-100 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <ContactButton
              size="sm"
              label="Start a Project"
              showWhatsAppIcon
              
            />
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D7E2EA] hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0C0C0C]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-bold uppercase tracking-wider text-[#D7E2EA] hover:text-[#E55302] transition-colors py-2 border-b border-[#D7E2EA]/10"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <ContactButton
                size="md"
                label="Start a Project"
              showWhatsAppIcon
                
                className="w-full"
              />
              <div className="text-center text-xs font-mono text-[#D7E2EA]/50 pt-4">
                © 2026 DESIGNBAZZAR • GRAPHIC DESIGNER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
