/**
 * Bulk upload blog articles to microCMS as drafts
 *
 * Prerequisites:
 * 1. Add POST permission to your microCMS API key (or create a write-enabled key)
 * 2. Set environment variables in .env:
 *    - MICROCMS_SERVICE_DOMAIN
 *    - MICROCMS_API_KEY (with POST permission)
 *
 * Usage: npm run upload-articles
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const CONTENT_DIR = resolve(PROJECT_ROOT, '.claude/docs/article-designs');

// ========================================
// Configuration
// ========================================

function loadEnv() {
  const envPath = resolve(PROJECT_ROOT, '.env');
  if (!existsSync(envPath)) {
    console.error('ERROR: .env file not found. Create one with MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
    process.exit(1);
  }

  const envContent = readFileSync(envPath, 'utf-8');
  const vars = {};
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

const env = loadEnv();
const SERVICE_DOMAIN = env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = env.MICROCMS_API_KEY;

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error('ERROR: MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set in .env');
  process.exit(1);
}

const API_BASE = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs`;

// ========================================
// Article metadata (from design files)
// ========================================

const ARTICLES = [
  {
    num: '01',
    title: '「DXって何から？」従業員30名の会社が最初にやるべき3つのこと',
    slug: 'dx-start-sme-30',
    category: ['dx'],
    tags: ['automation', 'productivity'],
    excerpt: 'DXの9割は「Excelをやめる」だけで済む。従業員30名規模の会社が最初にやるべき3つのことを、業務棚卸しチェックリスト付きで解説。100人超の会社は別の話。',
    metaDescription: '従業員30名の中小企業向けDXの始め方。業務棚卸しチェックリスト付きで「最初の3つ」に絞って解説。DX推進サポートの専門家が、30名規模の具体例で自分ごと化できるように伝えます。',
  },
  {
    num: '02',
    title: '「IT導入補助金」が消えた？2026年「デジタル化・AI導入補助金」で最大450万円もらう方法',
    slug: 'dx-subsidy-guide-2026',
    category: ['dx'],
    tags: ['subsidy', 'automation'],
    excerpt: 'IT導入補助金が「デジタル化・AI導入補助金」に名称変更。予算3,400億円、最大450万円。でも2025年の採択率は37%まで下がった。通る申請書の書き方と、やってはいけない3つのミスを解説。',
    metaDescription: '2026年「デジタル化・AI導入補助金」(旧IT導入補助金)の申請ガイド。予算3,400億円・最大450万円・補助率最大4/5。通常枠・インボイス枠・セキュリティ枠の違い、申請スケジュール、採択率を上げるポイントを中小企業診断士が解説。',
  },
  {
    num: '03',
    title: '中小企業のChatGPT活用術｜明日から使えるプロンプト10選',
    slug: 'chatgpt-prompts-for-sme',
    category: ['ai'],
    tags: ['chatgpt', 'productivity', 'automation'],
    excerpt: '「ChatGPT、登録はしたけど結局使ってない」——そんな中小企業の管理部門・経営者向けに、コピペで即使えるプロンプト10個を厳選。営業メール、議事録、経理まで。',
    metaDescription: '中小企業向けChatGPTプロンプト10選。営業メール・議事録要約・経理補助など、コピペで明日から使える実用プロンプトを業務別に紹介。Before/After時間比較付き。',
  },
  {
    num: '04',
    title: 'ChatGPT・Claude・Gemini｜中小企業が最初に入れるべきAIはどれか',
    slug: 'ai-tools-comparison-2026',
    category: ['ai'],
    tags: ['chatgpt', 'claude'],
    excerpt: '3つとも仕事で毎日使っている立場から断言します。中小企業が最初に入れるべきは ChatGPT。ただし文書分析ならClaude、Google Workspace派ならGemini。料金・セキュリティ・得意分野を比較。',
    metaDescription: 'ChatGPT・Claude・Geminiを業務で毎日使う立場から中小企業向けに比較。料金・セキュリティ・得意分野を一覧表で整理し、「最初の1つ」を断言。2026年2月最新の料金情報。',
  },
  {
    num: '05',
    title: '売上データを「見てるだけ」になっていませんか？経営に活かす分析の始め方',
    slug: 'sales-data-analysis-for-sme',
    category: ['data'],
    tags: ['kpi', 'productivity'],
    excerpt: '売上レポートを「確認」して終わっていませんか。顧客別・商品別・地域別・時系列・利益率の5視点で切るだけで、Excelの売上データが経営判断の武器になる。元データサイエンティスト×会計事務所経験の著者が、テンプレート付きで解説。',
    metaDescription: '中小企業向け売上データ分析の始め方。顧客別・商品別・地域別・時系列・利益率の5視点をExcelテンプレート付きで解説。会計×データサイエンスの視点から、経営に活かせる分析手法を紹介。',
  },
  {
    num: '06',
    title: 'KPIダッシュボード導入で月次会議が変わった──進め方と注意点',
    slug: 'kpi-dashboard-guide',
    category: ['data'],
    tags: ['kpi', 'cloud-accounting'],
    excerpt: '月次会議で毎回「この数字どこ？」から始まっていませんか。60名規模のサービス業がKPIダッシュボードを導入したら、会議時間が半分に、意思決定のスピードが3倍になった。30万円〜の始め方と、私が過去にやらかした失敗を正直に書きます。',
    metaDescription: '中小企業向けKPIダッシュボード導入ガイド。60名規模の実例でBefore/Afterを紹介。月次会議の時間半減、意思決定3倍速の具体的な進め方。freee・マネーフォワード連携の実装方法と30万円〜のコスト感。',
  },
  {
    num: '07',
    title: '「何から手をつければ？」漠然とした経営課題を整理する5ステップ',
    slug: 'management-issues-5-steps',
    category: ['management'],
    tags: ['kpi', 'productivity'],
    excerpt: '課題が山積み。何から手をつければいいかわからない。そんな2代目社長のために、漠然とした経営課題をワークシート形式で整理する5ステップを紹介。書き出す→分類→因果関係→マッピング→1つ決める。',
    metaDescription: '経営課題の整理方法を5ステップで解説。中小企業の2代目社長向け。漠然とした不安を書き出し、分類し、因果関係を見抜き、優先度マップで可視化し、最初の1つを決める。ワークシート形式で実践可能。',
  },
  {
    num: '08',
    title: '経営者が知っておくべき補助金・助成金一覧｜2026年度の最新制度を解説',
    slug: 'subsidy-list-2026',
    category: ['accounting'],
    tags: ['subsidy', 'startup'],
    excerpt: '「うちにも使える補助金があるはず」。2026年度の主要4補助金を、やりたいこと別のフローチャートと比較一覧表で整理。金額・採択率・スケジュールまで全部載せます。',
    metaDescription: '2026年度の中小企業向け主要補助金を一覧で比較。ものづくり補助金・持続化補助金・省力化投資補助金・デジタル化AI導入補助金の金額・採択率・スケジュールを、目的別フローチャートで解説。吉川昌宏事務所。',
  },
  {
    num: '09',
    title: 'freee vs マネーフォワード｜中小企業が後悔しない会計ソフトの選び方',
    slug: 'freee-vs-moneyforward',
    category: ['accounting'],
    tags: ['cloud-accounting', 'freee', 'bookkeeping'],
    excerpt: '会計事務所でfreeeもマネーフォワードも使っていた経験から断言します。簿記知識ゼロの社長にはfreee。経理担当がいるならマネーフォワード。3つの軸で「御社にはどっち」を判定。',
    metaDescription: '会計事務所でfreee・マネーフォワード両方を使った経験から、簿記レベル別/業種別/税理士連携別に比較。弥生からの移行手順・スケジュールも。中小企業が後悔しないクラウド会計の選び方。',
  },
  {
    num: '10',
    title: '電子帳簿保存法、まだ対応してない？中小企業がやるべきことチェックリスト',
    slug: 'denchoho-checklist-sme',
    category: ['accounting'],
    tags: ['cloud-accounting', 'tax', 'freee'],
    excerpt: '中小企業の6割がまだ未対応。「相当の理由」の猶予もいつ終わるかわからない。最低限やるべきこと、最小コストでの対応手順をチェックリスト形式でまとめました。',
    metaDescription: '電子帳簿保存法の中小企業向けチェックリスト。2026年完全適用後も6割が未対応。猶予措置の現状、最小コスト対応手順、重加算税リスクまでわかりやすく解説。',
  },
  {
    num: '13',
    title: 'エンジニア12年→会計事務所→中小企業診断士。なぜ全部やったのか',
    slug: 'about',
    category: ['news'],
    tags: ['startup'],
    excerpt: '祖父の印刷会社を救えなかった。ITも経営も財務も何も知らなかった。だから全部学んだ。提案で終わらず最後まで手を動かす、新しいスタイルの中小企業支援を始めます。',
    metaDescription: 'Web開発12年・会計事務所・中小企業診断士試験合格。3つの領域を横断してきた理由は、祖父の会社を救えなかった原体験。提案だけでなく実装まで伴走するDX・データ活用・経営支援。吉川昌宏事務所。',
  },
  {
    num: '14',
    title: '【2026年10月】インボイスの経過措置が変わる｜中小企業が今すぐ確認すべき3つのこと',
    slug: 'invoice-transition-2026-oct',
    category: ['news'],
    tags: ['tax', 'cloud-accounting', 'bookkeeping'],
    excerpt: '2割特例が終了し、免税事業者との取引の控除率が80%→70%に。法人には3割特例も適用されない。「うちはいくら影響あるの？」をシミュレーション付きで解説。',
    metaDescription: '2026年10月インボイス経過措置変更を中小企業向けに解説。2割特例終了、控除率80%→70%への影響を納税額シミュレーション付きで。法人は3割特例対象外の注意点も。',
  },
];

// ========================================
// Content parsing
// ========================================

/**
 * Read content file and strip the header (everything before first ---)
 * Content files have format:
 *   # Article N: 記事本文...
 *   > Design: ...
 *   > Voice: ...
 *   ---
 *   [actual content starts here]
 */
