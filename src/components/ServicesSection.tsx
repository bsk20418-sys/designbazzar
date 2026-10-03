import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data/portfolioData';
import { ServiceItem } from '../types';
import { Plus, Minus, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20 select-none shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Top Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 text-xs font-mono uppercase tracking-widest text-[#0C0C0C] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E55302]" />
              Strategic Capabilities
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={40}>
            <h2
              className="font-black uppercase tracking-tight text-[#0C0C0C] text-center leading-none hover:text-[#E55302] transition-colors duration-300 cursor-default"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Services
            </h2>
          </FadeIn>
        </div>

        {/* 4 Service Items List */}
        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {SERVICES_DATA.map((service: ServiceItem, index: number) => {
            const isExpanded = expandedService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '50px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 px-2 sm:px-4 rounded-3xl group transition-all duration-300 hover:bg-[#E55302]/10 hover:border-[#E55302]/40 cursor-pointer"
                onClick={() => onSelectService?.(service.name)}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 md:gap-10">
                  {/* Left: Huge Number */}
                  <div className="lg:w-1/4 flex-shrink-0 flex items-center justify-between lg:block">
                    <span
                      className="font-black text-[#0C0C0C]/85 group-hover:text-[#E55302] transition-colors duration-300 leading-none tracking-tight font-mono"
                      style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                    >
                      {service.number}
                    </span>

                    {/* Mobile Expand Toggle Icon */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleService(service.id); }}
                      className="lg:hidden p-2 rounded-full border border-[#0C0C0C]/20 hover:bg-[#0C0C0C] hover:text-white transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Right: Service Name, Description & Specialties */}
                  <div className="lg:w-3/4 flex flex-col justify-between">
                    <div>
                      {/* Name & Quick Action */}
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className="inline-flex w-fit px-3 py-1 rounded-xl font-bold uppercase tracking-tight text-[#0C0C0C] group-hover:text-[#E55302] transition-colors duration-300"
                          style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.3rem)' }}
                        >
                          {service.name}
                        </h3>

                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); onSelectService?.(service.name); }}
                          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#0C0C0C]/70 hover:text-[#E55302] transition-colors"
                        >
                          View category work
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Description */}
                      <p
                        className="text-[#0C0C0C]/75 font-normal leading-relaxed mt-3 sm:mt-4 max-w-3xl"
                        style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)' }}
                      >
                        {service.description}
                      </p>

                      {/* Specialties Pill Badges */}
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-6">
                        {service.specialties.map((specialty, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#0C0C0C]/[0.05] text-[#0C0C0C] border border-[#0C0C0C]/10 hover:bg-[#E55302]/85 hover:text-white hover:border-[#E55302] hover:backdrop-blur-md hover:shadow-md hover:shadow-[#E55302]/20 transition-all duration-250"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Deliverables Accordion */}
                    <div className="mt-6 pt-4 border-t border-[#0C0C0C]/10">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleService(service.id); }}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0C0C0C]/80 font-bold hover:text-[#E55302] transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <Minus className="w-4 h-4 text-[#E55302]" /> Hide Core Deliverables
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-[#E55302]" /> View Deliverables & Production Scope
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && service.deliverables && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 pb-2">
                              {service.deliverables.map((item, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/10 text-xs sm:text-sm text-[#0C0C0C]/85"
                                >
                                  <CheckCircle className="w-4 h-4 text-[#E55302] flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
