import React from 'react';
import { motion } from 'motion/react';
import { HeroStudioBoard } from './HeroStudioBoard';
import { ContactButton } from './ui/ContactButton';
import { ArrowDown } from 'lucide-react';
import { MarqueeTile } from '../types';

interface HeroSectionProps {
  onOpenContactModal: () => void;
  onOpenHeroImage: (asset: MarqueeTile) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContactModal, onOpenHeroImage }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col justify-between md:justify-start pt-24 sm:pt-28 md:pt-24 pb-8 sm:pb-12 px-5 sm:px-8 md:px-10 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-b from-[#646973]/15 via-[#B600A8]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Massive Editorial Hero Heading */}
      <div className="w-full overflow-hidden flex flex-col items-center justify-center pt-2 sm:pt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full text-center"
        >
          <h1 className="hero-title-sweep font-black tracking-tight leading-[0.88] text-[#D7E2EA] drop-shadow-2xl text-[8.5vw] sm:text-[7.2vw] md:text-[6.3vw] lg:text-[5.7vw]">
            DESIGNING IDEAS INTO VISUAL EXPERIENCES
          </h1>
        </motion.div>
      </div>

      {/* Center Studio Desk / Creative Composition Visual */}
      <div className="relative my-auto md:my-0 flex items-center justify-center py-4 sm:py-6 md:py-2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full flex justify-center"
        >
          <HeroStudioBoard onOpenHeroImage={onOpenHeroImage} />
        </motion.div>
      </div>

      {/* Hero Bottom Content: Left Text & Right CTA */}
      <div className="hero-bottom-content w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-end gap-5 sm:gap-4 z-20 mt-4 sm:mt-0 md:mt-1">
        {/* Left Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-bottom-copy max-w-[100%] sm:max-w-[280px] md:max-w-[360px]"
        >
          <p
            className="text-[#D7E2EA] font-light tracking-wide leading-relaxed"
            style={{ fontSize: 'clamp(0.72rem, 1.05vw, 1.1rem)' }}
          >
            I create professional graphic design, branding, social media creatives, marketing visuals, packaging and video-ready content for businesses that want to look credible and communicate clearly.
          </p>
        </motion.div>

        {/* Scroll Indicator helper (Center-ish desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hero-scroll-indicator hidden lg:flex flex-col items-center gap-1 text-[#D7E2EA]/40 text-xs font-mono tracking-widest uppercase"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#E55302]" />
          </motion.div>
        </motion.div>

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-bottom-cta"
        >
          <ContactButton
            label="Let's Work Together"
            onClick={onOpenContactModal}
            size="md"
            showIcon={false}
            showWhatsAppIcon
          />
        </motion.div>
      </div>
    </section>
  );
};
