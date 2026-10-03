export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
  specialties: string[];
  deliverables?: string[];
  iconName?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  client: string;
  year: string;
  summary: string;
  description: string;
  leftTopImage: string;
  leftBottomImage: string;
  rightMainImage: string;
  gallery?: string[];
  tags: string[];
  scope: string[];
  challenge?: string;
  solution?: string;
  colorPalette?: string[];
  stats?: { label: string; value: string }[];
}

export interface MarqueeTile {
  id: string;
  title: string;
  category: string;
  image: string;
  accentColor?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
  type: 'copy' | 'link';
}
