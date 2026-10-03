import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { MarqueeTile } from '../types';

interface AssetModalProps {
  asset: MarqueeTile | null;
  onClose: () => void;
}

export const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose }) => {
  useEffect(() => {
    if (!asset) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [asset, onClose]);

  return (
    <AnimatePresence>
      {asset && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 md:p-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-7xl max-h-[94vh] flex flex-col bg-[#101012] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 shrink-0">
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#E55302]">{asset.category}</div>
                <h3 className="text-sm sm:text-lg font-semibold text-white truncate mt-0.5">{asset.title}</h3>
              </div>
              <button type="button" onClick={onClose} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shrink-0" aria-label="Close image">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-[#080808] p-3 sm:p-5 md:p-8 flex items-center justify-center">
              <img src={asset.image} alt={asset.title} className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-lg sm:rounded-xl shadow-2xl" />
            </div>
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
              <span className="text-[10px] sm:text-xs text-white/45 font-mono">Click outside or press Esc to close</span>
              <a href={asset.image} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-white hover:text-[#E55302] transition-colors">
                Open full image <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
