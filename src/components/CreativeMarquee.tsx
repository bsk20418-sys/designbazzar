import React from 'react';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/portfolioData';
import { MarqueeTile } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CreativeMarqueeProps {
  onSelectTile?: (tile: MarqueeTile) => void;
}

const allowed = (item: MarqueeTile) => {
  const key = `${item.id} ${item.image} ${item.title}`.toLowerCase();
  return !['designbazzar', 'logo-logo-jp-project-services', 'logo-logo-the-nepalese-house'].some(term => key.includes(term));
};

const Tile = ({ item, onSelectTile }: { item: MarqueeTile; onSelectTile?: (tile: MarqueeTile) => void }) => (
  <button
    type="button"
    onClick={() => onSelectTile?.(item)}
    className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] rounded-2xl relative overflow-hidden group cursor-pointer bg-[#141416] border border-[#D7E2EA]/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[#E55302]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E55302]"
  >
    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-contain bg-[#111114] p-1.5 sm:p-2 transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
    <div className="absolute top-3 left-3 bg-[#0C0C0C]/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#D7E2EA] border border-[#D7E2EA]/15">{item.category}</div>
    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
      <div className="text-left">
        <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide drop-shadow-md">{item.title}</h4>
        <span className="text-[10px] font-mono text-[#D7E2EA]/60 uppercase tracking-widest">DesignBazzar Studio</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#E55302]/20 border border-[#E55302]/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"><ArrowUpRight className="w-4 h-4" /></div>
    </div>
  </button>
);

export const CreativeMarquee: React.FC<CreativeMarqueeProps> = ({ onSelectTile }) => {
  const row1 = MARQUEE_ROW_1.filter(allowed);
  const row2 = MARQUEE_ROW_2.filter(allowed);
  const row1Items = [...row1, ...row1];
  const row2Items = [...row2, ...row2];

  return (
    <section className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E55302]">Visual Exploration & Archive</span>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#D7E2EA] mt-1">Creative Showcase</h2>
        </div>
        <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 max-w-md">A continuous stream of identity systems, packaging, social creatives, print layouts, and campaign visuals.</p>
      </div>

      <div className="relative w-full mb-3 sm:mb-4 overflow-hidden py-1">
        <div className="creative-marquee-track creative-marquee-left">
          {row1Items.map((item, idx) => <Tile key={`${item.id}-top-${idx}`} item={item} onSelectTile={onSelectTile} />)}
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-1">
        <div className="creative-marquee-track creative-marquee-right">
          {row2Items.map((item, idx) => <Tile key={`${item.id}-bottom-${idx}`} item={item} onSelectTile={onSelectTile} />)}
        </div>
      </div>
    </section>
  );
};
