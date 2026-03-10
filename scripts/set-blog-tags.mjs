/* global process, console */
/**
 * Set phase and concernTags on all microCMS blog articles.
 *
 * Usage: node scripts/set-blog-tags.mjs [--dry-run]
 *
 * Prerequisites:
 *   1. Add phase (select) and concernTags (multi-select) fields to blogs schema
 *   2. Enable PATCH permission on API key
 *   3. Set MICROCMS_API_KEY env var (or .env file)
 */
import { createClient } from 'microcms-js-sdk';

// ── Config ──────────────────────────────────────────
const SERVICE_DOMAIN =
  process.env.MICROCMS_SERVICE_DOMAIN || 'shishamo-company';
const API_KEY = process.env.MICROCMS_API_KEY || '';
const DRY_RUN = process.argv.includes('--dry-run');

if (!API_KEY) {
  console.error('Error: MICROCMS_API_KEY not set.');
  process.exit(1);
}

const client = createClient({ serviceDomain: SERVICE_DOMAIN, apiKey: API_KEY });

// ── Tag mapping ─────────────────────────────────────
// phase: English values matching microCMS select options
// concernTags: Japanese values matching microCMS multi-select options
const SLUG_TAGS = {
  'ai-adoption-pitfalls-sme': { phase: 'change', concernTags: ['業務効率化'] },
  'ai-tools-comparison-2026': { phase: 'change', concernTags: ['業務効率化'] },
  'business-owner-no-one-to-ask': { phase: 'trigger', concernTags: [] },
  'chatgpt-prompts-for-sme': { phase: 'change', concernTags: ['業務効率化'] },
  'data-utilization-honest-guide-sme': {
    phase: 'know',
    concernTags: ['データ活用'],
  },
  'database-thinking-for-sme': { phase: 'know', concernTags: ['データ活用'] },
  'denchoho-checklist-sme': { phase: 'trigger', concernTags: ['制度対応'] },
  'dx-start-sme-30': { phase: 'know', concernTags: ['業務効率化'] },
  'dx-subsidy-guide-2026': { phase: 'trigger', concernTags: ['補助金活用'] },
  'excel-dependency-escape-guide': {
    phase: 'change',
    concernTags: ['業務効率化'],
  },
  'freee-vs-moneyforward': { phase: 'decide', concernTags: ['制度対応'] },
  'invoice-accounting-software-subsidy-2026': {
    phase: 'trigger',
    concernTags: ['制度対応', '補助金活用'],
  },
  'invoice-transition-2026-oct': {
    phase: 'trigger',
    concernTags: ['制度対応'],
  },
  'it-subsidy-application-experience': {
    phase: 'trigger',
    concernTags: ['補助金活用'],
  },
  'it-subsidy-business-plan-guide': {
    phase: 'trigger',
    concernTags: ['補助金活用'],
  },
  'kpi-dashboard-guide': { phase: 'know', concernTags: ['データ活用'] },
  'management-issues-5-steps': { phase: 'decide', concernTags: ['経営整理'] },
  'management-triple-crisis-2026': {
    phase: 'decide',
    concernTags: ['経営整理'],
  },
  'nocode-automation-guide-sme': {
    phase: 'change',
    concernTags: ['業務効率化'],
  },
  'nocode-subsidy-reality': {
    phase: 'trigger',
    concernTags: ['補助金活用', '業務効率化'],
  },
  'sales-data-analysis-for-sme': { phase: 'know', concernTags: ['データ活用'] },
  'simplified-vs-standard-tax-simulation-2026': {
    phase: 'decide',
    concernTags: ['制度対応'],
  },
  'subsidy-application-guide': {
    phase: 'trigger',
    concernTags: ['補助金活用'],
  },
  'subsidy-list-2026': { phase: 'trigger', concernTags: ['補助金活用'] },
};

// ── Main ────────────────────────────────────────────
async function main() {
  // Fetch all posts
  const allPosts = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await client.getList({
      endpoint: 'blogs',
      queries: { limit, offset, fields: ['id', 'slug', 'title'] },
    });
    allPosts.push(...res.contents);
    if (allPosts.length >= res.totalCount) break;
    offset += limit;
  }

  console.log(`Found ${allPosts.length} articles.\n`);

  let updated = 0;
  let skipped = 0;

  for (const post of allPosts) {
    const slug = post.slug || post.id;
    const tags = SLUG_TAGS[slug];

    if (!tags) {
      console.log(`  SKIP  ${slug} (no mapping)`);
      skipped++;
      continue;
    }

    const updateData = {
      phase: [tags.phase],
      ...(tags.concernTags.length > 0 ? { concernTags: tags.concernTags } : {}),
    };

    if (DRY_RUN) {
      console.log(
        `  DRY   ${slug} → phase=${tags.phase}, concernTags=[${tags.concernTags.join(', ')}]`
      );
    } else {
      try {
        await client.update({
          endpoint: 'blogs',
          contentId: post.id,
          content: updateData,
        });
        console.log(
          `  OK    ${slug} → phase=${tags.phase}, concernTags=[${tags.concernTags.join(', ')}]`
        );
        updated++;
      } catch (err) {
        console.error(`  FAIL  ${slug}: ${err.message}`);
      }
    }
  }

  console.log(
    `\nDone. Updated: ${updated}, Skipped: ${skipped}${DRY_RUN ? ' (dry run)' : ''}`
  );
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
