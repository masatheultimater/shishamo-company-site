/**
 * ========================================
 * コンポーネント契約（インターフェース定義）
 * ========================================
 *
 * 全エージェントはこのインターフェースに従ってコンポーネントを実装すること。
 * 破壊的変更は禁止。追加は可。
 */

// ========================================
// ACTIVE: 現在使用中の型定義
// ========================================

// --- Layout Components ---

export interface BaseLayoutProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  noIndex?: boolean;
}

/**
 * HeaderProps: Header.astroが参照
 * 実装はsiteConfig.tsのnavigationItemsを使用
 */
export interface HeaderProps {
  currentPage?: 'home' | 'services' | 'profile' | 'blog' | 'contact';
  transparent?: boolean;
}

/**
 * FooterProps: Footer.astroが参照
 * 実装はsiteConfig.tsのfooterLinksを使用
 */
export interface FooterProps {
  showNewsletter?: boolean;
}

// --- SEO Components ---

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// --- Service Detail Data (ServiceDetailLayout.astro, services.ts) ---

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
  originalAmount?: string;
  discountLabel?: string;
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
  originalPriceRange?: string;
  discountReason?: string;

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

// ========================================
// PLANNED: 将来実装予定の型定義
// microCMS連携・ブログ機能実装時に使用
// ========================================

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

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
