import React from 'react';
import { motion } from 'motion/react';
import { AnimatedText } from './ui/AnimatedText';
import { ContactButton } from './ui/ContactButton';
import { FadeIn } from './ui/FadeIn';
import { Magnet } from './ui/Magnet';
import { TARGET_CLIENTS } from '../data/portfolioData';
import { Sparkles, Palette, Layers, Compass, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onOpenContactModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContactModal }) => {
  const paragraph1 =
    "I'm a graphic designer creating brand identity, logo design, social media creatives, advertising graphics, packaging, print design and marketing visuals for real businesses. My portfolio covers practical design work built to communicate clearly and make brands look professional.";

  const paragraph2 =
    "My approach combines typography, composition, visual hierarchy, brand consistency and practical marketing goals. I focus on clean, professional graphic design that a business can actually use across digital, print and marketing channels.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden select-none"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-r from-[#B600A8]/10 via-[#7621B0]/10 to-[#BE4C00]/10 blur-[140px] pointer-events-none -z-10" />

      {/* FLOATING DECORATIVE DESIGN OBJECTS AROUND CORNERS */}
      
      {/* 1. Top-Left Floating Color Palette & Geometry */}
      <div className="absolute top-12 sm:top-20 left-4 sm:left-12 hidden lg:block pointer-events-none">
        <Magnet strength={0.4} padding={80}>
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-48 p-3 rounded-2xl bg-[#141416]/80 backdrop-blur-md border border-[#D7E2EA]/15 shadow-2xl"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#D7E2EA]/70 mb-2">
              <span className="flex items-center gap-1"><Palette className="w-3 h-3 text-[#E55302]" /> PALETTE SPEC</span>
              <span>RGB / CMYK</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-10 rounded-lg overflow-hidden">
              <div className="bg-[#0C0C0C] border border-[#D7E2EA]/20" />
              <div className="bg-[#D7E2EA]" />
              <div className="bg-[#E55302]" />
              <div className="bg-[#7621B0]" />
            </div>
          </motion.div>
        </Magnet>
      </div>

      {/* 2. Top-Right Floating Typography Specimen */}
      <div className="absolute top-16 sm:top-24 right-4 sm:right-12 hidden lg:block pointer-events-none">
        <Magnet strength={0.4} padding={80}>
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-52 p-3.5 rounded-2xl bg-[#141416]/80 backdrop-blur-md border border-[#D7E2EA]/15 shadow-2xl"
          >
            <div className="text-[10px] font-mono text-[#E55302] uppercase tracking-widest mb-1">
              Typography Hierarchy
            </div>
            <div className="text-xl font-black text-white tracking-tight leading-none">
              Aa Bb Gg 99
            </div>
            <div className="text-[10px] font-mono text-[#D7E2EA]/50 mt-1">
              Kanit Geometric Sans-Serif
            </div>
          </motion.div>
        </Magnet>
      </div>

      {/* 3. Bottom-Left Abstract Geometric Brand Mark */}
      <div className="absolute bottom-16 sm:bottom-24 left-6 sm:left-14 hidden lg:block pointer-events-none">
        <Magnet strength={0.4} padding={80}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-44 p-3 rounded-2xl bg-[#141416]/80 backdrop-blur-md border border-[#D7E2EA]/15 shadow-2xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#18011F] to-[#B600A8] flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Identity Systems</div>
              <div className="text-[9px] font-mono text-[#D7E2EA]/60">Vector Precision</div>
            </div>
          </motion.div>
        </Magnet>
      </div>

      {/* 4. Bottom-Right 3D Packaging / Quality Badge */}
      <div className="absolute bottom-16 sm:bottom-24 right-6 sm:right-14 hidden lg:block pointer-events-none">
        <Magnet strength={0.4} padding={80}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-48 p-3 rounded-2xl bg-[#141416]/80 backdrop-blur-md border border-[#D7E2EA]/15 shadow-2xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/20 flex items-center justify-center text-[#E55302]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Strategic Focus</div>
              <div className="text-[9px] font-mono text-[#D7E2EA]/60">Commercial Clarity</div>
            </div>
          </motion.div>
        </Magnet>
      </div>

      {/* MAIN ABOUT CONTENT */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        {/* Section Pill */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D7E2EA]/20 text-xs font-mono uppercase tracking-widest text-[#E55302] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Creative Philosophy
          </div>
        </FadeIn>

        {/* About Heading: metallic gradient */}
        <FadeIn delay={0.1} y={40}>
          <h2
            className="metallic-text font-black uppercase tracking-tight leading-none text-center mb-8 sm:mb-12 drop-shadow-lg hover:text-[#E55302] hover:[-webkit-text-fill-color:#E55302] transition-colors duration-300 cursor-default"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About Me
          </h2>
        </FadeIn>

        {/* Scroll-driven character opacity reveal paragraphs */}
        <div className="max-w-[760px] mx-auto flex flex-col gap-6 text-[#D7E2EA] font-medium leading-relaxed">
          <AnimatedText
            text={paragraph1}
            className="text-center font-medium leading-relaxed tracking-wide"
          />

          <AnimatedText
            text={paragraph2}
            className="text-center font-medium leading-relaxed tracking-wide text-[#D7E2EA]/90"
          />
        </div>

        {/* Target Clients & Positioning Chips */}
        <FadeIn delay={0.4} y={20} className="mt-10 sm:mt-12 w-full">
          <div className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mb-3">
            Graphic design for growing businesses, brands & marketing teams
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {TARGET_CLIENTS.map((client, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#141416]/80 text-[#D7E2EA]/80 border border-[#D7E2EA]/10 hover:border-[#E55302]/40 transition-colors"
              >
                {client}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* About CTA */}
        <FadeIn delay={0.5} y={25} className="mt-10 sm:mt-12">
          <ContactButton
            label="Start a Project"
              showWhatsAppIcon
            
            size="lg"
            showIcon={true}
          />
        </FadeIn>
      </div>
    </section>
  );
};
