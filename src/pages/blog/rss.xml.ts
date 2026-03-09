import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import {
  getAllBlogPosts,
  categoryLabels,
  tagLabels,
  getPrimaryCategory,
} from '../../lib/microcms';
import type { BlogTag } from '@shared/contracts/api';

export async function GET(context: APIContext) {
  const posts = await getAllBlogPosts();

  return rss({
    title: 'ブログ | ししゃもカンパニー',
    description:
      'IT・経営・会計の「で、うちはどうすればいい？」に答えるブログ。個人事業主・中小企業の方に向けて、わかりやすく書いています。',
    site: context.site!.toString(),
    items: posts.map((post) => {
      const cat = getPrimaryCategory(post.category);
      return {
        title: post.title,
        pubDate: new Date(post.publishedAt),
        description: post.excerpt || post.metaDescription || post.title,
        link: `/blog/${post.slug || post.id}/`,
        categories: [
          categoryLabels[cat],
          ...(post.tags || []).map((t) => tagLabels[t as BlogTag] || t),
        ],
      };
    }),
    customData: '<language>ja</language>',
  });
}
