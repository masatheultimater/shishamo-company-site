/**
 * Update microCMS blog articles with rewritten HTML content.
 *
 * Usage: node scripts/update-microcms.mjs [--dry-run]
 *
 * Reads HTML files from blog-rewrite/ and updates the corresponding
 * microCMS blog entries matched by slug.
 */
import { createClient } from 'microcms-js-sdk';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

// ── Config ──────────────────────────────────────────
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN || 'shishamo-company';
const API_KEY = process.env.MICROCMS_API_KEY || '';
const REWRITE_DIR = join(import.meta.dirname, '..', 'blog-rewrite');
const DRY_RUN = process.argv.includes('--dry-run');

// Title updates (from CHANGES.md)
const TITLE_FIXES = {
  'invoice-transition-2026-oct': { from: '確認すべき', to: '確認しておきたい' },
  'denchoho-checklist-sme': { from: 'やるべき', to: 'やっておきたい' },
  'subsidy-list-2026': { from: 'おくべき', to: 'おきたい' },
  'ai-tools-comparison-2026': { from: '入れるべき', to: '入れたい' },
};

if (!API_KEY) {
  console.error('Error: MICROCMS_API_KEY not set. Check .env file.');
  process.exit(1);
}

const client = createClient({ serviceDomain: SERVICE_DOMAIN, apiKey: API_KEY });

// ── Fetch all posts ─────────────────────────────────
async function fetchAllPosts() {
  const posts = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const res = await client.getList({
      endpoint: 'blogs',
      queries: { limit, offset, fields: ['id', 'title', 'slug'] },
    });
    posts.push(...res.contents);
    if (offset + limit >= res.totalCount) break;
    offset += limit;
  }
  return posts;
}

// ── Read rewrite HTML files ─────────────────────────
function loadRewrites() {
  const files = readdirSync(REWRITE_DIR).filter(f => f.endsWith('.html'));
  const rewrites = new Map();
  for (const file of files) {
    const slug = basename(file, '.html');
    const content = readFileSync(join(REWRITE_DIR, file), 'utf-8').trim();
    rewrites.set(slug, content);
  }
  return rewrites;
}

// ── Apply title fix ─────────────────────────────────
function fixTitle(slug, currentTitle) {
  const fix = TITLE_FIXES[slug];
  if (!fix) return null;
  if (!currentTitle.includes(fix.from)) return null;
  return currentTitle.replace(fix.from, fix.to);
}

// ── Main ────────────────────────────────────────────
async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE UPDATE'}\n`);

  // 1. Fetch all posts from microCMS
  console.log('Fetching all blog posts from microCMS...');
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} posts in microCMS.\n`);

  // 2. Load rewrite files
  const rewrites = loadRewrites();
  console.log(`Found ${rewrites.size} rewrite files.\n`);

  // 3. Build slug → post mapping (try slug field, then id)
  const slugToPost = new Map();
  for (const post of posts) {
    const key = post.slug || post.id;
    slugToPost.set(key, post);
  }

  // 4. Match and update
  let updated = 0;
  let skipped = 0;
  const unmatched = [];

  for (const [slug, html] of rewrites) {
    const post = slugToPost.get(slug);
    if (!post) {
      unmatched.push(slug);
      continue;
    }

    const updateData = { content: html };
    const newTitle = fixTitle(slug, post.title);
    if (newTitle) {
      updateData.title = newTitle;
    }

    if (DRY_RUN) {
      console.log(`[DRY] Would update: "${post.title}" (id: ${post.id})`);
      if (newTitle) console.log(`       Title: "${post.title}" → "${newTitle}"`);
      console.log(`       Content: ${html.length} chars`);
      updated++;
    } else {
      try {
        await client.update({
          endpoint: 'blogs',
          contentId: post.id,
          content: updateData,
        });
        console.log(`Updated: "${newTitle || post.title}" (id: ${post.id}, ${html.length} chars)`);
        if (newTitle) console.log(`  Title changed: "${post.title}" → "${newTitle}"`);
        updated++;
        // Rate limiting: microCMS allows 5 req/sec on free plan
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.error(`FAILED: "${post.title}" (id: ${post.id}): ${err.message}`);
        skipped++;
      }
    }
  }

  // 5. Report
  console.log('\n── Summary ──────────────────────────');
  console.log(`Updated: ${updated}`);
  console.log(`Failed:  ${skipped}`);
  if (unmatched.length > 0) {
    console.log(`\nUnmatched slugs (no microCMS post found):`);
    unmatched.forEach(s => console.log(`  - ${s}`));
  }
  console.log('');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
