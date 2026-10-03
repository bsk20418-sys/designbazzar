import React, { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';
import { ProjectItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onOpenProject: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  progress,
  range,
  targetScale,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky flex items-center justify-center top-20 sm:top-24 md:top-28 w-full select-none"
      style={{ top: `calc(5.5rem + ${index * 28}px)` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-7xl h-[78vh] sm:h-[82vh] md:h-[85vh] rounded-[32px] sm:rounded-[45px] md:rounded-[60px] border-2 border-[#D7E2EA]/60 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden relative group"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E55302]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-[#D7E2EA]/15 z-10 shrink-0">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <span className="font-mono text-base sm:text-2xl md:text-3xl font-bold text-[#E55302]">{project.number}</span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#D7E2EA] truncate">{project.title}</h3>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D7E2EA]/60 shrink-0">/ {project.category}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenProject(project)}
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-[#D7E2EA]/10 transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm group/btn shrink-0"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 flex-1 min-h-0 pt-3 sm:pt-4 z-10">
          <div className="hidden md:grid md:col-span-5 grid-rows-2 gap-3 sm:gap-4 min-h-0">
            <div onClick={() => onOpenProject(project)} className="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#141416] cursor-pointer border border-[#D7E2EA]/10 flex items-center justify-center p-3">
              <img src={project.leftTopImage} alt={`${project.title} detail top`} loading="lazy" className="max-w-full max-h-full w-auto h-auto object-contain" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-wider text-white/65">{project.scope[0] || 'Brand Detail'}</div>
            </div>

            <div onClick={() => onOpenProject(project)} className="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#141416] cursor-pointer border border-[#D7E2EA]/10 flex items-center justify-center p-3">
              <img src={project.leftBottomImage} alt={`${project.title} detail bottom`} loading="lazy" className="max-w-full max-h-full w-auto h-auto object-contain" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-wider text-white/65">{project.scope[1] || 'Supporting Design'}</div>
            </div>
          </div>

          <div
            onClick={() => onOpenProject(project)}
            className="md:col-span-7 min-h-0 relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#141416] cursor-pointer border border-[#D7E2EA]/10 flex items-center justify-center p-3 sm:p-5 md:p-7"
          >
            <img
              src={project.rightMainImage}
              alt={`${project.title} main artwork`}
              loading="lazy"
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/65">{project.client} • {project.year}</span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#E55302]">Click to view full project</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
