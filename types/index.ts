// src/components/landing/index.ts - Export all landing page components
export * from "../components/landing/Hero";
export * from "../components/landing/Features";
export * from "../components/landing/Testimonials";
export * from "../components/landing/Pricing";
export * from "../components/landing/FAQ";
export * from "../components/landing/CallToAction";
export * from "../components/landing/BusinessTypes";
export * from "../components/landing/StatisticsBar";
export * from "../components/landing/NewsletterSignUp";
export * from "../components/landing/ClientLogos";
export * from "../components/landing/Integrations";
export * from "../components/landing/Footer";
// Define standardized prop interfaces for reusability
// src/types/landing.ts
export interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
  reversed?: boolean;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatarUrl: string;
}

export interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  businessType: "clinic" | "lab" | "imaging" | "supplies" | "all";
  ctaText: string;
  ctaLink: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface ClientLogoProps {
  name: string;
  logoUrl: string;
  altText: string;
}

export interface IntegrationProps {
  name: string;
  logoUrl: string;
  description: string;
}

export interface BusinessTypeCardProps {
  type: "clinic" | "lab" | "imaging" | "supplies";
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface StatProps {
  value: string;
  label: string;
  description?: string;
}
