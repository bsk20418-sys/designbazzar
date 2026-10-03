import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import { X, ArrowUpRight, CheckCircle2, Sparkles, Layers, Palette, Eye } from 'lucide-react';
import { ContactButton } from './ui/ContactButton';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContactModal: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContactModal,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0C0C0C]/90 backdrop-blur-xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#111114] border border-[#D7E2EA]/20 rounded-3xl sm:rounded-[40px] shadow-2xl overflow-y-auto no-scrollbar text-[#D7E2EA] p-6 sm:p-10 my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#0C0C0C]/80 border border-[#D7E2EA]/20 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="border-b border-[#D7E2EA]/15 pb-6 mb-8 pr-12">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#E55302] mb-2">
              <span>{project.number}</span>
              <span>•</span>
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-base sm:text-xl text-[#D7E2EA]/80 mt-2 font-light leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Main Visual Image Banner */}
          <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-[#D7E2EA]/15 bg-[#0C0C0C]">
            <img
              src={project.rightMainImage}
              alt={project.title}
              className="w-full h-full object-contain bg-[#080808] p-2 sm:p-4"
            />
          </div>

          {/* 2-Column Content Grid: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            {/* Left: Challenge & Solution */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#E55302] mb-2">
                  The Challenge
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#D7E2EA]/85">
                  {project.challenge || project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#E55302] mb-2">
                  The Creative Solution
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#D7E2EA]/85">
                  {project.solution || project.description}
                </p>
              </div>

              {/* Stats Highlights */}
              {project.stats && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D7E2EA]/10">
                  {project.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-xl bg-[#0C0C0C]/60 border border-[#D7E2EA]/10">
                      <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                      <div className="text-xs font-mono text-[#D7E2EA]/60 uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Meta, Deliverables, Color Palette */}
            <div className="md:col-span-5 flex flex-col gap-6 bg-[#0C0C0C]/50 p-6 rounded-2xl border border-[#D7E2EA]/10">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mb-1">
                  Client
                </div>
                <div className="text-base font-semibold text-white">{project.client}</div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mb-2">
                  Project Scope
                </div>
                <div className="flex flex-col gap-2">
                  {project.scope.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E55302] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette Chips */}
              {project.colorPalette && (
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#E55302]" /> Color Architecture
                  </div>
                  <div className="flex gap-2">
                    {project.colorPalette.map((color, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex-1 h-8 rounded-lg border border-[#D7E2EA]/20 flex items-center justify-center text-[9px] font-mono shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full visual gallery */}
          <div className="mb-10">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60 mb-4">Full Design Gallery</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.gallery?.length ? project.gallery : [project.leftTopImage, project.leftBottomImage, project.rightMainImage]).map((image, idx) => (
                <div key={`${project.id}-gallery-${idx}`} className="min-h-[260px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#D7E2EA]/15 bg-[#080808] flex items-center justify-center">
                  <img src={image} alt={`${project.title} design ${idx + 1}`} className="max-w-full max-h-[70vh] w-auto h-auto object-contain hover:scale-[1.01] transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D7E2EA]/15">
            <div>
              <div className="text-sm font-semibold text-white">Inspired by this project?</div>
              <div className="text-xs text-[#D7E2EA]/60">Let's engineer a bespoke visual presence for your brand.</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 hover:text-white border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/50 transition-colors"
              >
                Close Project
              </button>
              <ContactButton
                label="Start Your Brand Project"
                onClick={() => {
                  onClose();
                  onOpenContactModal();
                }}
                size="sm"
                showIcon={true}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
