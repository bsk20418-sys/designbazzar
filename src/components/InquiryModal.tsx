import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Copy, Check, MessageCircle, Sparkles, AlertCircle } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

const WHATSAPP_NUMBER = '919475606917';
const WHATSAPP_DISPLAY = '+91 94756 06917';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, initialService = '' }) => {
  const [selectedService, setSelectedService] = useState(initialService || SERVICES_DATA[0].name);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsSuccess(false);
      setError('');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const resetForm = () => {
    setName(''); setEmail(''); setCompany(''); setBudget(''); setMessage('');
    setSelectedService(initialService || SERVICES_DATA[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const whatsappMessage = [
      'Hello DesignBazzar, I would like to discuss a project.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Business / Brand: ${company || 'Not provided'}`,
      `Service: ${selectedService}`,
      `Timeline / Budget: ${budget || 'Not provided'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  const copyWhatsAppToClipboard = () => {
    navigator.clipboard.writeText(WHATSAPP_DISPLAY);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDone = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#0C0C0C]/90 backdrop-blur-xl -z-10" />
        <motion.div initial={{ opacity: 0, scale: .95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 30 }} className="relative w-full max-w-2xl bg-[#111114] border border-[#D7E2EA]/20 rounded-3xl sm:rounded-[36px] shadow-2xl p-6 sm:p-10 text-[#D7E2EA] my-auto">
          <button type="button" onClick={onClose} className="absolute top-6 right-6 p-2.5 rounded-full bg-[#0C0C0C]/80 border border-[#D7E2EA]/20 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors" aria-label="Close dialog"><X className="w-5 h-5" /></button>

          {isSuccess ? (
            <div className="text-center py-10 sm:py-14">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8" /></div>
              <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2">Message sent</h3>
              <p className="text-sm sm:text-base text-[#D7E2EA]/80 max-w-md mx-auto mb-8 leading-relaxed">Thanks, {name || 'there'}. WhatsApp has opened with your project details ready to send. Please press Send in WhatsApp to deliver it.</p>
              <button type="button" onClick={handleDone} className="contact-btn-gradient contact-btn-outline px-8 py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm">Done</button>
            </div>
          ) : (
            <div>
              <div className="mb-6 pr-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E55302] mb-1"><Sparkles className="w-3.5 h-3.5" /> Start a project</div>
                <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">Tell me what you need.</h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1">Graphic design, branding, social media creatives, packaging or video-related work.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/10 mb-6 text-xs">
                <div className="flex items-center gap-2 text-[#D7E2EA]/80 font-mono"><MessageCircle className="w-4 h-4 text-[#E55302]" /><span>WhatsApp: {WHATSAPP_DISPLAY}</span></div>
                <button type="button" onClick={copyWhatsAppToClipboard} className="ml-auto px-3 py-1 rounded-full bg-[#1A1A1E] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors text-[11px] font-mono uppercase flex items-center gap-1.5">{copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}<span>{copiedEmail ? 'Copied' : 'Copy Number'}</span></button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 mb-2">Service *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES_DATA.map(srv => (
                      <button key={srv.id} type="button" onClick={() => setSelectedService(srv.name)} className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${selectedService === srv.name ? 'bg-[#E55302] text-white border-[#E55302]' : 'bg-[#0C0C0C]/60 text-[#D7E2EA]/80 border-[#D7E2EA]/15 hover:border-[#D7E2EA]/40'}`}>{srv.name}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">Your Name *</label><input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#E55302]" /></div>
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">Email *</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#E55302]" /></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">Business / Brand</label><input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Business name" className="w-full bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#E55302]" /></div>
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">Timeline / Budget</label><input type="text" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Optional" className="w-full bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#E55302]" /></div>
                </div>

                <div><label className="block text-xs font-mono uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">Message *</label><textarea rows={5} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about the design or video work you need, your audience, and the goal." className="w-full bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#E55302] resize-none" /></div>

                {error && <div className="flex items-start gap-2 text-xs text-[#D7E2EA]/80 bg-[#E55302]/10 border border-[#E55302]/25 rounded-xl p-3"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E55302]" /><span>{error}</span></div>}

                <button type="submit" disabled={isSubmitting} className="contact-btn-gradient contact-btn-outline w-full py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60">
                  {isSubmitting ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</> : <>Send Message <Send className="w-4 h-4" /></>}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
