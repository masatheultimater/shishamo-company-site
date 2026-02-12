/**
 * Case study data for testimonials page.
 * Placeholder data - to be replaced with real client stories.
 */

export interface CaseStudy {
  id: string;
  label: string;
  serviceBadge: string;
  serviceHref: string;
  clientProfile: {
    industry: string;
    employees: string;
    challenge: string;
  };
  approach: string;
  results: string[];
  clientVoice: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    label: 'CASE 1',
    serviceBadge: 'DX推進サポート',
    serviceHref: '/services/dx-consulting/',
    clientProfile: {
      industry: '製造業',
      employees: '約30名',
      challenge: '紙ベースの受発注管理に限界を感じていたが、何から手をつければいいかわからなかった。ベンダーに相談しても専門用語ばかりで判断できず困っていた。',
    },
    approach: '業務フローの可視化から着手し、最もインパクトの大きい受発注管理のデジタル化を優先。クラウドシステムの選定から導入、社員研修まで伴走支援を実施。',
    results: [
      '受発注処理時間を約60%削減',
      '在庫管理の精度が向上し、欠品率が半減',
      '月次の集計作業が3日→半日に短縮',
    ],
    clientVoice: 'ITのことは全くわからなかったのですが、専門用語を使わずに丁寧に説明してもらえたので安心でした。導入後も困ったときにすぐ相談できるのが心強いです。',
  },
  {
    id: 'case-2',
    label: 'CASE 2',
    serviceBadge: '生成AI導入支援',
    serviceHref: '/services/ai-consulting/',
    clientProfile: {
      industry: 'コンサルティング業',
      employees: '約10名',
      challenge: '提案書やレポートの作成に多くの時間を費やしており、コア業務に集中できていなかった。生成AIに興味はあったが、情報漏洩のリスクが心配で導入に踏み切れなかった。',
    },
    approach: 'セキュリティガイドラインの策定から着手し、安全に使える環境を整備。業務別のプロンプトテンプレートを作成し、段階的に社内展開。',
    results: [
      '提案書の初稿作成時間を約50%短縮',
      '議事録の自動作成で会議後の作業が大幅減',
      '社員全員がAIツールを日常的に活用する文化が定着',
    ],
    clientVoice: 'セキュリティの不安を解消してから進めてくれたので、安心して導入できました。今では「AIなしの仕事は考えられない」と社員全員が言っています。',
  },
  {
    id: 'case-3',
    label: 'CASE 3',
    serviceBadge: '経営診断 + データ分析',
    serviceHref: '/services/management-consulting/',
    clientProfile: {
      industry: '小売業',
      employees: '約15名',
      challenge: '売上は横ばいで、何が原因かわからなかった。データはPOSにあるが活用できておらず、経験と勘で判断している状況だった。',
    },
    approach: '経営診断で課題を構造的に整理した後、POSデータの分析を実施。商品別・時間帯別の売上分析から具体的な改善施策を提案し、実行を伴走支援。',
    results: [
      'データに基づく品揃え改善で売上が前年比15%増',
      '死筋商品の特定・整理で在庫コストを20%削減',
      '月次の経営レビュー体制が定着し、迅速な意思決定が可能に',
    ],
    clientVoice: '「なんとなく」で経営していたことに気づかされました。データで裏付けがあると自信を持って判断できますし、社員への説明もしやすくなりました。',
  },
];
