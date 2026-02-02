// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yoshikawa-masahiro.com',
  output: 'static',
  integrations: [
    sitemap({
      // サイトマップから除外するページ
      filter: (page) => !page.includes('/404'),
      // 変更頻度と優先度の設定
      serialize(item) {
        // トップページ
        if (item.url === 'https://yoshikawa-masahiro.com/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        }
        // サービス一覧
        else if (item.url === 'https://yoshikawa-masahiro.com/services/') {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        }
        // サービス詳細
        else if (item.url.includes('/services/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
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
