// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { createClient } from 'microcms-js-sdk';
import { loadEnv } from 'vite';

// Load env vars for sitemap lastmod injection
// eslint-disable-next-line no-undef
const env = loadEnv('production', process.cwd(), '');
const cmsClient =
  env.MICROCMS_SERVICE_DOMAIN && env.MICROCMS_API_KEY
    ? createClient({
        serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
        apiKey: env.MICROCMS_API_KEY,
      })
    : null;

/** Build URL → lastmod map from blog posts */
async function buildLastmodMap() {
  if (!cmsClient) return new Map();
  const map = new Map();
  const limit = 100;
  let offset = 0;
  let totalCount = 0;
  do {
    const res = await cmsClient.getList({
      endpoint: 'blogs',
      queries: { limit, offset, fields: ['id', 'slug', 'updatedAt'] },
    });
    for (const post of res.contents) {
      const slug = post.slug || post.id;
      map.set(`https://shishamo-company.com/blog/${slug}/`, post.updatedAt);
    }
    totalCount = res.totalCount;
    offset += limit;
  } while (offset < totalCount);
  return map;
}

const lastmodMap = await buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://shishamo-company.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    icon(),
    sitemap({
      // サイトマップから除外するページ
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/CLAUDE') &&
        !page.includes('/contact/thanks'),
      // 変更頻度と優先度の設定
      serialize(item) {
        // Inject lastmod from microCMS updatedAt
        const lastmod = lastmodMap.get(item.url);
        if (lastmod) {
          item.lastmod = lastmod;
        }

        // トップページ
        if (item.url === 'https://shishamo-company.com/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        }
        // サービス一覧
        else if (item.url === 'https://shishamo-company.com/services/') {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        }
        // サービス詳細
        else if (item.url.includes('/services/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        // ブログ一覧
        else if (item.url.endsWith('/blog/')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        }
        // ブログカテゴリ/タグページ
        else if (
          item.url.includes('/blog/category/') ||
          item.url.includes('/blog/tag/')
        ) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        // ブログ記事
        else if (item.url.includes('/blog/')) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        // その他のページ
        else {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        return item;
      },
    }),
  ],
});
