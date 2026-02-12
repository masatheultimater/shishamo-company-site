/**
 * Upload blog articles to microCMS
 * Usage: node scripts/upload-articles.mjs
 */
import { readFileSync } from 'fs';
import { marked } from 'marked';
import https from 'https';

const SERVICE_DOMAIN = 'shishamo-company';
const API_KEY = process.env.MICROCMS_API_KEY;
if (!API_KEY) {
  console.error('Error: MICROCMS_API_KEY environment variable is required');
  process.exit(1);
}

// Article definitions
const articles = [
  {
    num: 11,
    title: '中小企業のAI導入で失敗しないために｜よくある5つの落とし穴と対策',
    slug: 'ai-adoption-pitfalls-sme',
    category: ['テクノロジー'],
    tags: ['ChatGPT', 'Claude', '業務自動化'],
    excerpt: '中小企業のAI導入、体感で7割は「入れただけ」で終わっている。5つの失敗パターンと具体的な対策を、成功・失敗事例を交えて解説。',
  },
  {
    num: 12,
    title: 'ノーコードで始める業務自動化｜中小企業の現実的な活用法と限界',
    slug: 'nocode-automation-guide-sme',
    category: ['テクノロジー'],
    tags: ['業務自動化', '生産性向上'],
    excerpt: 'ノーコードツールは万能じゃない。「作れるもの」と「作るべきでないもの」の判断基準、成功パターン3つ、正直な限界をまとめました。',
  },
  {
    num: 15,
    title: '生成AI、登録しただけで使ってない社長さんへ｜今日から使える活用法3選',
    slug: 'genai-practical-guide-executives',
    category: ['生成AI'],
    tags: ['ChatGPT', '生産性向上', '業務自動化'],
    excerpt: '生成AIは社長が自分で使う必要はない。社員の誰か1人が1つの業務で使えれば月10時間浮く。「部下に渡せる」活用法を3つ紹介。',
  },
  {
    num: 16,
    title: '電子帳簿保存法、「猶予」で2年引っ張っていませんか？｜3ステップ対応ガイド',
    slug: 'denchoho-grace-period-warning',
    category: ['経理・税務'],
    tags: ['freee'],
    excerpt: '「まだ紙で回している」会社にとって、2026年は言い訳が通用しない最初の年。3ステップに絞った対応チェックリストで、3日あれば終わる電帳法対応を解説。',
  },
  {
    num: 17,
    title: '「IT導入補助金」が見つからない理由──2026年「デジタル化・AI導入補助金」詳細解説',
    slug: 'digital-ai-subsidy-guide-2026',
    category: ['経営'],
    tags: ['補助金・助成金', '業務自動化'],
    excerpt: 'IT導入補助金は名称変更で「デジタル化・AI導入補助金」に。予算3,400億円、最大450万円の補助。知らないだけで損をしている制度を徹底解説。',
  },
  {
    num: 18,
    title: '人手不足×賃上げ×物価高──2026年"経営の三重苦"を乗り越える5つの打ち手',
    slug: 'management-triple-crisis-2026',
    category: ['経営'],
    tags: ['生産性向上', 'KPI管理'],
    excerpt: '人手不足65.6%、賃上げ疲れ倒産3.1倍増、価格転嫁できない利益率低下。互いに絡み合う三重苦を「戦える構造」に変える5つの打ち手を解説。',
  },
];

function extractContent(markdown) {
  // Remove header lines (# Article N: ..., > Design..., ---)
  const lines = markdown.split('\n');
  let startIdx = 0;
  let dashCount = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      dashCount++;
      if (dashCount === 1) {
        startIdx = i + 1;
        break;
      }
    }
  }

  const content = lines.slice(startIdx).join('\n').trim();
  return content;
}

function markdownToHtml(md) {
  // Convert markdown to HTML
  let html = marked.parse(md, { breaks: false, gfm: true });

  // Fix checklist items: - [ ] text -> checkbox HTML
  html = html.replace(
    /<li>\[ \] /g,
    '<li style="list-style:none"><input type="checkbox" disabled> '
  );

  return html;
}

async function createPost(article) {
  const filePath = `.claude/docs/article-designs/article-${String(article.num).padStart(2, '0')}-content.md`;
  const markdown = readFileSync(filePath, 'utf-8');
  const content = extractContent(markdown);
  const html = markdownToHtml(content);

  const postData = JSON.stringify({
    title: article.title,
    slug: article.slug,
    category: article.category,
    tags: article.tags,
    excerpt: article.excerpt,
    content: html,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${SERVICE_DOMAIN}.microcms.io`,
      path: '/api/v1/blogs',
      method: 'POST',
      headers: {
        'X-MICROCMS-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 201) {
          const result = JSON.parse(data);
          resolve({ success: true, id: result.id, slug: article.slug, title: article.title });
        } else {
          resolve({ success: false, status: res.statusCode, error: data, slug: article.slug, title: article.title });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log(`Uploading ${articles.length} articles to microCMS...`);
  console.log('');

  for (const article of articles) {
    try {
      const result = await createPost(article);
      if (result.success) {
        console.log(`✅ #${article.num} [${result.id}] ${result.slug} — ${result.title}`);
      } else {
        console.log(`❌ #${article.num} ${result.slug} — ${result.title}`);
        console.log(`   Status: ${result.status}, Error: ${result.error}`);
      }
    } catch (err) {
      console.log(`❌ #${article.num} ${article.slug} — Error: ${err.message}`);
    }
  }

  console.log('');
  console.log('Done. Verify at: https://shishamo-company.microcms.io/');
}

main();