function readContentFile(articleNum) {
  const filePath = resolve(CONTENT_DIR, `article-${articleNum}-content.md`);
  if (!existsSync(filePath)) {
    console.warn(`  WARNING: Content file not found: article-${articleNum}-content.md`);
    return null;
  }

  const raw = readFileSync(filePath, 'utf-8');

  // Find the first --- separator and take everything after it
  const separatorIndex = raw.indexOf('\n---\n');
  if (separatorIndex === -1) {
    // No separator found, use entire content
    return raw;
  }

  return raw.slice(separatorIndex + 5); // skip \n---\n
}

/**
 * Convert Markdown to HTML using marked
 */
function markdownToHtml(markdown) {
  return marked.parse(markdown, { async: false });
}

// ========================================
// microCMS API
// ========================================

async function createDraft(article, htmlContent) {
  const body = {
    title: article.title,
    slug: article.slug,
    category: article.category,
    tags: article.tags,
    excerpt: article.excerpt,
    metaDescription: article.metaDescription,
    content: htmlContent,
  };

  const response = await fetch(`${API_BASE}?status=draft`, {
    method: 'POST',
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================================
// Main
// ========================================

async function main() {
  console.log(`\n=== microCMS Blog Article Bulk Upload ===`);
  console.log(`Target: ${API_BASE}`);
  console.log(`Articles: ${ARTICLES.length}\n`);

  const results = { success: [], failed: [], skipped: [] };

  for (const article of ARTICLES) {
    const label = `Article ${article.num}: ${article.slug}`;
    process.stdout.write(`[${article.num}] ${article.slug} ... `);

    // Read and parse content
    const markdown = readContentFile(article.num);
    if (!markdown) {
      console.log('SKIPPED (no content file)');
      results.skipped.push(label);
      continue;
    }

    const html = markdownToHtml(markdown);
    if (!html || html.trim().length === 0) {
      console.log('SKIPPED (empty HTML)');
      results.skipped.push(label);
      continue;
    }

    // Upload to microCMS
    try {
      const result = await createDraft(article, html);
      console.log(`OK (id: ${result.id})`);
      results.success.push({ label, id: result.id });
    } catch (error) {
      console.log(`FAILED: ${error.message}`);
      results.failed.push({ label, error: error.message });
    }

    // Rate limiting: 1 request per second
    await sleep(1000);
  }

  // Summary
  console.log('\n=== Results ===');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed:  ${results.failed.length}`);
  console.log(`Skipped: ${results.skipped.length}`);

  if (results.success.length > 0) {
    console.log('\nCreated drafts:');
    for (const s of results.success) {
      console.log(`  ${s.label} -> ${s.id}`);
    }
  }

  if (results.failed.length > 0) {
    console.log('\nFailed:');
    for (const f of results.failed) {
      console.log(`  ${f.label}: ${f.error}`);
    }
  }

  if (results.skipped.length > 0) {
    console.log('\nSkipped:');
    for (const s of results.skipped) {
      console.log(`  ${s}`);
    }
  }

  // Exit with error code if any failures
  if (results.failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('\nFatal error:', error);
  process.exit(1);
});
