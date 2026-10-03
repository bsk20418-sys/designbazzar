import React, { useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CreativeMarquee } from './components/CreativeMarquee';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { InquiryModal } from './components/InquiryModal';
import { AssetModal } from './components/AssetModal';
import { CategoryGalleryModal } from './components/CategoryGalleryModal';
import { MarqueeTile, ProjectItem } from './types';
import { MARQUEE_ROW_1, MARQUEE_ROW_2, PROJECTS_DATA } from './data/portfolioData';

const EXCLUDED_SHOWCASE = ['designbazzar', 'logo-logo-jp-project-services', 'logo-logo-the-nepalese-house'];

const isAllowedShowcase = (item: MarqueeTile) => {
  const key = `${item.id} ${item.image} ${item.title}`.toLowerCase();
  return !EXCLUDED_SHOWCASE.some(term => key.includes(term));
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MarqueeTile | null>(null);
  const [categoryModal, setCategoryModal] = useState<{ title: string; items: MarqueeTile[] } | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [initialServiceForInquiry, setInitialServiceForInquiry] = useState<string>('');

  const showcaseItems = useMemo(() => {
    const unique = new Map<string, MarqueeTile>();
    [...MARQUEE_ROW_1, ...MARQUEE_ROW_2].filter(isAllowedShowcase).forEach(item => unique.set(item.id, item));
    return Array.from(unique.values());
  }, []);

  const handleOpenContactModal = (serviceName?: string) => {
    const number = '919475606917';
    const serviceText = serviceName ? `
Service: ${serviceName}` : '';
    const message = `Hi DesignBazzar, I found your portfolio and would like to discuss a project.${serviceText}`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectMarqueeTile = (tile: MarqueeTile) => {
    setSelectedAsset(tile);
  };

  const handleSelectService = (serviceName: string) => {
    const serviceMap: Record<string, string[]> = {
      'Social Media Post Design': ['Digital & Web', 'Advertising Creative'],
      'Reels Video Editing': ['Digital & Web', 'Advertising Creative', 'Marketing & Packaging'],
      'Logo & Brand Design': ['Brand Identity', 'Business Identity'],
      'Print Design': ['Print & Publication', 'Print & Promotion'],
    };
    const categories = serviceMap[serviceName] || [];
    const items = showcaseItems.filter(item => categories.includes(item.category));
    setCategoryModal({ title: serviceName, items });
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans selection:bg-[#E55302] selection:text-white relative overflow-x-clip">
      <Navbar onOpenContactModal={() => handleOpenContactModal()} />

      <main className="w-full">
        <HeroSection onOpenContactModal={() => handleOpenContactModal()} onOpenHeroImage={setSelectedAsset} />
        <CreativeMarquee onSelectTile={handleSelectMarqueeTile} />
        <AboutSection onOpenContactModal={() => handleOpenContactModal()} />
        <ServicesSection onSelectService={handleSelectService} />
        <ProjectsSection onOpenProject={(proj) => setSelectedProject(proj)} />
        <ContactSection onOpenContactModal={() => handleOpenContactModal()} />
      </main>

      <Footer onOpenContactModal={() => handleOpenContactModal()} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContactModal={() => {
          setSelectedProject(null);
          handleOpenContactModal();
        }}
      />

      <AssetModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />

      {categoryModal && (
        <CategoryGalleryModal
          title={categoryModal.title}
          items={categoryModal.items}
          onClose={() => setCategoryModal(null)}
          onOpenAsset={(asset) => setSelectedAsset(asset)}
        />
      )}

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={initialServiceForInquiry}
      />
    </div>
  );
}
