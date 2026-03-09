/**
 * microCMS API Client
 * Blog content fetching and data transformation
 */
import { createClient } from 'microcms-js-sdk';
import type {
  BlogPostResponse,
  MicroCMSListResponse,
  MicroCMSQueries,
  BlogCategory,
  BlogTag,
} from '@shared/contracts/api';
import type { BlogPost } from '@shared/contracts/components';

// ========================================
// Client initialization
// ========================================

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;
const isConfigured = Boolean(serviceDomain && apiKey);

const client = isConfigured ? createClient({ serviceDomain, apiKey }) : null;

// ========================================
// Category / Tag labels
// ========================================

export const categoryLabels: Record<BlogCategory, string> = {
  kaizen: '業務改善',
  ai: 'AI活用',
  data: 'データ分析',
  funding: '補助金・制度',
  accounting: '経理・届出',
  management: '経営のヒント',
};

export const categoryIcons: Record<BlogCategory, string> = {
  kaizen: 'ri:tools-line',
  ai: 'ri:robot-line',
  data: 'ri:bar-chart-box-line',
  funding: 'ri:money-cny-circle-line',
  accounting: 'ri:file-edit-line',
  management: 'ri:lightbulb-line',
};

/** Reverse map: microCMS display name → slug */
const displayNameToSlug: Record<string, BlogCategory> = Object.fromEntries(
  Object.entries(categoryLabels).map(([slug, label]) => [
    label,
    slug as BlogCategory,
  ])
);

export const tagLabels: Record<BlogTag, string> = {
  subsidy: '補助金・助成金',
  automation: '業務自動化',
  'cloud-accounting': 'クラウド会計',
  'cost-saving': 'コスト削減',
  kpi: 'KPI管理',
  compliance: '法改正対応',
  'first-step': 'はじめの一歩',
};

/** Reverse map: microCMS tag display name → slug */
const tagDisplayNameToSlug: Record<string, BlogTag> = Object.fromEntries(
  Object.entries(tagLabels).map(([slug, label]) => [label, slug as BlogTag])
);

/** Normalize a tag value from microCMS to English slug */
export function normalizeTag(raw: string): string {
  return tagDisplayNameToSlug[raw] || raw;
}

// ========================================
// API functions
// ========================================

const emptyListResponse: MicroCMSListResponse<BlogPostResponse> = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
};

/** Fetch blog list with pagination */
export async function getBlogList(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<BlogPostResponse>> {
  if (!client) return emptyListResponse;
  return client.getList<BlogPostResponse>({
    endpoint: 'blogs',
    queries: {
      orders: '-publishedAt',
      ...queries,
    },
  });
}

/** Fetch single blog post by content ID */
export async function getBlogDetail(
  contentId: string,
  queries?: MicroCMSQueries
): Promise<BlogPostResponse> {
  if (!client) {
    throw new Error(
      'microCMS is not configured. Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.'
    );
  }
  return client.getListDetail<BlogPostResponse>({
    endpoint: 'blogs',
    contentId,
    queries,
  });
}

/** Fetch all blog posts (handles pagination, microCMS default limit is 10) */
export async function getAllBlogPosts(): Promise<BlogPostResponse[]> {
  if (!client) return [];

  const posts: BlogPostResponse[] = [];
  const limit = 100;
  let offset = 0;
  let totalCount = 0;

  do {
    const response = await getBlogList({ limit, offset });
    posts.push(...response.contents);
    totalCount = response.totalCount;
    offset += limit;
  } while (offset < totalCount);

  return posts;
}

// ========================================
// Data transformation
// ========================================

/** Transform API response to component-friendly type */
export function transformBlogPost(response: BlogPostResponse): BlogPost {
  return {
    id: response.id,
    title: response.title,
    slug: response.slug,
    category: response.category,
    tags: response.tags?.map(normalizeTag),
    excerpt: response.excerpt,
    content: response.content,
    thumbnail: response.thumbnail
      ? {
          url: response.thumbnail.url,
          width: response.thumbnail.width,
          height: response.thumbnail.height,
        }
      : undefined,
    publishedAt: response.publishedAt,
    updatedAt: response.updatedAt,
  };
}

/** Get primary category from array (microCMS select returns string[]) */
export function getPrimaryCategory(categories: string[]): BlogCategory {
  const raw = categories[0] || 'kaizen';
  return displayNameToSlug[raw] || (raw as BlogCategory);
}

/** Sanitize blog HTML content from microCMS rich editor */
export function sanitizeBlogContent(html: string): string {
  let sanitized = html;
  // Strip YAML frontmatter rendered as <pre><code class="language-yaml">...</code></pre>
  sanitized = sanitized.replace(
    /^<pre><code class="language-yaml">[\s\S]*?<\/code><\/pre>\s*/,
    ''
  );
  // Strip leading <hr> that often follows the frontmatter block
  sanitized = sanitized.replace(/^<hr\s*\/?>/, '');
  // Remove the first <h1> (already displayed in the page header)
  sanitized = sanitized.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');
  // Strip leading <hr> again (often follows the removed h1)
  sanitized = sanitized.replace(/^\s*<hr\s*\/?>/, '');
  // Keep native table semantics and handle horizontal overflow on a wrapper
  sanitized = sanitized.replace(
    /<table\b([^>]*)>([\s\S]*?)<\/table>/gi,
    '<div class="blog-table-scroll" role="region" aria-label="Scrollable table" tabindex="0"><table$1>$2</table></div>'
  );
  return sanitized.trim();
}

// ========================================
// Service ↔ Blog category mapping
// ========================================

/** Maps service IDs to their corresponding blog category */
export const serviceToBlogCategory: Record<string, BlogCategory> = {
  'dx-consulting': 'kaizen',
  'ai-consulting': 'ai',
  'data-analysis': 'data',
  'kpi-dashboard': 'data',
  'management-consulting': 'management',
  'subsidy-support': 'funding',
  bookkeeping: 'accounting',
  'cloud-accounting': 'accounting',
  'it-strategy': 'kaizen',
  'ai-tools': 'ai',
  'web-development': 'kaizen',
};

/** Reverse lookup: blog category → service IDs */
export const blogCategoryToServices: Record<BlogCategory, string[]> =
  Object.entries(serviceToBlogCategory).reduce(
    (acc, [serviceId, category]) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(serviceId);
      return acc;
    },
    {} as Record<string, string[]>
  );

/** Fetch related blog posts for a given service ID (max 3) */
export async function getRelatedBlogPosts(
  serviceId: string,
  limit = 3
): Promise<BlogPostResponse[]> {
  const category = serviceToBlogCategory[serviceId];
  if (!category) return [];

  const allPosts = await getAllBlogPosts();
  return allPosts
    .filter((p) => getPrimaryCategory(p.category) === category)
    .slice(0, limit);
}

/** Format date for display (YYYY.MM.DD) */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}
