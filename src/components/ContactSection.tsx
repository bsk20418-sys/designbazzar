import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ContactButton } from './ui/ContactButton';
import { FadeIn } from './ui/FadeIn';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { Logo } from './ui/Logo';
import {
  Mail,
  Instagram,
  Linkedin,
  MessageCircle,
  Palette,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('desgnbaazar01@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-4 h-4" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'MessageCircle':
        return <MessageCircle className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[500px] bg-gradient-to-tr from-[#B600A8]/15 via-[#7621B0]/10 to-[#BE4C00]/15 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Eyebrow */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141416] border border-[#D7E2EA]/20 text-xs font-mono uppercase tracking-widest text-[#E55302] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Let's Collaborate
          </div>
        </FadeIn>

        {/* Large 2-Line Heading with Metallic Gradient */}
        <FadeIn delay={0.1} y={40}>
          <h2
            className="metallic-text font-black uppercase tracking-tight leading-none text-center drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
          >
            Have a brand in mind?
          </h2>
          <h3
            className="metallic-text-bright font-black uppercase tracking-tight leading-tight text-center mt-2 sm:mt-4 drop-shadow-2xl"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 95px)' }}
          >
            Let's create something unforgettable.
          </h3>
        </FadeIn>

        {/* Description Copy */}
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-lg md:text-xl font-light text-[#D7E2EA]/80 max-w-2xl mx-auto mt-6 sm:mt-8 leading-relaxed">
            Need professional graphic design, branding, social media creatives, packaging, print or video-related creative support? Tell me what you are building and what you need.
          </p>
        </FadeIn>

        {/* Action Buttons: Primary + Secondary */}
        <FadeIn delay={0.35} y={20} className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <ContactButton
            label="Start a Project"
              showWhatsAppIcon
            
            size="lg"
            showIcon={true}
          />

          <a
            href="https://wa.me/919475606917?text=Hi%20DesignBazzar%2C%20I%20have%20a%20query%20about%20your%20design%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#E55302]/60 bg-[#E55302]/10 backdrop-blur-md text-[#D7E2EA] px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-[#E55302]/85 hover:text-white hover:border-[#E55302] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#E55302]/10"
          >
            <span className="w-5 h-5 rounded-full bg-[#E55302] text-white flex items-center justify-center text-[11px] font-bold">W</span>
            <span>For any query • +91 94756 06917</span>
          </a>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full border-2 border-[#D7E2EA]/60 text-[#D7E2EA] px-8 py-4 text-base sm:text-lg uppercase tracking-widest font-medium hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>View My Work</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </FadeIn>

        {/* CONTACT INFORMATION & SOCIAL BADGES */}
        <FadeIn delay={0.45} y={30} className="mt-16 sm:mt-24 w-full max-w-3xl border-t border-[#D7E2EA]/15 pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 text-left">
            {/* Brand details */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Logo size="md" />
              <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60 mt-2">
                Graphic Designer • Visual Identity
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs text-[#D7E2EA]/80 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3/Q4 2026 Projects
              </div>
            </div>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
              {SOCIAL_LINKS.map((link) => {
                if (link.type === 'copy') {
                  return (
                    <button
                      key={link.name}
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141416] border border-[#D7E2EA]/20 hover:border-[#E55302] hover:bg-[#1C1C22] text-xs font-mono uppercase tracking-wider text-[#D7E2EA] transition-all duration-200 cursor-pointer shadow-sm group"
                    >
                      <span className="text-[#E55302]">{getIcon(link.icon)}</span>
                      <span>{copiedEmail ? 'Copied Email' : link.name}</span>
                      {copiedEmail ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#D7E2EA]/40 group-hover:text-white" />
                      )}
                    </button>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141416] border border-[#D7E2EA]/20 hover:border-[#E55302] hover:bg-[#1C1C22] text-xs font-mono uppercase tracking-wider text-[#D7E2EA] transition-all duration-200 shadow-sm group"
                  >
                    <span className="text-[#E55302]">{getIcon(link.icon)}</span>
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D7E2EA]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
