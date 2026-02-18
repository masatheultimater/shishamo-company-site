/**
 * 簡易経営診断 — Question tree data
 *
 * Architecture: Flat Record<string, DiagnosticNode> map.
 * Each node is either a 'question' (with answers pointing to next node IDs)
 * or a 'result' (with recommended service IDs from serviceData).
 *
 * Tree structure: max 3 levels deep, 10 unique questions, 16 result patterns.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DiagnosticAnswer {
  text: string;
  /** ID of the next node (question or result) */
  nextId: string;
}

export interface DiagnosticQuestion {
  type: 'question';
  id: string;
  text: string;
  hint?: string;
  answers: DiagnosticAnswer[];
}

export interface DiagnosticResult {
  type: 'result';
  id: string;
  title: string;
  description: string;
  /** Service IDs from serviceData — ordered by relevance */
  recommendedServices: string[];
  /** Pre-fill text for contact form textarea */
  contactPreFill: string;
}

export type DiagnosticNode = DiagnosticQuestion | DiagnosticResult;

// ---------------------------------------------------------------------------
// Tree Data
// ---------------------------------------------------------------------------

export const diagnosticTree: Record<string, DiagnosticNode> = {
  // =========================================================================
  // Level 1
  // =========================================================================
  q1: {
    type: 'question',
    id: 'q1',
    text: '今、事業で一番モヤモヤしていることは？',
    answers: [
      { text: '売上・利益が思うように伸びない', nextId: 'q2-biz' },
      { text: 'ITやデジタル化が遅れている気がする', nextId: 'q2-it' },
      { text: 'お金まわり（経理・会計）がごちゃごちゃ', nextId: 'q2-acc' },
      { text: '正直、何が問題なのかよくわからない', nextId: 'q2-unclear' },
    ],
  },

  // =========================================================================
  // Level 2 — Business
  // =========================================================================
  'q2-biz': {
    type: 'question',
    id: 'q2-biz',
    text: 'もう少し教えてください。どれが近いですか？',
    answers: [
      {
        text: '数字は見ているが、どこを改善すべきかわからない',
        nextId: 'q3-biz-data',
      },
      {
        text: '感覚で経営していて、データ化されていない',
        nextId: 'r-mgmt-kpi',
      },
      { text: '投資したいが資金が足りない', nextId: 'q3-biz-fund' },
      { text: '新しい事業や商品を考えたい', nextId: 'r-mgmt' },
    ],
  },

  // =========================================================================
  // Level 2 — IT
  // =========================================================================
  'q2-it': {
    type: 'question',
    id: 'q2-it',
    text: 'どんな状態ですか？',
    answers: [
      {
        text: '「DX」と言われても何から手をつけていいかわからない',
        nextId: 'q3-it-start',
      },
      {
        text: 'AIを使いたいが、何ができるかわからない',
        nextId: 'q3-it-ai',
      },
      { text: '業務が手作業ばかりで非効率', nextId: 'q3-it-ops' },
      { text: 'ウェブサイトがない、または古い', nextId: 'r-web' },
    ],
  },

  // =========================================================================
  // Level 2 — Accounting
  // =========================================================================
  'q2-acc': {
    type: 'question',
    id: 'q2-acc',
    text: '具体的には？',
    answers: [
      { text: '記帳が追いつかない、たまっている', nextId: 'r-bookkeeping' },
      {
        text: '会計ソフトを使いたいが導入方法がわからない',
        nextId: 'r-cloud-acc',
      },
      {
        text: '経理の数字と経営判断がつながっていない',
        nextId: 'r-cloud-acc-kpi',
      },
      {
        text: '税金や資金繰りのことを相談できる人がいない',
        nextId: 'r-bookkeeping-mgmt',
      },
    ],
  },

  // =========================================================================
  // Level 2 — Unclear
  // =========================================================================
  'q2-unclear': {
    type: 'question',
    id: 'q2-unclear',
    text: '一番近い状態はどれですか？',
    answers: [
      { text: '忙しいのに利益が残らない', nextId: 'r-mgmt-kpi' },
      {
        text: '他社がIT化しているなか、取り残されている気がする',
        nextId: 'r-it-strategy',
      },
      {
        text: '人に任せきりで、数字を把握できていない',
        nextId: 'r-cloud-acc-kpi',
      },
      {
        text: 'やりたいことはあるが、時間も知識も足りない',
        nextId: 'r-mgmt',
      },
    ],
  },

  // =========================================================================
  // Level 3 — Business × Data
  // =========================================================================
  'q3-biz-data': {
    type: 'question',
    id: 'q3-biz-data',
    text: 'データをどう扱っていますか？',
    answers: [
      {
        text: 'Excelに数字はあるが、分析できていない',
        nextId: 'r-data',
      },
      {
        text: 'そもそもデータを集める仕組みがない',
        nextId: 'r-kpi',
      },
      {
        text: '分析はしているが、施策に落とせない',
        nextId: 'r-mgmt-data',
      },
    ],
  },

  // =========================================================================
  // Level 3 — Business × Funding
  // =========================================================================
  'q3-biz-fund': {
    type: 'question',
    id: 'q3-biz-fund',
    text: '補助金は検討したことありますか？',
    answers: [
      {
        text: '聞いたことはあるが、よくわからない',
        nextId: 'r-subsidy',
      },
      {
        text: '申請しようとしたが、途中で挫折した',
        nextId: 'r-subsidy',
      },
      {
        text: '自己資金で進めたいが、何に投資すべきか迷っている',
        nextId: 'r-mgmt',
      },
    ],
  },

  // =========================================================================
  // Level 3 — IT × Getting Started
  // =========================================================================
  'q3-it-start': {
    type: 'question',
    id: 'q3-it-start',
    text: '今のIT環境はどんな感じですか？',
    answers: [
      {
        text: 'ほぼ紙・Excel・電話で回している',
        nextId: 'r-dx',
      },
      {
        text: 'ツールは入れたが使いこなせていない',
        nextId: 'r-it-strategy',
      },
      {
        text: 'やりたいことはあるが、社内にITがわかる人がいない',
        nextId: 'r-it-strategy-dx',
      },
    ],
  },

  // =========================================================================
  // Level 3 — IT × AI
  // =========================================================================
  'q3-it-ai': {
    type: 'question',
    id: 'q3-it-ai',
    text: 'AIで何をしたいですか？',
    answers: [
      {
        text: '社内の業務を効率化したい（議事録、資料作成、データ整理など）',
        nextId: 'r-ai-tools',
      },
      {
        text: 'AIを使った新サービスや商品を作りたい',
        nextId: 'r-ai-consulting',
      },
      {
        text: 'まず何ができるか知りたい',
        nextId: 'r-ai-consulting',
      },
    ],
  },

  // =========================================================================
  // Level 3 — IT × Manual Operations
  // =========================================================================
  'q3-it-ops': {
    type: 'question',
    id: 'q3-it-ops',
    text: 'どんな業務が手作業ですか？',
    answers: [
      {
        text: 'データ入力・集計・レポート作成',
        nextId: 'r-ai-tools',
      },
      {
        text: '受発注・請求・在庫管理',
        nextId: 'r-dx',
      },
      {
        text: '全体的に紙とExcelが多い',
        nextId: 'r-dx',
      },
    ],
  },

  // =========================================================================
  // Results
  // =========================================================================

  'r-mgmt': {
    type: 'result',
    id: 'r-mgmt',
    title: '経営の「壁打ち相手」が必要です',
    description:
      'やりたいことや漠然とした課題を、一緒に整理するところから始めましょう。事業計画の見直しや新規事業の検討を、外部の視点を交えて進められます。',
    recommendedServices: ['management-consulting'],
    contactPreFill: '経営の方向性について相談したいです。',
  },

  'r-mgmt-kpi': {
    type: 'result',
    id: 'r-mgmt-kpi',
    title: '「数字で経営を見る仕組み」が足りていません',
    description:
      '感覚に頼らず、売上・利益・コストを見える化することで、打ち手が明確になります。KPIダッシュボードで毎月の数字を自動集計し、経営判断をデータで裏付けましょう。',
    recommendedServices: ['management-consulting', 'kpi-dashboard'],
    contactPreFill:
      '経営数字の見える化について相談したいです。現在、データ化されていない状態です。',
  },

  'r-mgmt-data': {
    type: 'result',
    id: 'r-mgmt-data',
    title: 'データはある。あとは「使い方」です',
    description:
      '分析結果を具体的な施策につなげるには、経営の視点とデータの視点の両方が必要です。数字の読み方から改善アクションの設計まで一緒に取り組みましょう。',
    recommendedServices: ['management-consulting', 'data-analysis'],
    contactPreFill:
      'データ分析はしていますが、施策に落とし込めていません。経営判断とつなげたいです。',
  },

  'r-data': {
    type: 'result',
    id: 'r-data',
    title: 'Excelのデータ、活かしきれていませんね',
    description:
      'Excelに眠っているデータを分析・可視化することで、「どこに手を打てばいいか」が見えてきます。まずは今あるデータの棚卸しから始めましょう。',
    recommendedServices: ['data-analysis', 'kpi-dashboard'],
    contactPreFill:
      'Excelにデータはありますが、分析できていません。データの活用方法を相談したいです。',
  },

  'r-kpi': {
    type: 'result',
    id: 'r-kpi',
    title: 'まず「数字を集める仕組み」から作りましょう',
    description:
      'データがなければ分析もできません。何を測るか決めて、自動で集まる仕組みを作るところから始めます。業種に合ったKPIの設計もお手伝いします。',
    recommendedServices: ['kpi-dashboard', 'data-analysis'],
    contactPreFill:
      '経営データを集める仕組みがありません。KPIの設計から相談したいです。',
  },

  'r-subsidy': {
    type: 'result',
    id: 'r-subsidy',
    title: '使える補助金、一緒に探しましょう',
    description:
      '補助金は「知っているかどうか」で差がつきます。事業内容に合った制度を探して、申請書の作成まで一緒に進めます。採択率を上げるコツもお伝えします。',
    recommendedServices: ['subsidy-support', 'management-consulting'],
    contactPreFill: '補助金の活用について相談したいです。',
  },

  'r-dx': {
    type: 'result',
    id: 'r-dx',
    title: '紙とExcelからの脱却、始めましょう',
    description:
      'いきなり大きなシステムは不要です。まず影響の大きい業務から順に、デジタル化を進めていきます。ツール選定から導入・定着まで一貫して対応します。',
    recommendedServices: ['dx-consulting', 'cloud-accounting'],
    contactPreFill:
      '業務のデジタル化を進めたいです。紙やExcel中心の業務が多い状態です。',
  },

  'r-it-strategy': {
    type: 'result',
    id: 'r-it-strategy',
    title: '「使いこなす」ための戦略が必要です',
    description:
      'ツールを入れただけでは変わりません。業務フローに合ったIT活用の全体像を描き、優先順位をつけて一つずつ進めていきましょう。',
    recommendedServices: ['it-strategy', 'dx-consulting'],
    contactPreFill:
      'ITツールを導入しましたが使いこなせていません。IT戦略について相談したいです。',
  },

  'r-it-strategy-dx': {
    type: 'result',
    id: 'r-it-strategy-dx',
    title: '社内にIT担当がいなくても大丈夫です',
    description:
      '外部のIT参謀として、戦略の立案からツール選定・導入まで丸ごとお任せいただけます。「ITがわかる人が社内にいない」問題を解決します。',
    recommendedServices: ['it-strategy', 'dx-consulting'],
    contactPreFill:
      '社内にITに詳しい人がいません。IT戦略の立案から導入まで相談したいです。',
  },

  'r-ai-tools': {
    type: 'result',
    id: 'r-ai-tools',
    title: 'AIで「面倒な作業」を減らせます',
    description:
      '議事録の文字起こし、レポートの自動生成、データ入力の省力化など、今すぐ使えるAIツールがあります。業務に合ったツールを選んで、実際に動く仕組みを作ります。',
    recommendedServices: ['ai-tools', 'ai-consulting'],
    contactPreFill:
      'AIで業務を効率化したいです。具体的にどんなツールが使えるか相談したいです。',
  },

  'r-ai-consulting': {
    type: 'result',
    id: 'r-ai-consulting',
    title: 'AI活用の可能性、一緒に探りましょう',
    description:
      '「AIで何ができるか」は業種や業務内容によって大きく変わります。御社の事業に合ったAI活用の方向性を一緒に考え、小さく始めて効果を確認していきます。',
    recommendedServices: ['ai-consulting', 'ai-tools'],
    contactPreFill:
      'AIの活用について相談したいです。何ができるか知りたいです。',
  },

  'r-web': {
    type: 'result',
    id: 'r-web',
    title: 'ウェブサイト、作りましょう',
    description:
      '名刺代わりのシンプルなサイトから、集客を意識した本格的なサイトまで対応できます。「何を載せるか」の整理から一緒に進めます。',
    recommendedServices: ['web-development'],
    contactPreFill: 'ウェブサイトの制作について相談したいです。',
  },

  'r-bookkeeping': {
    type: 'result',
    id: 'r-bookkeeping',
    title: '記帳、丸ごと任せてください',
    description:
      'たまった領収書や請求書、整理します。毎月の記帳作業を外注することで、本業に集中する時間を取り戻せます。',
    recommendedServices: ['bookkeeping', 'cloud-accounting'],
    contactPreFill:
      '記帳が追いつかず、たまっています。記帳代行を相談したいです。',
  },

  'r-cloud-acc': {
    type: 'result',
    id: 'r-cloud-acc',
    title: 'クラウド会計、導入しましょう',
    description:
      'freeeやマネーフォワードなど、事業規模に合った会計ソフトを選んで、初期設定から運用定着まで一緒に進めます。紙の領収書整理からも卒業できます。',
    recommendedServices: ['cloud-accounting'],
    contactPreFill:
      'クラウド会計ソフトの導入を検討しています。どれを選べばいいか相談したいです。',
  },

  'r-cloud-acc-kpi': {
    type: 'result',
    id: 'r-cloud-acc-kpi',
    title: '「経理」と「経営」をつなげましょう',
    description:
      '帳簿をつけるだけでなく、その数字を経営判断に活かす仕組みを作ります。クラウド会計の導入と、経営指標のダッシュボード化をセットで進めます。',
    recommendedServices: ['cloud-accounting', 'kpi-dashboard'],
    contactPreFill:
      '経理の数字を経営に活かしたいです。クラウド会計とKPIの見える化を相談したいです。',
  },

  'r-bookkeeping-mgmt': {
    type: 'result',
    id: 'r-bookkeeping-mgmt',
    title: 'お金の相談窓口、あります',
    description:
      '税金、資金繰り、補助金、記帳——お金まわりのことを幅広く相談できます。「何をどこに聞けばいいかわからない」状態でも大丈夫。まず話を聞かせてください。',
    recommendedServices: ['bookkeeping', 'management-consulting'],
    contactPreFill:
      '税金や資金繰りのことで相談できる人がいません。お金まわりの相談をしたいです。',
  },
};

/** Entry point question ID */
export const DIAGNOSTIC_START = 'q1';

/** Get a node by ID */
export function getNode(id: string): DiagnosticNode | undefined {
  return diagnosticTree[id];
}

/** Count total unique questions in the tree */
export function getQuestionCount(): number {
  return Object.values(diagnosticTree).filter((n) => n.type === 'question')
    .length;
}

/** Count total unique results in the tree */
export function getResultCount(): number {
  return Object.values(diagnosticTree).filter((n) => n.type === 'result')
    .length;
}

/**
 * Validate the tree: ensure every answer's nextId points to an existing node.
 * Returns an array of error messages (empty = valid).
 */
export function validateTree(): string[] {
  const errors: string[] = [];
  for (const node of Object.values(diagnosticTree)) {
    if (node.type === 'question') {
      for (const answer of node.answers) {
        if (!diagnosticTree[answer.nextId]) {
          errors.push(
            `Question "${node.id}" answer "${answer.text}" points to missing node "${answer.nextId}"`
          );
        }
      }
    }
    if (node.type === 'result') {
      if (node.recommendedServices.length === 0) {
        errors.push(`Result "${node.id}" has no recommended services`);
      }
    }
  }
  return errors;
}
