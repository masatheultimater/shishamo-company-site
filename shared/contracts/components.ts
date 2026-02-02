/**
 * ========================================
 * コンポーネント契約（インターフェース定義）
 * ========================================
 *
 * 全エージェントはこのインターフェースに従ってコンポーネントを実装すること。
 * 破壊的変更は禁止。追加は可。
 */

// ========================================
// Layout Components
// ========================================

export interface BaseLayoutProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface HeaderProps {
  currentPage?: 'home' | 'services' | 'profile' | 'blog' | 'contact';
  transparent?: boolean;
}

export interface FooterProps {
  showNewsletter?: boolean;
}

// ========================================
// Section Components
// ========================================

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaPrimary?: CTAButton;
  ctaSecondary?: CTAButton;
  background?: 'gradient' | 'image' | 'solid';
  backgroundImage?: string;
  showProfileCard?: boolean;
}

export interface CTAButton {
  text: string;
  href: string;
  icon?: string;
}

export interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: ServiceItem[];
  layout?: 'grid' | 'list';
  maxItems?: number;
  showPrices?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  priceMin?: number;
  priceMax?: number;
  priceUnit?: string;
  priceType?: 'fixed' | 'success_fee';
  tags?: string[];
  href?: string;
}

export interface ProfileSectionProps {
  variant?: 'full' | 'preview';
  showTimeline?: boolean;
  showQualifications?: boolean;
  showPhilosophy?: boolean;
}

export interface QualificationItem {
  name: string;
  icon: string;
  description?: string;
  status?: 'active' | 'pending';
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface CTASectionProps {
  title: string;
  description?: string;
  ctaPrimary: CTAButton;
  ctaSecondary?: CTAButton;
  variant?: 'primary' | 'secondary' | 'accent';
}

export interface BlogPreviewSectionProps {
  title?: string;
  maxItems?: number;
  showCategories?: boolean;
}

// ========================================
// Feature Components
// ========================================

export interface ContactFormProps {
  showSidebar?: boolean;
  formEndpoint: string;
  turnstileSiteKey?: string;
}

export interface ServiceCardProps {
  service: ServiceItem;
  variant?: 'default' | 'featured' | 'compact';
  showPrice?: boolean;
  showTags?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
  showCategory?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  thumbnail?: ImageAsset;
  publishedAt: string;
  updatedAt?: string;
}

export interface ImageAsset {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

// ========================================
// UI Components
// ========================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  icon?: string;
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  href?: string;
}

// ========================================
// SEO Components
// ========================================

export interface StructuredDataProps {
  type: 'Organization' | 'Person' | 'LocalBusiness' | 'Article' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// ========================================
// Page Props
// ========================================

export interface PageProps {
  title: string;
  description?: string;
}

export interface ServiceDetailPageProps extends PageProps {
  service: ServiceItem;
  relatedServices?: ServiceItem[];
}

// ========================================
// Service Detail Data (for template)
// ========================================

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceFlowStep {
  title: string;
  description: string;
}

export interface ServicePricingPlan {
  plan: string;
  amount: string;
  unit: string;
  description: string;
  popular?: boolean;
}

export interface RelatedService {
  href: string;
  icon: string;
  name: string;
  description: string;
}

export interface ServiceDetailData {
  // Meta & SEO
  id: string;
  title: string;
  metaDescription: string;

  // Hero Section
  icon: string;
  name: string;
  tagline: string;
  priceRange: string;
  priceUnit: string;

  // Content Sections
  problems: string[];
  features: ServiceFeature[];
  flow: ServiceFlowStep[];
  pricing: ServicePricingPlan[];
  relatedServices: RelatedService[];

  // CTA Section
  cta: {
    title: string;
    description: string;
  };
}

export interface BlogPostPageProps extends PageProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export interface BlogIndexPageProps extends PageProps {
  posts: BlogPost[];
  categories?: string[];
  currentCategory?: string;
  pagination?: PaginationProps;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
