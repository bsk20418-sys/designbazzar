import React, { useRef } from 'react';
import { useScroll } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectCard } from './ProjectCard';
import { FadeIn } from './ui/FadeIn';
import { Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = PROJECTS_DATA.length;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-30 pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-40 px-4 sm:px-6 md:px-10 overflow-visible select-none shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#7621B0]/10 via-[#BE4C00]/10 to-transparent blur-[160px] pointer-events-none -z-10" />

      {/* Heading Container */}
      <div className="max-w-7xl mx-auto text-center mb-16 sm:mb-20 md:mb-24">
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141416] border border-[#D7E2EA]/20 text-xs font-mono uppercase tracking-widest text-[#E55302] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Portfolio
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={40}>
          <h2
            className="metallic-text font-black uppercase tracking-tight leading-none text-center drop-shadow-2xl"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Selected Work
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="text-xs sm:text-base font-light text-[#D7E2EA]/70 max-w-xl mx-auto mt-4 leading-relaxed">
            A selection of real-world graphic design projects across branding, social media design, advertising, packaging, print and marketing creatives.
          </p>
        </FadeIn>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24 relative">
        {PROJECTS_DATA.map((project, index) => {
          const targetScale = 1 - (totalCards - 1 - index) * 0.03;
          const range: [number, number] = [index * 0.16, 1];

          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={totalCards}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              onOpenProject={onOpenProject}
            />
          );
        })}
      </div>
    </section>
  );
};
