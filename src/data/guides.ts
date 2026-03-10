/**
 * Guide Data
 * Reading paths for 5 concern-based guides.
 * Guide = ordered reading path; Category = classification label. They coexist.
 */

import type { ConcernTag } from '@shared/contracts/api';

export interface GuideStep {
  articleSlug: string;
  title: string;
  summary: string;
}

export interface GuideData {
  slug: ConcernTag;
  title: string;
  description: string;
  metaDescription: string;
  icon: string;
  steps: GuideStep[];
}

export const guides: GuideData[] = [
  {
    slug: 'tax',
    title: '制度が変わって困ったら',
    description:
      'インボイス制度や電子帳簿保存法など、制度変更への対応を順番に整理します。',
    metaDescription:
      'インボイス制度・電子帳簿保存法など、中小企業が対応すべき制度変更を順番に整理。何から始めればいいかわかるガイド。',
    icon: 'ri:file-list-3-line',
    steps: [
      {
        articleSlug: 'invoice-transition-2026-oct',
        title: 'インボイス制度の全体像を把握する',
        summary: '2026年10月の変更点と、対応のタイムライン。',
      },
      {
        articleSlug: 'simplified-vs-standard-tax-simulation-2026',
        title: '簡易課税 vs 本則課税をシミュレーションする',
        summary: '業種別の試算で、どちらが有利か判断する。',
      },
      {
        articleSlug: 'denchoho-checklist-sme',
        title: '電子帳簿保存法のチェックリストで対応する',
        summary: '最低限やるべきことを確認して、一つずつ片付ける。',
      },
      {
        articleSlug: 'freee-vs-moneyforward',
        title: '会計ソフトを選ぶ',
        summary: 'freee vs マネーフォワード、自社に合う方を見極める。',
      },
      {
        articleSlug: 'invoice-accounting-software-subsidy-2026',
        title: '会計ソフト導入を補助金でカバーする',
        summary: 'インボイス対応のコストを抑える制度活用。',
      },
    ],
  },
  {
    slug: 'data',
    title: '会社を数字で見たい',
    description:
      '「なんとなく」の経営を卒業して、データで現状を把握し、次の一手を考えます。',
    metaDescription:
      'どんぶり勘定を卒業したい中小企業向け。データ活用の基本から、KPIダッシュボード構築まで順番に解説。',
    icon: 'ri:bar-chart-box-line',
    steps: [
      {
        articleSlug: 'data-utilization-honest-guide-sme',
        title: 'データ活用の実態を知る',
        summary: '中小企業のデータ活用、理想と現実のギャップ。',
      },
      {
        articleSlug: 'database-thinking-for-sme',
        title: 'データベース思考を身につける',
        summary: '散らばった情報を整理するための考え方。',
      },
      {
        articleSlug: 'sales-data-analysis-for-sme',
        title: '顧客データを売上につなげる',
        summary: '持っているデータから、次のアクションを見つける。',
      },
      {
        articleSlug: 'kpi-dashboard-guide',
        title: 'KPIダッシュボードを作る',
        summary: '数字を「見える化」して、定期的にチェックする仕組み。',
      },
    ],
  },
  {
    slug: 'efficiency',
    title: '業務をもっと楽にしたい',
    description:
      'Excel依存や手作業の多い業務を、段階的にデジタル化・自動化します。',
    metaDescription:
      'Excel依存や属人化した業務を段階的に改善。ノーコードツールやAI活用まで、中小企業の業務効率化ガイド。',
    icon: 'ri:speed-line',
    steps: [
      {
        articleSlug: 'excel-dependency-escape-guide',
        title: 'Excel依存の現状を整理する',
        summary: 'どこがボトルネックかを見極める。',
      },
      {
        articleSlug: 'nocode-automation-guide-sme',
        title: 'ノーコードで業務を自動化する',
        summary: 'プログラミング不要で始められる自動化の選択肢。',
      },
      {
        articleSlug: 'chatgpt-prompts-for-sme',
        title: 'ChatGPTを業務に取り入れる',
        summary: '過度な期待を持たずに、実用的な使い方を知る。',
      },
      {
        articleSlug: 'ai-tools-comparison-2026',
        title: 'AIツールを比較して選ぶ',
        summary: '目的別に、どのツールが合うか判断する。',
      },
      {
        articleSlug: 'ai-adoption-pitfalls-sme',
        title: 'AI導入の落とし穴を避ける',
        summary: '失敗パターンを知って、同じ轍を踏まない。',
      },
    ],
  },
  {
    slug: 'management',
    title: '経営の方向性を整理したい',
    description:
      '漠然とした不安を具体的な課題に変えて、優先順位をつけて動き出します。',
    metaDescription:
      '経営の方向性が定まらない中小企業向け。課題の整理から優先順位づけまで、3ステップで考えるガイド。',
    icon: 'ri:compass-3-line',
    steps: [
      {
        articleSlug: 'management-triple-crisis-2026',
        title: '中小企業が直面する3つの危機を知る',
        summary: '人手不足・デジタル化・制度変更の三重苦を俯瞰する。',
      },
      {
        articleSlug: 'management-issues-5-steps',
        title: '経営課題をステップで整理する',
        summary: '何が問題で、何から手をつけるべきかを決める。',
      },
    ],
  },
  {
    slug: 'subsidy',
    title: '補助金を使いたい',
    description:
      '使える制度を見つけて、申請の準備から活用までを順番に進めます。',
    metaDescription:
      'DX補助金・IT導入補助金・持続化補助金など、中小企業が使える補助金を整理。申請準備から活用まで順番に解説。',
    icon: 'ri:money-cny-circle-line',
    steps: [
      {
        articleSlug: 'subsidy-application-guide',
        title: '補助金申請の全体像を知る',
        summary: '申請の流れと、準備すべきものの全体像。',
      },
      {
        articleSlug: 'dx-subsidy-guide-2026',
        title: 'DX補助金の詳細を確認する',
        summary: 'DX推進に使える補助金の要件と申請方法。',
      },
      {
        articleSlug: 'it-subsidy-business-plan-guide',
        title: 'IT導入補助金の事業計画を作る',
        summary: '採択率を上げる事業計画書のポイント。',
      },
      {
        articleSlug: 'invoice-accounting-software-subsidy-2026',
        title: 'インボイス対応×補助金を活用する',
        summary: '会計ソフト導入を補助金でカバーする方法。',
      },
    ],
  },
];

/** Get a single guide by slug */
export function getGuide(slug: string): GuideData | undefined {
  return guides.find((g) => g.slug === slug);
}
