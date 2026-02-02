/**
 * Site Configuration
 * Based on shared/profile.yaml
 *
 * NOTE: YAML loading is now available via src/lib/profile.ts
 * Use getBranding(), getQualifications(), getCareer() etc. for dynamic data
 * This file provides static configuration for better performance
 */
export { loadProfile, getQualifications, getCareer, getBranding, getDesignConfig, getSEOConfig } from './profile';

export interface Qualification {
  name: string;
  icon: string;
  description: string;
  status?: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  priceMin?: number;
  priceMax?: number;
  priceUnit?: string;
  priceType?: 'fixed' | 'success_fee';
  priceRate?: string;
  tags: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface NavigationItem {
  slug: string;
  title: string;
  href: string;
}

/**
 * Site branding from profile.yaml
 */
export const siteBranding = {
  ownerName: '吉川昌宏',
  ownerNickname: 'ししゃも',
  ownerReading: 'よしかわ まさひろ',
  clientName: '吉川昌宏事務所',
  tagline: '中小企業の挑戦を後押しする',
  concept: 'IT × 経営 × 財務で、ビジネスを加速させる',
  philosophy: 'データとテクノロジーの力で、あなたの会社の「なんとかしたい」を一緒に解決します。',
  year: new Date().getFullYear(),
} as const;

/**
 * Navigation items
 */
export const navigationItems: NavigationItem[] = [
  { slug: 'home', title: 'ホーム', href: '/' },
  { slug: 'services', title: 'サービス', href: '/services/' },
  { slug: 'profile', title: 'プロフィール', href: '/profile/' },
  { slug: 'blog', title: 'ブログ', href: '/#blog' },
];

/**
 * Social links
 */
export const socialLinks: SocialLink[] = [
  { name: 'X (Twitter)', icon: 'X', url: 'https://x.com/shishamoex09' },
];

/**
 * Footer service links
 */
export const footerServiceLinks: FooterLink[] = [
  { name: 'DX推進', href: '/services/#dx-consulting' },
  { name: '生成AI導入', href: '/services/#ai-consulting' },
  { name: 'データ分析', href: '/services/#data-analysis' },
  { name: '記帳代行', href: '/services/#bookkeeping' },
];

/**
 * Footer info links
 */
export const footerInfoLinks: FooterLink[] = [
  { name: 'プロフィール', href: '/profile/' },
  { name: 'ブログ（準備中）', href: '/#blog' },
];

/**
 * Footer contact links
 */
export const footerContactLinks: FooterLink[] = [
  { name: '無料相談', href: '/contact/' },
  { name: 'お見積り依頼', href: '/contact/' },
];

/**
 * SEO defaults
 */
export const seoDefaults = {
  siteName: `${siteBranding.ownerNickname}｜${siteBranding.ownerName}`,
  defaultDescription: `中小企業の伴走パートナー「${siteBranding.ownerNickname}｜${siteBranding.ownerName}」。${siteBranding.concept}。DX推進・生成AI導入・データ活用・経営支援をサポートします。`,
  locale: 'ja_JP',
  ogType: 'website' as const,
};

/**
 * Site metadata (URLs, social handles)
 */
export const siteMetadata = {
  siteUrl: 'https://yoshikawa-masahiro.com',
  twitterHandle: '@shishamo_tax',
  geoRegion: 'JP-13',
  geoPlacename: '東京都',
} as const;

/**
 * External API endpoints
 */
export const externalAPIs = {
  formspreeEndpoint: 'https://formspree.io/f/mojwzwea',
} as const;

/**
 * Image paths
 */
export const images = {
  profileImage: '/自画像_シンプル背景.png',
  ogImage: '/自画像_シンプル背景.png',
} as const;
