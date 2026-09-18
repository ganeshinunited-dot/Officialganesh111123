export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  coverGradient: string;
  tagline: string;
  metrics: { label: string; value: string };
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  accentColor: string;
}

export interface Service {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarText: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  description: string;
  readTime: string;
  sections: BlogArticleSection[];
}

export interface EstimatorState {
  projectType: string;
  timeline: string;
  features: string[];
  budgetTier: string;
}
