// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://shishamo-company.com',
  output: 'static',
  integrations: [
    sitemap({
      // サイトマップから除外するページ
      filter: (page) => !page.includes('/404') && !page.includes('/CLAUDE'),
      // 変更頻度と優先度の設定
      serialize(item) {
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
