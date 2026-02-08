/**
 * ========================================
 * API/CMS 型定義
 * ========================================
 *
 * microCMS および外部API連携の型定義。
 * スキーマ変更時はこのファイルとmicroCMS管理画面の両方を更新すること。
 */

// ========================================
// microCMS 共通型
// ========================================

export interface MicroCMSBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// ========================================
// ブログ記事 (blogs)
// ========================================

export type BlogCategory =
  | 'dx'           // DX推進
  | 'ai'           // 生成AI
  | 'data'         // データ活用
  | 'management'   // 経営
  | 'accounting'   // 経理・税務
  | 'tech'         // テクノロジー
  | 'news';        // お知らせ

export interface BlogPostResponse extends MicroCMSBase {
  title: string;
  slug: string;
  category: BlogCategory;
  content: string;           // リッチエディタ（HTML）
  excerpt?: string;          // 抜粋（プレーンテキスト）
  thumbnail?: MicroCMSImage;
  tags?: string[];
  relatedPosts?: BlogPostResponse[];
}

// ========================================
// サービス詳細 (services) - オプション
// ========================================

export interface MicroCMSServiceFeature {
  fieldId: 'feature';
  title: string;
  description: string;
}

export interface ServiceResponse extends MicroCMSBase {
  serviceId: string;         // dx-consulting, ai-consulting, etc.
  title: string;
  description: string;
  longDescription?: string;  // リッチエディタ
  icon: string;
  priceMin?: number;
  priceMax?: number;
  priceUnit?: string;
  features?: MicroCMSServiceFeature[];
  tags?: string[];
}

// ========================================
// お知らせ (news) - オプション
// ========================================

export type NewsCategory = 'info' | 'media' | 'event' | 'update';

export interface NewsResponse extends MicroCMSBase {
  title: string;
  category: NewsCategory;
  content: string;
  link?: string;
}

// ========================================
// API クライアント設定
// ========================================

export interface MicroCMSConfig {
  serviceDomain: string;
  apiKey: string;
}

export interface MicroCMSQueries {
  draftKey?: string;
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  fields?: string[];
  ids?: string[];
  filters?: string;
  depth?: 1 | 2 | 3;
}

// ========================================
// API関数の型
// ========================================

export type GetBlogList = (
  queries?: MicroCMSQueries
) => Promise<MicroCMSListResponse<BlogPostResponse>>;

export type GetBlogDetail = (
  contentId: string,
  queries?: MicroCMSQueries
) => Promise<BlogPostResponse>;

export type GetServiceList = (
  queries?: MicroCMSQueries
) => Promise<MicroCMSListResponse<ServiceResponse>>;

export type GetServiceDetail = (
  contentId: string,
  queries?: MicroCMSQueries
) => Promise<ServiceResponse>;

// ========================================
// 構造化データ型 (JSON-LD)
// ========================================

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'ProfessionalService';
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  email?: string;
  telephone?: string;
  address?: PostalAddressSchema;
  founder?: PersonSchema;
  sameAs?: string[];
}

export interface PersonSchema {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  alternateName?: string;
  jobTitle?: string | string[];
  description?: string;
  url?: string;
  image?: string;
  email?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface PostalAddressSchema {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting';
  headline: string;
  description?: string;
  image?: string;
  author: PersonSchema;
  publisher: OrganizationSchema;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage?: string;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItemSchema[];
}

export interface BreadcrumbItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  '@id'?: string;
  name: string;
  description?: string;
  url?: string;
  provider?: {
    '@type': 'Organization' | 'Person';
    '@id'?: string;
    name: string;
  };
  serviceType?: string;
  areaServed?: string;
  offers?: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
    priceSpecification?: {
      '@type': 'PriceSpecification';
      price?: string;
      priceCurrency?: string;
      unitText?: string;
    };
  };
}

// ========================================
// 環境変数の型
// ========================================

export interface EnvVars {
  MICROCMS_SERVICE_DOMAIN: string;
  MICROCMS_API_KEY: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  FORMSPREE_ENDPOINT?: string;
  PUBLIC_GTM_ID?: string;
  PUBLIC_GSC_VERIFICATION?: string;
}
