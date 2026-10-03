import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { MarqueeTile } from '../types';

interface CategoryGalleryModalProps {
  title: string;
  items: MarqueeTile[];
  onClose: () => void;
  onOpenAsset: (asset: MarqueeTile) => void;
}

export const CategoryGalleryModal: React.FC<CategoryGalleryModalProps> = ({ title, items, onClose, onOpenAsset }) => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter(item => `${item.title} ${item.category}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
        <motion.div initial={{ opacity: 0, y: 30, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: .97 }} className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden bg-[#111114] border border-white/15 rounded-2xl sm:rounded-3xl text-white shadow-2xl">
          <div className="sticky top-0 z-10 bg-[#111114]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#E55302]">Portfolio category</div>
              <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight mt-1">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search this category" className="w-48 sm:w-64 bg-black/40 border border-white/15 rounded-full px-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-[#E55302]" />
              <button type="button" onClick={onClose} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors" aria-label="Close category gallery"><X className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-96px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map(item => (
                <button type="button" key={item.id} onClick={() => onOpenAsset(item)} className="group text-left bg-[#17171a] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-colors">
                  <div className="aspect-[4/3] bg-black/50 flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs text-white/75 line-clamp-2">{item.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E55302] shrink-0" />
                  </div>
                </button>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-16 text-center text-white/50 text-sm">No matching designs in this category.</div>}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
