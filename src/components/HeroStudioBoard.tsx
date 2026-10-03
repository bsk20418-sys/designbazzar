import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CharacterGaze } from './CharacterGaze';
import { MarqueeTile } from '../types';

interface HeroStudioBoardProps {
  onOpenHeroImage?: (asset: MarqueeTile) => void;
}

const HERO_DESIGNS: MarqueeTile[] = [
  { id: 'hero-bim-new-year', title: 'BIM++ Happy New Year 2024–2025', category: 'Social Media Design', image: '/assets/social-media-post-new-year-2024.webp' },
  { id: 'hero-kamloops-logo', title: 'Kamloops Shockwave — Logo Design', category: 'Logo & Brand Design', image: '/assets/logo-kamloops-shockwave.webp' },
  { id: 'hero-decor-helm-independence', title: 'Decor Helm — Independence Day Poster', category: 'Social Media Post Design', image: '/assets/social-media-post-independence-day-dh.webp' },
];


const SOCIAL_URLS = {
  facebook: 'https://www.facebook.com/profile.php?id=100090893606770',
  instagram: 'https://www.instagram.com/designbazzar/',
  pinterest: 'https://in.pinterest.com/designbazzar/',
};

const SocialIcon = ({ label, href, children, className }: { label: string; href: string; children: React.ReactNode; className?: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    whileHover={{ rotateY: 360, scale: 1.08, y: -4 }}
    transition={{ duration: 0.65, ease: 'easeInOut' }}
    className={`social-glass-icon ${className || ''}`}
  >
    {children}
  </motion.a>
);

export const HeroStudioBoard: React.FC<HeroStudioBoardProps> = ({ onOpenHeroImage }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef<Record<string, boolean>>({});
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-300, 300], [8, -8]);
  const rotateY = useTransform(smoothX, [-400, 400], [-10, 10]);
  const float1X = useTransform(smoothX, [-400, 400], [-18, 18]);
  const float1Y = useTransform(smoothY, [-300, 300], [-14, 14]);
  const float2X = useTransform(smoothX, [-400, 400], [22, -22]);
  const float2Y = useTransform(smoothY, [-300, 300], [16, -16]);
  const float3X = useTransform(smoothX, [-400, 400], [-12, 12]);
  const float3Y = useTransform(smoothY, [-300, 300], [18, -18]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const open = (asset: MarqueeTile) => onOpenHeroImage?.(asset);

  return (
    <div ref={boardRef} className="hero-studio relative w-full max-w-[850px] h-[300px] sm:h-[400px] md:h-[460px] lg:h-[500px] flex items-center justify-center pointer-events-auto select-none">
      <motion.div style={isMobile ? { transformStyle: 'preserve-3d', perspective: 1200 } : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }} className="relative w-full h-full flex items-center justify-center">
        <CharacterGaze />

        {[
          {asset:HERO_DESIGNS[0], cls:'-top-4 sm:-top-8 -right-2 sm:-right-8 w-36 sm:w-48 md:w-56', rot:'rotate-6', style:{x:float1X,y:float1Y}, entry:{x:260,y:-90}, delay:0.45},
          {asset:HERO_DESIGNS[1], cls:'-bottom-5 sm:-bottom-9 -left-3 sm:-left-8 w-40 sm:w-56 md:w-64', rot:'-rotate-6', style:{x:float2X,y:float2Y}, entry:{x:-280,y:130}, delay:0.58},
          {asset:HERO_DESIGNS[2], cls:'-top-7 sm:-top-10 left-2 sm:left-10 w-44 sm:w-60 md:w-72', rot:'-rotate-3', style:{x:float3X,y:float3Y}, entry:{x:240,y:110}, delay:0.72}
        ].map(({asset,cls,rot,style,entry,delay}, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity:0, scale:.78, x:entry.x, y:entry.y, rotate: index === 0 ? 8 : index === 1 ? -8 : -6 }}
            animate={{ opacity:1, scale:1, x:0, y:0, rotate:0 }}
            transition={{duration:1.15,delay,ease:[0.16,1,0.3,1]}}
            drag
            dragConstraints={boardRef}
            dragElastic={0.08}
            dragMomentum={false}
            whileDrag={{ scale: 1.035, zIndex: 200, cursor: 'grabbing' }}
            onDragStart={() => { draggedRef.current[asset.id] = true; }}
            onDragEnd={() => { window.setTimeout(() => { draggedRef.current[asset.id] = false; }, 40); }}
            className={`absolute ${cls} z-20 hero-entry-${index+1} ${index === 1 ? 'md:-ml-[100px]' : ''} cursor-grab touch-none`}
          >
            <motion.button
              type="button"
              onClick={() => { if (!draggedRef.current[asset.id]) open(asset); }}
              style={style}
              aria-label={`${asset.title}. Drag to reposition or click to view`}
              className={`hero-design-card hero-design-card-${index+1} w-full rounded-xl sm:rounded-2xl bg-[#111114]/95 border border-[#D7E2EA]/20 p-2.5 sm:p-3 shadow-2xl backdrop-blur-md ${rot} hover:rotate-0 hover:scale-[1.03] transition-transform duration-300 group text-left`}
            >
              <div className="relative h-24 sm:h-32 rounded-lg overflow-hidden bg-[#0C0C0C]">
                <img src={asset.image} alt={asset.title} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500" />
                <span className="absolute top-1.5 right-1.5 bg-[#0C0C0C]/80 backdrop-blur-sm text-[8px] font-mono px-2 py-0.5 rounded text-[#D7E2EA]">CLICK TO VIEW</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-[10px] sm:text-xs font-semibold text-[#D7E2EA]"><span className="truncate">{asset.title}</span><span className="text-[#E55302] shrink-0">↗</span></div>
            </motion.button>
          </motion.div>
        ))}

        <motion.div style={{ x: float1X, y: float2Y }} initial={{ opacity:0,scale:.7 }} animate={{ opacity:1,scale:1 }} transition={{duration:.6,delay:.8}} className="hero-explore-pill absolute -bottom-6 sm:-bottom-8 right-6 sm:right-16 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#18011F] to-[#7621B0] border border-white/20 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs text-white z-30"><Sparkles className="w-3.5 h-3.5 text-[#E55302]" /><span className="text-[10px] font-mono tracking-wider font-medium">Click a design to explore</span></motion.div>
        <div className="hero-socials absolute -bottom-10 sm:-bottom-12 left-1/2 flex items-center gap-3 z-40">
          <SocialIcon label="Facebook" href={SOCIAL_URLS.facebook} className="w-11 h-11 sm:w-12 sm:h-12 -rotate-6">
            <span className="text-xl sm:text-2xl font-black">f</span>
          </SocialIcon>
          <SocialIcon label="Instagram" href={SOCIAL_URLS.instagram} className="w-12 h-12 sm:w-14 sm:h-14 rotate-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </SocialIcon>
          <SocialIcon label="Pinterest" href={SOCIAL_URLS.pinterest} className="w-10 h-10 sm:w-11 sm:h-11 rotate-6">
            <span className="text-lg sm:text-xl font-black">p</span>
          </SocialIcon>
        </div>
      </motion.div>
    </div>
  );
};
