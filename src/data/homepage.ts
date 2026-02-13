/**
 * Homepage Structured Data
 * Content for the restructured homepage sections.
 */

export interface ProblemItem {
  text: string;
}

export interface YarukotoItem {
  number: string;
  title: string;
  description: string;
}

export interface ServiceCategory {
  title: string;
  items: string[];
  note?: string;
}

export interface CareerHighlight {
  years: string;
  title: string;
  benefit: string;
}

export interface QualificationGroup {
  axis: string;
  items: string[];
}

/** Section 3: Checkbox-style problem items */
export const problemItems: ProblemItem[] = [
  { text: '独立したけど、HPも名刺もまだない' },
  { text: 'デジタル化したいけど、何から手をつければいいかわからない' },
  { text: '数字の管理がどんぶり勘定のまま' },
  { text: '業務が属人化して、自分が倒れたら回らない' },
  { text: 'ITツールを入れたけど、誰も使いこなせていない' },
  { text: '補助金・助成金を使いたいけど、申請が難しそう' },
  { text: '事業承継を考え始めたけど、何を準備すればいいのかわからない' },
];

/** Section 4: What we do (3 cards) */
export const yarukotoItems: YarukotoItem[] = [
  {
    number: '01',
    title: 'まず現状を「見える化」する',
    description:
      '帳簿、業務フロー、売上構成——今どうなっているかを一緒に整理します。見えない状態では正しい判断はできない。まずは数字と事実を揃えるところから。',
  },
  {
    number: '02',
    title: '「回る仕組み」を作る',
    description:
      'ツールを入れて終わりにしません。誰がやっても同じ結果が出るフロー、続けられる運用ルール、その会社の人員と予算で本当に回る形に落とし込みます。',
  },
  {
    number: '03',
    title: 'ITは手段。目的は、御社の困りごとを減らすこと。',
    description:
      'このサイトは Astro + microCMS + Cloudflare で構築しています（年間運用コストはドメイン代だけ）。同じ考え方で、御社にも「必要十分な技術を、最小コストで」提案します。大がかりな改革より、明日から使える改善を。',
  },
];

/** Section 5: Service categories overview */
export const serviceCategories: ServiceCategory[] = [
  {
    title: '経営の伴走支援',
    items: [
      '事業計画の策定、経営数値の分析、経営改善の提案',
      '補助金・助成金の申請支援',
      '事業承継・M&Aの初期相談',
    ],
  },
  {
    title: 'IT・DX支援',
    items: [
      'Webサイトの企画・構築・運用（自社で保守可能な形で）',
      '業務システムの選定・導入・定着支援',
      'データ分析基盤の構築、経営ダッシュボードの作成',
    ],
  },
  {
    title: '財務・会計の整備',
    items: [
      '記帳・月次の仕組みづくり',
      '管理会計の導入、経営判断に使える数字の整備',
      '税務に関する基礎的な相談',
    ],
    note: '※ 税理士資格取得後、税務顧問サービスを開始予定です。現在は税理士科目合格（簿記論）の状態で、法人税法・相続税法を学習中です。',
  },
];

/** Section 6: Career highlights (customer-benefit oriented) */
export const careerHighlights: CareerHighlight[] = [
  {
    years: '12年',
    title: 'Web開発経験',
    benefit:
      'フロントエンドからバックエンド、データベース設計まで。「作れる」だけでなく「なぜこの技術を選ぶべきか」を判断できます。',
  },
  {
    years: '3年',
    title: 'データサイエンス・PM経験',
    benefit:
      'SaaSスタートアップでプロダクト戦略の立案から分析基盤構築まで。データを「集めて終わり」ではなく「経営判断に使える形」にする経験があります。',
  },
  {
    years: '1年',
    title: '会計事務所実務',
    benefit:
      '税務申告、記帳代行の現場を経験。ITだけ・経営だけではなく、財務の実務感覚を持って支援できます。',
  },
];

/** Section 7: Qualifications grouped by 3 axes */
export const qualificationGroups: QualificationGroup[] = [
  {
    axis: '経営がわかる',
    items: ['中小企業診断士（登録予定）'],
  },
  {
    axis: 'ITがわかる',
    items: [
      'ITストラテジスト',
      'データベーススペシャリスト',
      '応用情報技術者',
      'E資格（ディープラーニング）',
    ],
  },
  {
    axis: '数字がわかる',
    items: [
      '税理士科目合格（簿記論）※法人税法・相続税法 学習中',
      'TOEIC 815',
    ],
  },
];
