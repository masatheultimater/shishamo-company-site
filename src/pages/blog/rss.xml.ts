import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllBlogPosts, categoryLabels, getPrimaryCategory } from '../../lib/microcms';

export async function GET(context: APIContext) {
  const posts = await getAllBlogPosts();

  return rss({
    title: 'ブログ | ししゃもカンパニー',
    description: 'DX推進・生成AI・データ活用・経営改善に関するナレッジ・事例・お知らせ',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt || post.metaDescription || post.title,
      link: `/blog/${post.slug || post.id}/`,
    })),
    customData: '<language>ja</language>',
  });
}
