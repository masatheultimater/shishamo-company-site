/**
 * サービス詳細データ
 * 各サービスページで使用するデータを一元管理
 */
import type { ServiceDetailData } from '@shared/contracts/components';

/** Default CTA title shared across all services */
const DEFAULT_CTA_TITLE = 'まずは無料相談から';

/**
 * Input type for service data definition.
 * - `name` defaults to `title`
 * - `tagline` defaults to `metaDescription`
 * - `cta.title` defaults to 'まずは無料相談から'
 */
type ServiceInput = Omit<ServiceDetailData, 'name' | 'tagline' | 'cta'> & {
  name?: string;
  tagline?: string;
  cta: {
    title?: string;
    description: string;
  };
};

/**
 * Factory that applies defaults to produce a full ServiceDetailData.
 * - name falls back to title
 * - tagline falls back to metaDescription
 * - cta.title falls back to DEFAULT_CTA_TITLE
 */
function createServiceData(input: ServiceInput): ServiceDetailData {
  return {
    ...input,
    name: input.name ?? input.title,
    tagline: input.tagline ?? input.metaDescription,
    cta: {
      title: input.cta.title ?? DEFAULT_CTA_TITLE,
      description: input.cta.description,
    },
  };
}

export const serviceData: Record<string, ServiceDetailData> = {
  'dx-consulting': createServiceData({
    id: 'dx-consulting',
    title: 'DX推進サポート',
    metaDescription: '「DXって何から始めれば？」にお答えします。業務の見直しからシステム導入まで、御社のデジタル変革を一緒に進めます。',
    icon: 'ri:rocket-line',
    priceRange: '20〜40',
    originalPriceRange: '25〜50',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円/月',
    problems: [
      '受注・在庫・売上の管理がExcelバラバラで、月末の集計に丸2日かかる',
      '紙の日報や手書き伝票が残っていて、転記ミスが毎月発生している',
      'ITベンダーに見積もりを取ったが、500万円と言われて止まっている',
      '社長しか全体像を把握しておらず、自分が倒れたら業務が止まる',
    ],
    useCases: [
      { scene: '製造業（従業員15名）：受発注をFAXとExcelで管理し、在庫の過不足が常態化', action: 'クラウド型の受発注・在庫管理システムを選定し、既存の会計ソフトと連携。3ヶ月で段階的に移行', outcome: '在庫差異が月平均30件→2件に。欠品による機会損失が年間約200万円削減' },
      { scene: '建設業（従業員8名）：現場日報が紙で、月末の原価集計に3日かかる', action: 'スマホで入力できる日報アプリを導入し、工事台帳と自動連携する仕組みを構築', outcome: '月末集計が3日→半日に短縮。工事別の利益率がリアルタイムで把握可能に' },
      { scene: '小売業（3店舗）：各店舗の売上データが統合されておらず、仕入れ判断が勘頼み', action: 'POSデータをクラウドに集約し、商品別・店舗別の売上ダッシュボードを構築', outcome: '死筋商品の早期発見で在庫回転率が1.4倍に改善。仕入れコスト年間15%削減' },
    ],
    features: [
      { icon: 'ri:focus-3-line', title: '経営課題から逆算するIT提案', description: '中小企業診断士として財務・業務の両面から課題を分析し、「売上を上げる」「コストを下げる」に直結するIT施策だけを提案します。技術先行の無駄な投資はしません。' },
      { icon: 'ri:hand-heart-line', title: '月次伴走で確実に定着', description: '導入して終わりではなく、毎月のミーティングで利用状況を確認し改善を繰り返します。半年後に「自分たちで回せる」状態を目指します。' },
      { icon: 'ri:computer-line', title: '開発12年の技術力で踏み込む', description: 'Web開発12年・データサイエンス3年の実務経験があるため、ベンダーの見積もりが妥当かの評価、要件定義の同席、技術選定まで一緒に入れます。' },
      { icon: 'ri:bar-chart-box-line', title: 'データ活用まで一貫対応', description: 'DXで生まれるデータを経営ダッシュボードに可視化し、数字に基づいた意思決定ができる体制まで構築します。' },
    ],
    expectedOutcomes: [
      { metric: '業務時間の削減', description: '手作業による入力・転記・集計業務を自動化', example: '月40時間の事務作業→8時間に（小売業の例）' },
      { metric: 'ミス・手戻りの減少', description: '二重入力や紙→Excelの転記ミスをゼロに近づける', example: '月平均15件の転記ミス→ほぼゼロに（製造業の例）' },
      { metric: '意思決定の迅速化', description: '売上・在庫・原価をリアルタイムで把握可能に', example: '月次報告に頼っていた経営判断が、日次で可能に' },
    ],
    flow: [
      { title: '現状把握・課題整理（1〜2週間）', description: '業務フロー・帳票・システムを棚卸し、ボトルネックを特定します。アウトプット：課題マップと優先度付きの改善候補リスト。' },
      { title: '施策立案・ロードマップ策定（2〜3週間）', description: '投資対効果を試算し、3〜6ヶ月で成果が出るロードマップを作成します。ベンダー3社以上の比較表も提供。' },
      { title: '導入・ベンダー調整（1〜3ヶ月）', description: '御社の立場でベンダーと交渉し、要件定義から受入テストまで一緒に進めます。「言いなり」にはさせません。' },
      { title: '定着化・改善サイクル（継続）', description: '導入後3ヶ月間は週次で利用状況を確認。現場の「使いにくい」を即改善し、自走できる体制を作ります。' },
    ],
    pricing: [
      { plan: 'スポット相談', amount: '4', originalAmount: '5', unit: '万円〜/回', description: 'まずは相談だけしたい方向け。課題整理や方向性のアドバイスを行います。', discountLabel: '登録準備価格' },
      { plan: '月額顧問', amount: '20', originalAmount: '25', unit: '万円〜/月', description: '継続的な改善推進。定期ミーティングと随時相談で着実に進めます。', popular: true, discountLabel: '登録準備価格' },
      { plan: 'プロジェクト型', amount: '40', originalAmount: '50', unit: '万円〜/PJ', description: '特定のプロジェクト（システム導入等）に集中して支援。期間・範囲を明確に。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/ai-consulting/', icon: 'ri:robot-line', name: '生成AI導入', description: 'ChatGPT・Claudeを業務に活かす方法を設計から導入まで対応。' },
      { href: '/services/data-analysis/', icon: 'ri:bar-chart-box-line', name: '経営データ分析', description: 'DXで生まれるデータを経営判断に活かすための分析・可視化。' },
      { href: '/services/subsidy-support/', icon: 'ri:money-dollar-circle-line', name: '補助金申請サポート', description: 'IT導入補助金等を活用してDX投資の負担を軽減。' },
    ],
    cta: {
      description: '「うちでもDXできる？」——そんな段階で構いません。<br>現状をお聞かせいただければ、最初の一歩を一緒に考えます。',
    },
  }),

  'ai-consulting': createServiceData({
    id: 'ai-consulting',
    title: '生成AI導入支援',
    metaDescription: 'ChatGPT・Claude等の生成AIを業務に活かす方法を、設計から導入、定着まで一貫して対応します。',
    icon: 'ri:robot-line',
    priceRange: '15〜30',
    priceUnit: '万円/月',
    problems: [
      '「ChatGPTを使ってみて」と社長が言うだけで、具体的な活用方法が決まっていない',
      '営業資料の作成に毎回2時間かかるが、AIで時短できるのか判断がつかない',
      '顧客情報や社内文書をAIに入力して情報漏洩しないか不安で踏み切れない',
      '一部の社員だけが使っていて、組織全体に広がらない',
    ],
    useCases: [
      { scene: '不動産会社（従業員6名）：物件紹介文を毎日5件手書きで、1件30分かかる', action: '物件データベースとChatGPTを連携し、条件を入力すると紹介文が自動生成される仕組みを構築', outcome: '1件30分→5分に短縮。月間で約40時間の営業時間を創出' },
      { scene: '士業事務所（従業員4名）：顧客からの定型的な質問対応に毎日1時間取られる', action: '過去のQ&Aデータを学習させた社内AIチャットボットを構築し、一次回答を自動化', outcome: '問い合わせ対応時間を70%削減。専門的な案件に集中できる時間が増加' },
      { scene: '製造業（従業員20名）：議事録作成に毎回40分、月8回の会議で計5時間超', action: 'AI文字起こし＋要約ツールを導入し、会議終了後5分で議事録ドラフトが完成する運用に', outcome: '議事録作成時間が月5時間→40分に。決定事項の共有スピードも向上' },
    ],
    features: [
      { icon: 'ri:focus-3-line', title: '御社の業務に合わせたAI活用設計', description: '「AIで何ができるか」ではなく「御社のどの業務が楽になるか」から逆算。業務フローを分析し、効果の高い活用ポイントを3〜5つ特定します。' },
      { icon: 'ri:shield-check-line', title: '情報漏洩リスクを考慮した導入設計', description: 'API利用とWebブラウザ利用の違い、データの取扱いルール、社内ガイドラインの策定まで対応。安心して使える体制を作ります。' },
      { icon: 'ri:book-open-line', title: 'ハンズオン研修で「使える」まで', description: '座学ではなく、実際の業務データを使ったハンズオン研修を実施。プロンプトのテンプレート集も提供し、翌日から使える状態にします。' },
      { icon: 'ri:flashlight-line', title: 'E資格保有のAI専門知識', description: 'ディープラーニングのE資格を保有。技術の仕組みを理解した上で「何ができて何ができないか」を正直にお伝えします。' },
    ],
    expectedOutcomes: [
      { metric: '定型業務の時間削減', description: '資料作成・メール文面・議事録など、定型的な文章作成業務を自動化', example: '営業資料作成：1件2時間→20分（不動産会社の例）' },
      { metric: '組織全体の活用率向上', description: '一部の人だけでなく、全社員がAIを日常業務で活用する状態に', example: '導入3ヶ月後の週次利用率：15%→85%（士業事務所の例）' },
      { metric: 'ナレッジの蓄積・共有', description: '社内のノウハウをAIに学習させ、属人化を解消', example: 'ベテラン社員の退職リスクに備えたナレッジベース構築' },
    ],
    flow: [
      { title: '業務ヒアリング・効果試算（1〜2週間）', description: '御社の業務フローを整理し、AI導入で最も効果が出るポイントを特定。ROI試算レポートを提出します。' },
      { title: '活用プラン策定・ツール選定（1〜2週間）', description: 'ChatGPT / Claude / Gemini等から最適なツールを選定。利用ルール・ガイドラインも同時に策定します。' },
      { title: 'PoC・試験導入（2〜4週間）', description: '少人数で実際に業務で試用し、効果を検証。プロンプトテンプレートや業務マニュアルを整備します。' },
      { title: '全社展開・定着化（1〜2ヶ月）', description: 'ハンズオン研修を全社員に実施。月次で利用状況を確認し、活用度が低い部門にはフォローアップ研修を追加。' },
    ],
    pricing: [
      { plan: 'スポット相談', amount: '5', unit: '万円〜/回', description: 'AI活用の方向性を相談したい方向け。' },
      { plan: '導入パック', amount: '30', unit: '万円〜', description: '計画策定から研修まで一気通貫で対応。', popular: true },
      { plan: '継続プラン', amount: '15', unit: '万円〜/月', description: '導入後の運用改善と最新情報の提供。' },
    ],
    relatedServices: [
      { href: '/services/ai-tools/', icon: 'ri:tools-line', name: 'AIツール開発', description: '御社専用のAIツールを開発・カスタマイズ。' },
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'AI導入を含む全社的なDX戦略の立案・実行。' },
      { href: '/services/data-analysis/', icon: 'ri:bar-chart-box-line', name: '経営データ分析', description: 'AIとデータを組み合わせて経営判断を強化。' },
    ],
    cta: {
      description: '「うちの業務にAIって使える？」——まずはそこからで大丈夫です。<br>業務を聞かせていただければ、具体的な活用イメージをお伝えします。',
    },
  }),

  'it-strategy': createServiceData({
    id: 'it-strategy',
    title: 'IT戦略立案',
    metaDescription: '経営戦略とIT投資を連動させ、中長期的な視点でのIT戦略を策定します。',
    icon: 'ri:focus-3-line',
    priceRange: '20〜40',
    originalPriceRange: '25〜50',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円',
    problems: [
      '基幹システム・会計ソフト・Excelが別々に動いていて、データの二重入力が日常化',
      'ITベンダーに毎年数百万円払っているが、費用対効果が見えない',
      '来期のIT投資を経営会議で議論したいが、判断材料がない',
      '社長交代・事業承継を控え、ITの全体像を整理しておきたい',
    ],
    useCases: [
      { scene: '卸売業（従業員30名）：基幹・会計・在庫の3システムが別々で、月末に手作業で突合', action: 'システム全体図を作成し、API連携による統合ロードマップを策定。3年計画で段階的にシステム統合', outcome: '月末突合作業が3日→自動化。年間のIT保守費も2割削減の見通し' },
      { scene: '食品メーカー（従業員50名）：5年前に入れた生産管理システムのサポート切れが迫る', action: 'クラウド型システムへの移行計画を策定。補助金（ものづくり補助金）の活用も併せて提案', outcome: 'システム刷新費用の2/3を補助金でカバー。運用コストも年間30%削減の計画' },
      { scene: '介護事業者（3拠点）：事業拡大に伴い、紙ベースの業務管理が限界', action: '業務分析により優先度の高いIT施策を5つ特定し、投資対効果付きのロードマップを策定', outcome: '初年度はスタッフ管理と請求業務の電子化から着手し、月20時間の事務削減を実現' },
    ],
    features: [
      { icon: 'ri:road-map-line', title: '経営目標に直結するIT計画', description: '「売上10%増」「新拠点展開」など経営目標をヒアリングし、それを実現するためのIT投資計画を策定。投資対効果を数字で示します。' },
      { icon: 'ri:clipboard-line', title: '3年ロードマップの策定', description: '「今年はここまで、来年はこれ」と段階的に進める計画を作成。予算と人員を考慮した現実的なスケジュールを提示します。' },
      { icon: 'ri:lightbulb-line', title: 'ベンダー依存からの脱却', description: '現在のIT費用を棚卸しし、過剰な保守費や不要なライセンスを特定。ベンダーロックインのリスクも評価します。' },
      { icon: 'ri:refresh-line', title: '半年ごとの計画見直し', description: '事業環境の変化に合わせて計画を柔軟に更新。「作って終わり」の計画書にはしません。' },
    ],
    expectedOutcomes: [
      { metric: 'IT投資の最適化', description: '不要なシステム・過剰保守の見直しでIT費用を適正化', example: '年間IT費用800万円→580万円（卸売業の例）' },
      { metric: '経営判断の高速化', description: 'システム統合により、経営に必要なデータが即座に揃う状態に', example: '月次決算の締め：15日→5日に短縮' },
      { metric: '属人化リスクの低減', description: 'IT全体像の文書化により、担当者が変わっても運用可能に', example: '事業承継時のIT引き継ぎ期間：6ヶ月→2ヶ月' },
    ],
    flow: [
      { title: '現状分析・システム棚卸し（2〜3週間）', description: '全システム・ツール・IT費用を一覧化。業務フローとの対応関係を整理し、課題と改善機会を特定します。' },
      { title: 'IT戦略策定・ロードマップ作成（3〜4週間）', description: '経営戦略とのすり合わせを行い、3年間のIT投資ロードマップを策定。投資対効果の試算資料も作成します。' },
      { title: '実行計画・予算策定（1〜2週間）', description: '初年度の具体的な施策・スケジュール・予算・担当を明確にします。補助金の活用可否も調査します。' },
      { title: '実行支援・半年レビュー（継続）', description: '計画の実行を伴走し、半年ごとに進捗と環境変化を踏まえた見直しを行います。' },
    ],
    pricing: [
      { plan: 'IT戦略策定', amount: '40', originalAmount: '50', unit: '万円〜', description: '経営戦略に基づいたIT戦略とロードマップを策定。', popular: true, discountLabel: '登録準備価格' },
      { plan: '年間顧問', amount: '20', originalAmount: '25', unit: '万円〜/月', description: '戦略の実行と定期的な見直しに対応。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'IT戦略に基づくDX施策の実行を推進。' },
      { href: '/services/management-consulting/', icon: 'ri:line-chart-line', name: '経営改善', description: 'IT戦略と連動した経営改善に取り組みます。' },
      { href: '/services/data-analysis/', icon: 'ri:bar-chart-box-line', name: '経営データ分析', description: 'データに基づく戦略立案を後押し。' },
    ],
    cta: {
      description: '「うちのITって、このままで大丈夫？」——その疑問が相談のきっかけで十分です。<br>現状を整理するところから一緒に始めましょう。',
    },
  }),

  'ai-tools': createServiceData({
    id: 'ai-tools',
    title: 'AIツール開発',
    metaDescription: '御社の業務に特化したAIツールを開発・カスタマイズ。ChatGPTやClaudeを活用した業務効率化ツールを構築します。',
    icon: 'ri:tools-line',
    priceRange: '30〜100',
    priceUnit: '万円/PJ',
    problems: [
      'ChatGPTは便利だけど、毎回同じプロンプトを書くのが面倒で結局使わなくなった',
      '社内マニュアルが200ページ超あるが、必要な情報を探すのに毎回30分かかる',
      '見積書・報告書の作成が属人化しており、ベテラン社員に依存している',
      '顧客からの問い合わせ対応が定型的だが、AIチャットボットの作り方がわからない',
    ],
    useCases: [
      { scene: '人材紹介会社（従業員10名）：求職者と求人のマッチングを担当者の記憶に頼っている', action: '求職者データベースと求人票をAIが照合し、マッチ度をスコアリングするツールを開発', outcome: 'マッチング精度が向上し、成約率が月平均3件→5件に。担当者の検索時間も半減' },
      { scene: '法律事務所（弁護士3名）：過去の判例検索と書面ドラフトに毎案件4時間', action: '過去判例データベースをRAGで構築し、案件概要を入力すると関連判例と書面ドラフトを生成するツールを開発', outcome: '判例調査＋ドラフト作成が4時間→1時間に。月間で弁護士1名分の稼働を創出' },
      { scene: 'EC事業者（従業員5名）：商品説明文を毎日20件手書きで、写真撮影後の公開が翌日以降', action: '商品画像と基本情報をアップロードすると、説明文・SEOタグ・SNS投稿文が一括生成されるツールを開発', outcome: '商品登録が1件20分→3分に。新商品の公開スピードが当日化' },
    ],
    features: [
      { icon: 'ri:palette-line', title: '御社専用のオーダーメイド開発', description: '汎用AIツールでは対応できない、御社の業務フロー・データ・用語に最適化したツールを開発します。「使いやすさ」を最優先に設計。' },
      { icon: 'ri:links-line', title: '既存システムとのAPI連携', description: 'kintone・Salesforce・freee・Google Workspace等、既存の業務システムとAPI連携。データの手動転記をなくします。' },
      { icon: 'ri:book-open-line', title: 'RAGによる社内ナレッジ活用', description: '社内マニュアル・議事録・FAQをAIに学習させ、「聞けば答えてくれる」社内知識ベースを構築。属人化を解消します。' },
      { icon: 'ri:settings-3-line', title: '開発後の改善・機能追加', description: '使い始めてからの「こうしたい」にも対応。月次で利用ログを分析し、使われていない機能の改善や新機能の追加を提案します。' },
    ],
    expectedOutcomes: [
      { metric: '定型作業の自動化', description: '繰り返し行っている文章作成・データ検索・レポート生成を自動化', example: '1件20分の見積書作成→3分に（EC事業者の例）' },
      { metric: 'ナレッジの民主化', description: 'ベテランの知見を全社員がAI経由で活用可能に', example: '社内FAQ検索：30分→30秒（200ページの社内マニュアルをRAG化）' },
      { metric: '収益機会の拡大', description: '作業時間の削減分を本来の収益業務に振り向け', example: '弁護士の稼働時間：月160時間→120時間分を新規案件に' },
    ],
    flow: [
      { title: '要件ヒアリング・技術調査（1〜2週間）', description: '実現したい機能、既存システム構成、データの所在を確認。技術的な実現可能性とコスト見積りを提出します。' },
      { title: '設計・プロトタイプ（2〜3週間）', description: '画面設計と処理フローを作成し、主要機能が動くプロトタイプをお見せします。この段階で「使用感」を確認いただけます。' },
      { title: '開発・テスト（1〜2ヶ月）', description: '本番品質での開発とテストを実施。2週間ごとに進捗をデモし、方向性のズレを防ぎます。' },
      { title: 'リリース・運用改善（継続）', description: '本番リリース後、1ヶ月間は週次で利用状況を確認。利用ログに基づいて改善提案を行います。' },
    ],
    pricing: [
      { plan: 'シンプルツール', amount: '30', unit: '万円〜', description: '単機能のAIツール開発。' },
      { plan: '業務システム連携', amount: '50', unit: '万円〜', description: '既存システムとの連携を含む開発。', popular: true },
      { plan: '大規模開発', amount: '100', unit: '万円〜', description: '複数機能・複雑な要件の開発。' },
    ],
    relatedServices: [
      { href: '/services/ai-consulting/', icon: 'ri:robot-line', name: '生成AI導入', description: 'AIツールの活用戦略から定着まで対応。' },
      { href: '/services/web-development/', icon: 'ri:globe-line', name: 'Web開発・システム構築', description: 'Webアプリケーション全般の開発。' },
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'AIを活用したDX全体の推進。' },
    ],
    cta: {
      description: '「こんなツールが欲しい」を形にします。<br>アイデア段階でも構いません。技術的に何ができるかをお伝えします。',
    },
  }),

  'web-development': createServiceData({
    id: 'web-development',
    title: 'Web開発・システム構築',
    metaDescription: 'コーポレートサイトから業務システムまで、御社のニーズに合わせたWeb開発・システム構築を行います。',
    icon: 'ri:globe-line',
    priceRange: '30〜200',
    priceUnit: '万円/PJ',
    problems: [
      '開業したが、ホームページがなく「検索しても出てこない」と言われた',
      '5年前に作ったサイトがスマホ非対応で、お問い合わせがほとんどない',
      '受注管理をExcelでやっているが、月100件を超えて限界に達した',
      'Web制作会社に見積もりを取ったら200万円と言われ、相場がわからず動けない',
    ],
    useCases: [
      { scene: '独立した社労士（1人事務所）：名刺にURLが書けず、信頼感が伝わらない', action: 'Astro＋Cloudflare Pagesで高速・低コストなコーポレートサイトを構築。お問い合わせフォーム・料金表・実績紹介を掲載', outcome: '年間維持費ドメイン代のみ（約2,000円）。月3〜5件の問い合わせが安定的に発生' },
      { scene: '工務店（従業員12名）：施工実績をSNSに投稿するだけで、Webサイトに蓄積されない', action: 'CMSを導入し、スマホから施工事例を投稿→自動でWebサイトに反映される仕組みを構築', outcome: '施工事例ページのアクセス数が月500→3,000に。「ホームページを見た」という問い合わせが月8件増加' },
      { scene: '卸売業（従業員20名）：FAXでの受注を手入力しており、月平均15件の入力ミスが発生', action: '取引先がWebから直接発注できる受注システムを構築。在庫データとリアルタイム連携', outcome: '入力ミスがゼロに。受注処理時間も1件15分→2分に短縮' },
    ],
    features: [
      { icon: 'ri:computer-line', title: '12年の開発経験で「ちょうどいい」を提案', description: 'フロントエンド・バックエンド・DB設計まで一人で対応できるため、チーム間の伝言ゲームが発生しません。御社の規模と予算に合った技術を選びます。' },
      { icon: 'ri:palette-line', title: '「更新できるサイト」を作る', description: '作って終わりではなく、御社のスタッフが自分で更新できる仕組みを重視。CMS導入と操作マニュアルの提供まで行います。' },
      { icon: 'ri:smartphone-line', title: 'スマホファースト設計', description: '中小企業サイトのアクセスの70%はスマートフォンから。スマホでの見やすさ・使いやすさを最優先に設計します。' },
      { icon: 'ri:wrench-line', title: '保守は月額固定で安心', description: '「追加費用がいくらかかるかわからない」を解消。月額の保守プランで、軽微な修正・更新は追加料金なしで対応します。' },
    ],
    expectedOutcomes: [
      { metric: 'Web経由の問い合わせ創出', description: '検索で見つかる・信頼感が伝わるサイトで新規顧客を獲得', example: '問い合わせゼロ→月3〜5件の安定的な流入（士業事務所の例）' },
      { metric: '運用コストの削減', description: '自社更新可能＋低コストインフラで維持費を最小化', example: '月額5万円の保守費→ドメイン代のみ年間2,000円（静的サイトの場合）' },
      { metric: '手作業の自動化', description: '受注・在庫管理・顧客対応の手作業を削減', example: '受注処理：1件15分→2分（卸売業の例）' },
    ],
    flow: [
      { title: '要件ヒアリング・見積り（1〜2週間）', description: '実現したいこと・予算感・スケジュールをヒアリング。デザインイメージや参考サイトも確認し、詳細な見積りを提出します。' },
      { title: '設計・デザイン（2〜3週間）', description: 'サイト構成・画面設計・デザインカンプを作成。この段階で完成イメージを確認いただき、認識のズレを防ぎます。' },
      { title: '開発・テスト（1〜2ヶ月）', description: '2週間ごとにプレビュー環境で進捗を共有。フィードバックを反映しながら開発を進めます。' },
      { title: 'リリース・操作研修（1週間）', description: '本番公開後、更新操作の研修を実施。マニュアルも提供し、翌日から自分で更新できる状態にします。' },
    ],
    pricing: [
      { plan: 'コーポレートサイト', amount: '30', unit: '万円〜', description: '5〜10ページの会社紹介サイト。CMS＋レスポンシブ対応込み。' },
      { plan: 'Webアプリケーション', amount: '80', unit: '万円〜', description: '受注管理・予約システム等の業務システム開発。', popular: true },
      { plan: '大規模システム', amount: '200', unit: '万円〜', description: 'API連携・複数機能を含む複雑なシステム開発。' },
    ],
    relatedServices: [
      { href: '/services/ai-tools/', icon: 'ri:tools-line', name: 'AIツール開発', description: 'AIを活用した業務効率化ツールの開発。' },
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'システム導入を含むDX全体の推進。' },
      { href: '/services/kpi-dashboard/', icon: 'ri:dashboard-3-line', name: 'KPIダッシュボード構築', description: '経営指標を可視化するダッシュボード。' },
    ],
    cta: {
      description: '「ホームページが欲しい」でも「業務システムを作りたい」でも、まずは話を聞かせてください。<br>予算と規模に合った提案をします。',
    },
  }),

  'data-analysis': createServiceData({
    id: 'data-analysis',
    title: '経営データ分析',
    metaDescription: '売上・顧客・業務データを分析し、経営判断に活かせるインサイトを提供します。',
    icon: 'ri:bar-chart-box-line',
    priceRange: '8〜40',
    originalPriceRange: '10〜50',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円/PJ',
    problems: [
      'POSデータや顧客リストはあるが、Excelに入ったまま誰も分析していない',
      '「この商品、売れてる？」に即答できず、仕入れ判断が社長の勘頼み',
      '月次の売上報告書を作るのに毎月丸1日かかっている',
      '広告を出しているが、どの施策が効いているのか数字で説明できない',
    ],
    useCases: [
      { scene: '飲食チェーン（5店舗）：各店舗の売上データがバラバラで、全店の傾向が見えない', action: 'POSデータを統合し、店舗別・時間帯別・メニュー別の売上分析レポートを自動生成する仕組みを構築', outcome: '死筋メニューの特定で食材ロスが月15万円削減。繁忙時間帯のスタッフ配置も最適化' },
      { scene: 'ECショップ（従業員3名）：広告費を月50万円使っているが、ROIが不明', action: 'Google Analytics・広告管理画面・注文データを統合分析し、チャネル別のROIと顧客獲得コストを可視化', outcome: 'ROIの低い広告チャネルを停止し、広告費を月50万円→35万円に削減。売上は維持' },
      { scene: '製造業（従業員25名）：不良率のデータは取っているが、原因分析ができていない', action: '生産データ・環境データの統計分析を実施し、不良発生の主要因をデータで特定', outcome: '特定された3つの要因への対策で不良率が3.2%→1.1%に改善。月間の手戻りコスト80万円削減' },
    ],
    features: [
      { icon: 'ri:search-line', title: '「見える」ダッシュボードで可視化', description: 'Looker Studio・Power BI等を使い、売上・顧客・在庫のデータを経営者が一目で把握できるダッシュボードに。自動更新なので毎月のレポート作成が不要になります。' },
      { icon: 'ri:lightbulb-line', title: '「なぜ」「次にどうする」まで踏み込む', description: 'データサイエンス3年の経験を活かし、単なる集計ではなく「なぜこの数字になっているのか」「次にどんな手を打つべきか」まで分析・提言します。' },
      { icon: 'ri:line-chart-line', title: '売上予測・シミュレーション', description: '過去データに基づく売上予測や、価格変更・広告投資の効果シミュレーションを実施。リスクを抑えた意思決定を支援します。' },
      { icon: 'ri:refresh-line', title: '月次レポートの完全自動化', description: '「毎月Excel作業に1日」をゼロに。データ取得→加工→レポート出力を自動化し、経営者の手元に毎月自動で届く仕組みを作ります。' },
    ],
    expectedOutcomes: [
      { metric: 'コスト削減の発見', description: '無駄な支出・非効率な施策をデータで特定', example: '広告費月15万円削減、食材ロス月15万円削減（飲食チェーンの例）' },
      { metric: 'レポート作業の自動化', description: '手作業のExcelレポートを自動ダッシュボードに置き換え', example: '月1日のレポート作成作業→完全自動化' },
      { metric: 'データに基づく意思決定', description: '勘と経験ではなく、数字に基づく判断ができる体制に', example: '仕入れ判断の精度向上で在庫回転率1.3倍に' },
    ],
    flow: [
      { title: 'データ確認・目的整理（1週間）', description: '利用可能なデータの所在・品質を確認し、「何を明らかにしたいか」を明確にします。データが散在していても大丈夫です。' },
      { title: '分析設計・データ整備（1〜2週間）', description: '分析の切り口を設計し、必要なデータの加工・クレンジングを実施。分析計画書を提出します。' },
      { title: '分析実施・インサイト抽出（2〜3週間）', description: '統計分析・可視化を実施し、経営判断に使える「気づき」を抽出。具体的なアクション提案付きのレポートを提出します。' },
      { title: '仕組み化・レポート自動化（1〜2週間）', description: 'ダッシュボードの構築や自動レポートの設定を行い、継続的にデータを活用できる仕組みを整えます。' },
    ],
    pricing: [
      { plan: 'スポット分析', amount: '12', originalAmount: '15', unit: '万円〜', description: '特定のテーマに絞った単発の分析。', discountLabel: '登録準備価格' },
      { plan: '継続分析', amount: '8', originalAmount: '10', unit: '万円〜/月', description: '定期的なデータ分析とレポート提供。', popular: true, discountLabel: '登録準備価格' },
      { plan: '分析基盤構築', amount: '40', originalAmount: '50', unit: '万円〜', description: '自社で分析できる基盤の構築。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/kpi-dashboard/', icon: 'ri:dashboard-3-line', name: 'KPIダッシュボード構築', description: '分析結果を常に見られるダッシュボードを構築。' },
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'データ活用を軸としたDX推進。' },
      { href: '/services/management-consulting/', icon: 'ri:line-chart-line', name: '経営改善', description: 'データに基づく経営改善に対応。' },
    ],
    cta: {
      description: '「データはあるけど使えていない」——それが相談の入り口で十分です。<br>御社のデータから何がわかるか、一緒に見てみましょう。',
    },
  }),

  'kpi-dashboard': createServiceData({
    id: 'kpi-dashboard',
    title: 'KPIダッシュボード構築',
    metaDescription: '経営指標をリアルタイムで可視化するダッシュボードを構築。データに基づく判断を後押しします。',
    icon: 'ri:dashboard-3-line',
    priceRange: '30〜80',
    priceUnit: '万円/PJ',
    problems: [
      '今月の売上がいくらか、月末にならないとわからない',
      '営業・経理・製造で使っているシステムが別々で、全社の数字が一覧できない',
      '毎週のExcelレポート作成に担当者が半日かけている',
      '外出先や移動中に経営数値を確認する手段がない',
    ],
    useCases: [
      { scene: '卸売業（従業員30名）：営業部の売上、経理の入金、倉庫の在庫が全部バラバラ', action: '基幹システム・会計ソフト・在庫管理をAPI連携し、売上・粗利・在庫回転率を一画面に集約するダッシュボードを構築', outcome: '経営会議の資料準備が2日→不要に。異常値（急な在庫増等）を当日中に検知可能に' },
      { scene: '美容サロン（3店舗）：店舗ごとの売上・リピート率・客単価を毎月Excelで集計', action: '予約システムとPOSデータを連携し、店舗別KPIがリアルタイムで確認できるダッシュボードを構築', outcome: 'Excelでの月次集計作業（毎月半日）が完全に不要に。リピート率の低い店舗を早期に特定し、施策を打てるように' },
      { scene: '建設会社（従業員15名）：工事ごとの利益率を決算まで把握できない', action: '工事台帳と会計データを連携し、工事別の原価・利益率・進捗をリアルタイム表示するダッシュボードを構築', outcome: '赤字工事を工事中に検知し、追加発注の判断が迅速に。工事粗利率が平均2%改善' },
    ],
    features: [
      { icon: 'ri:flashlight-line', title: '自動更新でリアルタイム把握', description: 'データは自動で収集・更新されるため、常に最新の数字を確認できます。「先月の数字をExcelで集計」という作業が不要になります。' },
      { icon: 'ri:palette-line', title: '経営者目線のデザイン設計', description: '情報を詰め込みすぎず、「今見るべき数字」が一目でわかるレイアウトに。信号色（赤黄緑）で異常値をアラート表示します。' },
      { icon: 'ri:links-line', title: 'freee・kintone・Salesforce等と連携', description: '御社が使っている会計ソフト・SFA・EC・POSシステムからデータを自動集約。新しいシステムを入れる必要はありません。' },
      { icon: 'ri:smartphone-line', title: 'スマホからいつでも確認', description: '外出先・移動中でもスマートフォンで経営数値をチェック。月曜朝の通勤中に先週の数字を把握できます。' },
    ],
    expectedOutcomes: [
      { metric: 'レポート作成工数の削減', description: '手作業のExcelレポートをリアルタイムダッシュボードに置き換え', example: '週次レポート作成：半日→ゼロ（美容サロンの例）' },
      { metric: '異常値の早期検知', description: '売上急落・在庫過多・赤字案件を当日中に把握', example: '月末にしか気づけなかった赤字工事を工事中に検知' },
      { metric: '経営会議の質向上', description: '数字の確認ではなく、対策の議論に時間を使える', example: '資料準備2日→ゼロ。会議時間も1時間→30分に短縮' },
    ],
    flow: [
      { title: 'KPI設計・データソース確認（1〜2週間）', description: '経営にとって重要な指標を一緒に選定し、必要なデータがどこにあるかを確認します。' },
      { title: 'データ連携設計・構築（2〜3週間）', description: '各システムからのデータ取得方法を設計し、自動連携の仕組みを構築します。' },
      { title: 'ダッシュボード構築（2〜3週間）', description: 'Looker Studio・Power BI等でダッシュボードを構築。経営者と一緒にレイアウトを確認しながら仕上げます。' },
      { title: '操作研修・運用改善（継続）', description: '操作方法の研修を実施し、運用開始後もフィードバックに基づいて表示項目やレイアウトを改善します。' },
    ],
    pricing: [
      { plan: 'シンプル構築', amount: '30', unit: '万円〜', description: '単一データソースのダッシュボード。' },
      { plan: '統合ダッシュボード', amount: '50', unit: '万円〜', description: '複数システムからのデータ統合。', popular: true },
      { plan: 'エンタープライズ', amount: '80', unit: '万円〜', description: '大規模データ・高度な分析機能。' },
    ],
    relatedServices: [
      { href: '/services/data-analysis/', icon: 'ri:bar-chart-box-line', name: '経営データ分析', description: 'ダッシュボードのデータを深堀り分析。' },
      { href: '/services/cloud-accounting/', icon: 'ri:cloud-line', name: 'クラウド会計導入', description: '会計データの連携で財務状況を可視化。' },
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'データ活用を軸としたDX推進。' },
    ],
    cta: {
      description: '「数字を見るのに時間がかかりすぎる」——そう感じたら相談のタイミングです。<br>御社の経営に本当に必要な数字を、一画面で見えるようにします。',
    },
  }),

  'management-consulting': createServiceData({
    id: 'management-consulting',
    title: '経営支援',
    metaDescription: '中小企業診断士として、経営課題の整理から改善施策の実行まで一緒に取り組みます。',
    icon: 'ri:line-chart-line',
    priceRange: '8〜20',
    originalPriceRange: '10〜25',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円/月',
    problems: [
      '売上は横ばいなのに忙しさだけ増えていて、何が原因かわからない',
      '後継者に引き継ぎたいが、「何を」「どう」引き継げばいいのか整理できていない',
      '融資を受けたいが、銀行に説明できる事業計画がない',
      '税理士には数字の話をするが、経営の方向性を相談できる相手がいない',
    ],
    useCases: [
      { scene: '印刷会社（従業員12名）：売上は5年間横ばい。利益率が年々下がっているが、原因不明', action: '財務分析（変動費率・固定費の推移）と業務フロー分析を実施。採算の悪い受注パターンを特定し、価格改定と営業戦略を見直し', outcome: '粗利率が18%→24%に改善。年間利益が約400万円増加' },
      { scene: '食品製造業（従業員8名）：社長が60代で事業承継を検討し始めたが、何から手をつけるかわからない', action: '経営状況の棚卸し、後継者候補の適性評価、5年間の承継ロードマップを策定。金融機関との面談にも同席', outcome: '承継計画が明確になり、後継者への段階的な権限移譲を開始。金融機関の理解も得られた' },
      { scene: '個人事業主（Web制作）：独立2年目で売上は伸びているが、時間と体力の限界を感じる', action: '収支構造を分析し、低単価案件の整理と料金体系の見直しを提案。外注活用の仕組みも設計', outcome: '月の稼働案件を8件→5件に減らしながら、月収は20%アップ。労働時間は週50時間→35時間に' },
    ],
    features: [
      { icon: 'ri:focus-3-line', title: '漠然とした課題を構造化', description: 'SWOT分析・財務分析・業務フロー分析を組み合わせ、「何が本当の課題か」を明らかにします。感覚ではなく、データと論理で整理します。' },
      { icon: 'ri:bar-chart-box-line', title: '財務諸表が読める診断士', description: '会計事務所での実務経験があるため、PL・BS・CFを読み解いた上で経営提案を行います。「数字がわかる経営相談相手」として伴走します。' },
      { icon: 'ri:hand-heart-line', title: '計画だけでなく実行まで伴走', description: '立派な計画書を作って終わりにしません。月次ミーティングで進捗を確認し、うまくいかない部分は一緒に軌道修正します。' },
      { icon: 'ri:computer-line', title: 'IT×経営の両軸で提案', description: '「業務改善にITを使えないか」「このシステム投資は妥当か」——IT側の知見があるからこそ、経営課題に対して幅広い選択肢を提示できます。' },
    ],
    expectedOutcomes: [
      { metric: '利益率の改善', description: '収支構造の見直しと価格戦略の最適化', example: '粗利率18%→24%改善（印刷会社の例）' },
      { metric: '経営の「見える化」', description: '漠然とした課題が整理され、優先順位が明確に', example: '「何をすべきかわからない」→3つの優先施策に絞り込み' },
      { metric: '経営者の時間創出', description: '業務の整理と仕組み化で、経営者が「考える時間」を確保', example: '週50時間の労働→35時間に（個人事業主の例）' },
    ],
    flow: [
      { title: '現状分析・課題整理（2〜3週間）', description: '経営者ヒアリング・財務分析・業務フロー分析を実施。現状の全体像と課題を「見える化」し、課題分析レポートを提出します。' },
      { title: '優先課題の特定・施策立案（1〜2週間）', description: '課題の中から「最もインパクトが大きいもの」を3つに絞り込み、具体的なアクションプランを策定します。' },
      { title: '施策実行・月次伴走（継続）', description: '月次ミーティングで施策の進捗を確認。数字の変化を見ながら、計画の修正や新たな施策の提案を行います。' },
      { title: '効果測定・次の一手（四半期ごと）', description: '四半期ごとに施策の効果を検証し、次に取り組むべきテーマを一緒に決めます。' },
    ],
    pricing: [
      { plan: 'スポット相談', amount: '4', originalAmount: '5', unit: '万円〜/回', description: '特定のテーマについての相談。', discountLabel: '登録準備価格' },
      { plan: '月次顧問', amount: '8', originalAmount: '10', unit: '万円〜/月', description: '定期的なミーティングと随時相談。', popular: true, discountLabel: '登録準備価格' },
      { plan: 'プロジェクト型', amount: '20', originalAmount: '25', unit: '万円〜/PJ', description: '特定の課題に集中して取り組む。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'IT活用による経営改善を推進。' },
      { href: '/services/data-analysis/', icon: 'ri:bar-chart-box-line', name: '経営データ分析', description: 'データに基づく経営判断を後押し。' },
      { href: '/services/subsidy-support/', icon: 'ri:money-dollar-circle-line', name: '補助金申請サポート', description: '経営改善に使える補助金の申請を代行。' },
    ],
    cta: {
      description: '「何が課題かわからない」——その状態でも大丈夫です。<br>まずは話を聞かせてください。一緒に整理するところから始めます。',
    },
  }),

  'subsidy-support': createServiceData({
    id: 'subsidy-support',
    title: '補助金申請サポート',
    metaDescription: 'IT導入補助金、ものづくり補助金など、御社の事業に使える補助金の申請を手伝います。',
    icon: 'ri:money-dollar-circle-line',
    priceRange: '成功報酬',
    priceUnit: '10〜15%',
    problems: [
      'システム導入に300万円かかるが、補助金で負担を減らせるならやりたい',
      '公募要領を読んだが、専門用語が多くて申請書の書き方がわからない',
      '前回、自力で申請して不採択だった。どこがダメだったのかもわからない',
      'IT導入補助金・ものづくり補助金・事業再構築補助金、どれが自社に合うのか判断できない',
    ],
    useCases: [
      { scene: '製造業（従業員15名）：生産管理システムの導入を検討しているが、500万円の投資に踏み切れない', action: 'ものづくり補助金（デジタル枠）を提案し、事業計画書の策定から申請・採択後の実績報告まで一貫対応', outcome: '補助率2/3で約330万円の補助金を獲得。自己負担170万円でシステム導入を実現' },
      { scene: '小売業（従業員5名）：ECサイトの構築とPOS連携を考えているが、予算がない', action: 'IT導入補助金を活用した導入計画を策定。IT導入支援事業者の選定も支援', outcome: '補助金150万円を獲得し、ECサイト＋POS連携を自己負担50万円で実現' },
      { scene: 'サービス業（従業員8名）：コロナ後の事業転換で新サービスを始めたいが資金不足', action: '事業再構築補助金を提案。市場分析・収益計画を含む事業計画書を策定し、認定支援機関として確認書を発行', outcome: '補助金800万円を獲得し、新事業の立ち上げ費用をカバー。1年後に月商200万円を達成' },
    ],
    features: [
      { icon: 'ri:search-line', title: '御社に最適な補助金を選定', description: 'IT導入補助金・ものづくり補助金・事業再構築補助金・小規模事業者持続化補助金等、数百種類から御社の投資計画に合致するものを調査・提案します。' },
      { icon: 'ri:file-edit-line', title: '審査員に刺さる申請書を作成', description: '審査基準を踏まえた事業計画書を一緒に作成。「なぜこの投資が必要か」「どう収益に繋がるか」を数字で説得力のあるストーリーに仕上げます。' },
      { icon: 'ri:clipboard-line', title: '経営課題と一体の事業計画', description: '補助金を通すためだけの計画ではなく、実際に経営改善に繋がる事業計画を策定。中小企業診断士として事業の成長まで見据えた計画を作ります。' },
      { icon: 'ri:check-double-line', title: '採択後の実績報告まで伴走', description: '採択がゴールではありません。経費の証憑整理、実績報告書の作成、完了検査対応まで一貫してサポート。補助金返還リスクを防ぎます。' },
    ],
    expectedOutcomes: [
      { metric: '投資コストの大幅軽減', description: '補助金を活用して自己負担を1/3〜1/2に', example: '500万円のシステム投資→自己負担170万円に（ものづくり補助金の例）' },
      { metric: '申請にかかる負担の軽減', description: '公募要領の読み解きから書類作成まで代行', example: '経営者の手間：申請全体で打ち合わせ3〜4回のみ' },
      { metric: '事業成長への投資実現', description: '「予算がない」で諦めていた投資を補助金で実現', example: '新事業立ち上げ費用800万円を補助金でカバー（サービス業の例）' },
    ],
    flow: [
      { title: '無料ヒアリング・補助金選定（1〜2週間）', description: '投資計画と経営課題をヒアリングし、適合する補助金を調査。申請スケジュールと採択の見込みをお伝えします。' },
      { title: '事業計画策定（2〜4週間）', description: '補助金の審査基準に合致した事業計画書を策定。市場分析・収益計画・費用対効果を盛り込み、説得力のある計画に仕上げます。' },
      { title: '申請書類作成・提出（1〜2週間）', description: '申請書類一式を作成し、不備なく提出。電子申請の操作も代行します。' },
      { title: '採択後フォロー・実績報告（事業実施期間）', description: '経費の証憑管理、実績報告書の作成、完了検査への立ち会いまで対応。補助金が確実に受け取れるようサポートします。' },
    ],
    pricing: [
      { plan: '着手金', amount: '5', unit: '万円〜', description: '申請準備の着手金。不採択の場合でも返金不可。' },
      { plan: '成功報酬', amount: '10〜15', unit: '%', description: '採択された補助金額に対する成功報酬。', popular: true },
    ],
    relatedServices: [
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: 'IT導入補助金を活用したDX推進。' },
      { href: '/services/management-consulting/', icon: 'ri:line-chart-line', name: '経営改善', description: '補助金を活用した経営改善。' },
      { href: '/services/web-development/', icon: 'ri:globe-line', name: 'Web開発・システム構築', description: '補助金を活用したシステム導入。' },
    ],
    cta: {
      description: '「この投資、補助金を使えないかな？」——そんな相談で大丈夫です。<br>御社の計画に合う補助金があるか、まずは調べます。',
    },
  }),

  'bookkeeping': createServiceData({
    id: 'bookkeeping',
    title: '記帳代行',
    metaDescription: '日々の経理業務を代行し、経営者が本業に集中できる環境を作ります。',
    icon: 'ri:book-2-line',
    priceRange: '2〜5',
    priceUnit: '万円/月',
    problems: [
      '毎月の領収書整理とExcel入力に週末を潰している',
      '経理担当のパートさんが退職し、後任が見つからない',
      '確定申告の時期になって、半年分の記帳が溜まっていることに気づいた',
      '税理士に「資料が遅い・不備が多い」と指摘されてしまう',
    ],
    useCases: [
      { scene: '個人事業主（フリーランスデザイナー）：本業が忙しく、毎月の経理を後回しにしてしまう', action: 'レシート・領収書をスマホで撮影→クラウド共有するだけで、月次の記帳を完全代行', outcome: '月10時間の経理作業→ゼロに。確定申告も税理士に丸投げできる状態を維持' },
      { scene: '飲食店（従業員5名）：経理担当のパートが退職し、店長が閉店後に帳簿をつけている', action: 'freee会計と銀行口座を連携し、日々の売上・仕入れ・経費を自動取込＋記帳代行', outcome: '店長の経理作業が週4時間→ゼロに。閉店後の残業がなくなり、翌日の仕込みに集中' },
      { scene: '建設業（従業員10名）：現場と事務所が離れていて、経費精算が常に1ヶ月遅れ', action: 'クラウド経費精算を導入し、現場からスマホで経費申請→承認→記帳までの流れを構築', outcome: '経費精算の遅延が解消。月次試算表の完成が翌月15日→翌月5日に早期化' },
    ],
    features: [
      { icon: 'ri:time-line', title: '経営者の時間を取り戻す', description: '領収書の整理、仕訳入力、勘定科目の判断——すべて代行します。経営者は本業に100%集中できます。' },
      { icon: 'ri:check-double-line', title: '会計事務所出身の正確な処理', description: '会計事務所で法人・個人の記帳実務を経験しているため、勘定科目の判断や消費税区分の処理が正確です。税務調査にも耐えうる品質を提供します。' },
      { icon: 'ri:bar-chart-box-line', title: '月次レポートで経営状況を「見える化」', description: '毎月の試算表に加え、売上推移・経費内訳・前年比較をまとめた経営サマリーレポートを提供。数字が苦手でもわかるように説明します。' },
      { icon: 'ri:hand-heart-line', title: '顧問税理士との連携もスムーズ', description: '顧問税理士への資料提供を代行します。「資料が遅い」「不備が多い」と言われることがなくなります。税理士がいない場合は紹介も可能。' },
    ],
    expectedOutcomes: [
      { metric: '経理時間の削減', description: '経営者・スタッフの経理作業をゼロに近づける', example: '月10時間の経理作業→ゼロに（個人事業主の例）' },
      { metric: '月次決算の早期化', description: '試算表の完成を前倒しし、経営判断のスピードを上げる', example: '月次試算表：翌月15日→翌月5日に（建設業の例）' },
      { metric: '税理士との関係改善', description: '正確な資料を期日通りに提出し、税務対応をスムーズに', example: '税理士への資料提出遅延：毎月→ゼロに' },
    ],
    flow: [
      { title: 'ヒアリング・プラン決定（1週間）', description: '現在の経理フロー・月間仕訳件数・使用している会計ソフトを確認し、最適なプランを提案します。' },
      { title: '初期設定・運用ルール整備（1〜2週間）', description: '会計ソフトの連携設定、勘定科目の整理、証憑の受け渡しルールを決めます。' },
      { title: '毎月の証憑受領・記帳処理', description: 'レシート・領収書・通帳データをクラウド共有またはスマホ撮影で受領。月末締めで翌月5日までに記帳完了。' },
      { title: '月次レポート提出・税理士連携', description: '試算表と経営サマリーレポートを提出。顧問税理士への資料提供も代行します。' },
    ],
    pricing: [
      { plan: 'ライト', amount: '2', unit: '万円〜/月', description: '仕訳数50件/月まで。個人事業主・フリーランス向け。' },
      { plan: 'スタンダード', amount: '3', unit: '万円〜/月', description: '仕訳数100件/月まで。小規模法人向け。', popular: true },
      { plan: 'プロ', amount: '5', unit: '万円〜/月', description: '仕訳数200件/月まで。成長企業向け。' },
    ],
    relatedServices: [
      { href: '/services/cloud-accounting/', icon: 'ri:cloud-line', name: 'クラウド会計導入', description: 'freee・マネーフォワードの導入支援。' },
      { href: '/services/data-analysis/', icon: 'ri:bar-chart-box-line', name: '経営データ分析', description: '会計データを活用した経営分析。' },
      { href: '/services/management-consulting/', icon: 'ri:line-chart-line', name: '経営改善', description: '財務面からの経営改善に対応。' },
    ],
    cta: {
      description: '「領収書が溜まっている……」——大丈夫です。<br>まとめて整理するところからお手伝いします。',
    },
  }),

  'cloud-accounting': createServiceData({
    id: 'cloud-accounting',
    title: 'クラウド会計導入',
    metaDescription: 'freee、マネーフォワードなどのクラウド会計ソフトの導入・移行を支援します。',
    icon: 'ri:cloud-line',
    priceRange: '10〜30',
    priceUnit: '万円/PJ',
    problems: [
      '弥生会計のデスクトップ版を使っているが、パソコンが壊れたらデータが消える不安がある',
      '銀行明細を1件ずつ手入力しており、毎月5時間以上かかっている',
      'テレワークを導入したいが、会計ソフトが会社のパソコンでしか使えない',
      'freeeかマネーフォワードを検討しているが、どちらが自社に合うか判断できない',
    ],
    useCases: [
      { scene: '個人事業主（コンサルタント）：弥生の青色申告を使っているが、銀行連携がなく手入力', action: 'freee会計に移行し、銀行口座3つ・クレジットカード2枚の自動連携を設定。勘定科目の自動仕訳ルールも構築', outcome: '月5時間の入力作業→30分に。確定申告も数クリックで完了する状態に' },
      { scene: '不動産管理会社（従業員4名）：経理担当が事務所でしか作業できず、月末に残業が集中', action: 'マネーフォワードクラウド会計に移行し、自宅からも経理業務ができる環境を構築。入出金の自動取込を設定', outcome: '月末の残業がゼロに。経理担当のテレワークが実現し、採用応募も増加' },
      { scene: '小売業（2店舗）：店舗ごとの売上を手動で会計ソフトに入力しており、部門別の損益が見えない', action: 'freee会計にPOS連携を設定し、店舗別の売上が自動で仕訳される仕組みを構築。部門タグで損益管理を実現', outcome: '店舗別損益がリアルタイムで把握可能に。赤字店舗のテコ入れ判断が迅速化' },
    ],
    features: [
      { icon: 'ri:refresh-line', title: '銀行・カード連携で入力作業を9割削減', description: '銀行口座・クレジットカード・電子マネーの取引データを自動取込。勘定科目の推測ルールも設定し、「確認してOKを押すだけ」の状態にします。' },
      { icon: 'ri:cloud-line', title: 'いつでもどこでも、複数人で同時アクセス', description: 'クラウドなので、事務所・自宅・外出先のどこからでも作業可能。社長と経理担当が同時にアクセスすることもできます。' },
      { icon: 'ri:bar-chart-box-line', title: '経営状況をリアルタイムで把握', description: '取引を入力（または自動取込）した瞬間に損益が更新されるため、月末を待たずに経営状況を把握できます。' },
      { icon: 'ri:graduation-cap-line', title: '実際の業務データで操作研修', description: 'マニュアルを渡して終わりにしません。御社の実際の取引データを使ってハンズオン研修を実施。「翌日から自分でできる」状態にします。' },
    ],
    expectedOutcomes: [
      { metric: '入力作業の大幅削減', description: '銀行・カード連携による自動取込で手入力をほぼゼロに', example: '月5時間の手入力→30分に（個人事業主の例）' },
      { metric: 'テレワーク対応', description: '場所を選ばず経理業務が可能に', example: '月末の残業がゼロに。経理担当のテレワークが実現（不動産管理会社の例）' },
      { metric: '月次決算の迅速化', description: '自動取込により月次の数字がリアルタイムで確定', example: '月次決算：翌月20日→翌月3日に早期化' },
    ],
    flow: [
      { title: '現状確認・ソフト選定（1週間）', description: '現在の会計フロー・取引量・利用サービスを確認し、freee・マネーフォワード・弥生オンラインから最適なソフトを選定。選定理由と費用比較も提示します。' },
      { title: '初期設定・データ移行（1〜2週間）', description: '勘定科目の設定、銀行・カード連携、開始残高の入力、過去データの移行を実施。データの正確性を検証します。' },
      { title: '自動仕訳ルール構築（1週間）', description: '頻出取引の勘定科目を自動判定するルールを設定。「カフェ代→会議費」「A銀行の引落→地代家賃」など、御社の取引パターンに合わせて構築。' },
      { title: '操作研修・フォローアップ（2週間〜）', description: '実際の取引データを使ったハンズオン研修を実施。研修後1ヶ月間は質問し放題のフォローアップ期間を設けます。' },
    ],
    pricing: [
      { plan: '新規導入', amount: '10', unit: '万円〜', description: '新規でクラウド会計を導入。初期設定＋連携＋研修込み。' },
      { plan: '移行サポート', amount: '20', unit: '万円〜', description: '既存ソフトからのデータ移行を含む導入。', popular: true },
      { plan: '導入+記帳代行', amount: '25', unit: '万円〜', description: '導入と3ヶ月の記帳代行をセットで。移行期間の安心パック。' },
    ],
    relatedServices: [
      { href: '/services/bookkeeping/', icon: 'ri:book-2-line', name: '記帳代行', description: 'クラウド会計での記帳を代行。' },
      { href: '/services/kpi-dashboard/', icon: 'ri:dashboard-3-line', name: 'KPIダッシュボード構築', description: '会計データを可視化するダッシュボード。' },
      { href: '/services/dx-consulting/', icon: 'ri:rocket-line', name: 'DX推進サポート', description: '経理DXを含む全社DXの推進。' },
    ],
    cta: {
      description: '「freeeとマネーフォワード、どっちがいい？」——その質問だけでも大歓迎です。<br>御社の状況に合ったソフトと導入の進め方をお伝えします。',
    },
  }),
};

/**
 * サービスデータを取得
 */
export function getServiceData(id: string): ServiceDetailData | undefined {
  return serviceData[id];
}

/**
 * 全サービスIDを取得
 */
export function getAllServiceIds(): string[] {
  return Object.keys(serviceData);
}
