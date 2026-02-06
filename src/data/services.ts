/**
 * サービス詳細データ
 * 各サービスページで使用するデータを一元管理
 */
import type { ServiceDetailData } from '@shared/contracts/components';

export const serviceData: Record<string, ServiceDetailData> = {
  'dx-consulting': {
    id: 'dx-consulting',
    title: 'DX推進サポート',
    metaDescription: '「DXって何から始めれば？」にお答えします。業務プロセスの見直しからシステム導入まで、御社のデジタル変革を伴走支援します。',
    icon: '🚀',
    name: 'DX推進サポート',
    tagline: '「DXって何から始めれば？」にお答えします。業務プロセスの見直しからシステム導入まで、御社のデジタル変革を伴走支援します。',
    priceRange: '13.5〜27',
    originalPriceRange: '15〜30',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円/月',
    problems: [
      '「DX」という言葉は聞くけど、何から始めればいいかわからない',
      '紙やExcelでの管理が限界だけど、システム導入のコストが心配',
      'IT導入を検討したいが、社内にわかる人がいない',
      'ベンダーの提案を評価できず、言いなりになってしまいそう',
    ],
    features: [
      { icon: '🎯', title: '経営視点でのIT提案', description: '中小企業診断士として、経営課題を踏まえた上で最適なIT活用を提案。「技術先行」ではなく「課題解決」を重視します。' },
      { icon: '🤝', title: '伴走型のサポート', description: '単発のアドバイスではなく、継続的に寄り添いながら変革を推進。社内に知見が蓄積するようサポートします。' },
      { icon: '💻', title: '技術がわかる', description: '7年のWeb開発経験があるからこそ、実装レベルまで踏み込んだ提案が可能。ベンダー選定や技術評価もお任せください。' },
      { icon: '📊', title: 'データ活用も得意', description: 'DXで生まれるデータを経営に活かす提案も。データ分析やダッシュボード構築まで一貫してサポートできます。' },
    ],
    flow: [
      { title: '現状把握・課題整理', description: 'ヒアリングを通じて業務プロセスと課題を可視化。本当に解決すべき課題を特定します。' },
      { title: '施策立案・ロードマップ策定', description: '課題に対する解決策を複数提案。優先度と投資対効果を踏まえたロードマップを作成します。' },
      { title: '導入支援・ベンダー調整', description: 'システム選定、ベンダー交渉、導入プロジェクト管理をサポート。御社の立場で伴走します。' },
      { title: '定着化・改善サイクル', description: '導入後の定着化と効果測定、継続的な改善をサポート。自走できる体制構築を目指します。' },
    ],
    pricing: [
      { plan: 'スポット相談', amount: '2.7', originalAmount: '3', unit: '万円〜/回', description: 'まずは相談だけしたい方向け。課題整理や方向性のアドバイスを行います。', discountLabel: '登録準備価格' },
      { plan: '月額顧問', amount: '13.5', originalAmount: '15', unit: '万円〜/月', description: '継続的な伴走支援。定期的なミーティングと随時相談で着実に変革を推進。', popular: true, discountLabel: '登録準備価格' },
      { plan: 'プロジェクト型', amount: '27', originalAmount: '30', unit: '万円〜/PJ', description: '特定のプロジェクト（システム導入等）に集中して支援。期間・範囲を明確に。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/ai-consulting/', icon: '🤖', name: '生成AI導入支援', description: 'ChatGPT・Claudeを業務に活かす方法を設計から導入まで支援。' },
      { href: '/services/data-analysis/', icon: '📊', name: '経営データ分析', description: 'DXで生まれるデータを経営判断に活かすための分析・可視化。' },
      { href: '/services/subsidy-support/', icon: '💰', name: '補助金申請サポート', description: 'IT導入補助金等を活用してDX投資の負担を軽減。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '御社の課題をお聞かせください。<br>最適なDX推進の進め方を一緒に考えましょう。',
    },
  },

  'ai-consulting': {
    id: 'ai-consulting',
    title: '生成AI導入支援',
    metaDescription: 'ChatGPT・Claude等の生成AIを業務に活かす方法を、設計から導入、定着まで一貫してサポートします。',
    icon: '🤖',
    name: '生成AI導入支援',
    tagline: 'ChatGPT・Claude等の生成AIを業務に活かす方法を、設計から導入、定着まで一貫してサポートします。',
    priceRange: '10〜30',
    priceUnit: '万円/月',
    problems: [
      '生成AIの話題は聞くけど、自社でどう使えばいいかわからない',
      '試しに使ってみたけど、業務に定着しなかった',
      'セキュリティやコンプライアンスが心配で導入に踏み切れない',
      '社員がAIを使いこなせるか不安',
    ],
    features: [
      { icon: '🎯', title: '業務に合わせた活用提案', description: '御社の業務フローを理解した上で、実際に効果が出る活用方法を提案します。' },
      { icon: '🛡️', title: 'セキュリティ対策', description: '情報漏洩リスクを考慮したガイドライン策定とツール選定をサポートします。' },
      { icon: '📚', title: '社員研修・定着支援', description: '使い方の研修から、日常業務への定着までしっかりサポートします。' },
      { icon: '⚡', title: '最新トレンドをキャッチアップ', description: '日進月歩のAI技術。最新動向を踏まえた提案を行います。' },
    ],
    flow: [
      { title: '業務ヒアリング', description: '現在の業務フローと課題を把握し、AI活用の可能性を探ります。' },
      { title: '活用プラン策定', description: 'ROIを考慮した活用シナリオと導入計画を作成します。' },
      { title: 'PoC・試験導入', description: '小規模な実証実験で効果を検証し、課題を洗い出します。' },
      { title: '本格導入・定着化', description: '研修実施と運用ルール整備で、組織への定着を図ります。' },
    ],
    pricing: [
      { plan: 'スポット相談', amount: '3', unit: '万円〜/回', description: 'AI活用の方向性を相談したい方向け。' },
      { plan: '導入支援パック', amount: '20', unit: '万円〜', description: '計画策定から研修まで一気通貫でサポート。', popular: true },
      { plan: '継続サポート', amount: '10', unit: '万円〜/月', description: '導入後の運用改善と最新情報の提供。' },
    ],
    relatedServices: [
      { href: '/services/ai-tools/', icon: '🛠️', name: 'AIツール開発', description: '御社専用のAIツールを開発・カスタマイズ。' },
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'AI導入を含む全社的なDX戦略の立案・実行。' },
      { href: '/services/data-analysis/', icon: '📊', name: '経営データ分析', description: 'AIと組み合わせたデータ活用で意思決定を高度化。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '生成AIの活用方法について、お気軽にご相談ください。<br>御社に合った導入プランをご提案します。',
    },
  },

  'it-strategy': {
    id: 'it-strategy',
    title: 'IT戦略立案',
    metaDescription: '経営戦略とIT投資を連動させ、中長期的な視点でのIT戦略を策定します。',
    icon: '🎯',
    name: 'IT戦略立案',
    tagline: '経営戦略とIT投資を連動させ、中長期的な視点でのIT戦略を策定します。',
    priceRange: '13.5〜45',
    originalPriceRange: '15〜50',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円',
    problems: [
      'IT投資の優先順位が決められない',
      'システムが乱立して全体像が見えない',
      '経営戦略とIT施策が連動していない',
      '中長期的なIT計画がない',
    ],
    features: [
      { icon: '🗺️', title: '経営戦略との連動', description: '経営目標を達成するためのIT戦略を策定。投資対効果を明確にします。' },
      { icon: '📋', title: 'ロードマップ作成', description: '3〜5年の中長期計画を策定し、段階的な実行プランを提示します。' },
      { icon: '💡', title: '投資判断の支援', description: 'IT投資の優先順位付けと費用対効果の評価をサポートします。' },
      { icon: '🔄', title: '定期的な見直し', description: '環境変化に応じて戦略を柔軟に見直す体制を構築します。' },
    ],
    flow: [
      { title: '現状分析', description: '既存システムの棚卸しと経営課題の整理を行います。' },
      { title: '戦略策定', description: '経営戦略を踏まえたIT戦略とロードマップを策定します。' },
      { title: '計画策定', description: '具体的な施策と投資計画、スケジュールを作成します。' },
      { title: '実行支援', description: '戦略実行のモニタリングと適宜見直しを行います。' },
    ],
    pricing: [
      { plan: 'IT戦略策定', amount: '45', originalAmount: '50', unit: '万円〜', description: '経営戦略に基づいたIT戦略とロードマップを策定。', popular: true, discountLabel: '登録準備価格' },
      { plan: '年間顧問', amount: '13.5', originalAmount: '15', unit: '万円〜/月', description: '戦略の実行支援と定期的な見直しをサポート。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'IT戦略に基づくDX施策の実行を支援。' },
      { href: '/services/management-consulting/', icon: '📈', name: '経営支援', description: 'IT戦略と連動した経営改善をサポート。' },
      { href: '/services/data-analysis/', icon: '📊', name: '経営データ分析', description: 'データに基づく戦略立案を支援。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '御社のIT戦略について、お気軽にご相談ください。<br>経営目標達成に向けた最適なプランをご提案します。',
    },
  },

  'ai-tools': {
    id: 'ai-tools',
    title: 'AIツール開発',
    metaDescription: '御社の業務に特化したAIツールを開発・カスタマイズ。ChatGPTやClaudeを活用した業務効率化ツールを構築します。',
    icon: '🛠️',
    name: 'AIツール開発',
    tagline: '御社の業務に特化したAIツールを開発・カスタマイズ。ChatGPTやClaudeを活用した業務効率化ツールを構築します。',
    priceRange: '30〜100',
    priceUnit: '万円/PJ',
    problems: [
      '既存のAIツールでは自社の業務に合わない',
      'プロンプトを毎回書くのが面倒',
      '社内のナレッジをAIに活用させたい',
      '業務フローに組み込んだ自動化がしたい',
    ],
    features: [
      { icon: '🎨', title: 'カスタム開発', description: '御社の業務に最適化したAIツールをオーダーメイドで開発します。' },
      { icon: '🔗', title: 'システム連携', description: '既存の業務システムやSaaSとの連携も対応可能です。' },
      { icon: '📚', title: 'ナレッジ活用', description: '社内文書やFAQをAIに学習させ、独自の知識ベースを構築。' },
      { icon: '⚙️', title: '運用サポート', description: '開発後の改善や機能追加もサポートします。' },
    ],
    flow: [
      { title: '要件定義', description: '実現したい機能と業務フローを詳細にヒアリングします。' },
      { title: '設計・プロトタイプ', description: 'システム設計を行い、動くプロトタイプを作成します。' },
      { title: '開発・テスト', description: '本番環境に向けた開発とテストを実施します。' },
      { title: 'リリース・運用', description: '本番リリースと運用開始、改善サイクルを回します。' },
    ],
    pricing: [
      { plan: 'シンプルツール', amount: '30', unit: '万円〜', description: '単機能のAIツール開発。' },
      { plan: '業務システム連携', amount: '50', unit: '万円〜', description: '既存システムとの連携を含む開発。', popular: true },
      { plan: '大規模開発', amount: '100', unit: '万円〜', description: '複数機能・複雑な要件の開発。' },
    ],
    relatedServices: [
      { href: '/services/ai-consulting/', icon: '🤖', name: '生成AI導入支援', description: 'AIツールの活用戦略から定着まで支援。' },
      { href: '/services/web-development/', icon: '🌐', name: 'Web開発・システム構築', description: 'Webアプリケーション全般の開発。' },
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'AIを活用したDX全体の推進。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '御社専用のAIツール開発について、お気軽にご相談ください。<br>要件をヒアリングの上、最適な提案をいたします。',
    },
  },

  'web-development': {
    id: 'web-development',
    title: 'Web開発・システム構築',
    metaDescription: 'コーポレートサイトから業務システムまで、御社のニーズに合わせたWeb開発・システム構築を行います。',
    icon: '🌐',
    name: 'Web開発・システム構築',
    tagline: 'コーポレートサイトから業務システムまで、御社のニーズに合わせたWeb開発・システム構築を行います。',
    priceRange: '30〜200',
    priceUnit: '万円/PJ',
    problems: [
      'ホームページが古くなって更新もできていない',
      '業務に合ったシステムがなく、手作業が多い',
      'エクセルでの管理が限界に達している',
      'ベンダーに依頼したいが、要件をうまく伝えられない',
    ],
    features: [
      { icon: '💻', title: '幅広い開発経験', description: '12年のWeb開発経験を活かし、小規模サイトから業務システムまで対応。' },
      { icon: '🎨', title: 'デザインも対応', description: 'UI/UXを考慮した使いやすいデザインを提案します。' },
      { icon: '📱', title: 'レスポンシブ対応', description: 'スマホ・タブレットでも快適に使えるサイト・システムを構築。' },
      { icon: '🔧', title: '保守・運用', description: '開発後の保守・機能追加もお任せください。' },
    ],
    flow: [
      { title: '要件ヒアリング', description: '実現したいこと、現在の課題を詳しくお聞きします。' },
      { title: '設計・見積り', description: 'システム設計と詳細な見積りを提示します。' },
      { title: '開発・テスト', description: '進捗を共有しながら開発を進め、テストを実施します。' },
      { title: 'リリース・保守', description: '本番公開と、その後の保守・改善を行います。' },
    ],
    pricing: [
      { plan: 'コーポレートサイト', amount: '30', unit: '万円〜', description: '会社紹介サイトの制作。' },
      { plan: 'Webアプリケーション', amount: '80', unit: '万円〜', description: '業務システム・Webサービスの開発。', popular: true },
      { plan: '大規模システム', amount: '200', unit: '万円〜', description: '複雑な業務要件に対応したシステム開発。' },
    ],
    relatedServices: [
      { href: '/services/ai-tools/', icon: '🛠️', name: 'AIツール開発', description: 'AIを活用した業務効率化ツールの開発。' },
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'システム導入を含むDX全体の推進。' },
      { href: '/services/kpi-dashboard/', icon: '📊', name: 'KPIダッシュボード構築', description: '経営指標を可視化するダッシュボード。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: 'Webサイト・システム開発について、お気軽にご相談ください。<br>御社の要件に合った最適な提案をいたします。',
    },
  },

  'data-analysis': {
    id: 'data-analysis',
    title: '経営データ分析',
    metaDescription: '売上・顧客・業務データを分析し、経営判断に活かせるインサイトを提供します。',
    icon: '📊',
    name: '経営データ分析',
    tagline: '売上・顧客・業務データを分析し、経営判断に活かせるインサイトを提供します。',
    priceRange: '8〜40',
    originalPriceRange: '10〜50',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円/PJ',
    problems: [
      'データはあるが、活用できていない',
      '感覚や経験に頼った意思決定をしている',
      '分析したいが、やり方がわからない',
      'レポート作成に時間がかかっている',
    ],
    features: [
      { icon: '🔍', title: 'データの可視化', description: '複雑なデータをわかりやすいグラフや図表で可視化します。' },
      { icon: '💡', title: 'インサイト抽出', description: 'データから経営に役立つ気づきを見つけ出します。' },
      { icon: '📈', title: '予測・シミュレーション', description: '将来予測や施策のシミュレーションを行います。' },
      { icon: '🔄', title: 'レポート自動化', description: '定期レポートの自動作成の仕組みを構築します。' },
    ],
    flow: [
      { title: 'データ確認', description: '利用可能なデータと分析目的を確認します。' },
      { title: '分析設計', description: '分析の切り口と手法を設計します。' },
      { title: '分析実施', description: 'データの加工・分析を実施します。' },
      { title: 'レポート・提言', description: '分析結果をレポートにまとめ、施策を提言します。' },
    ],
    pricing: [
      { plan: 'スポット分析', amount: '12', originalAmount: '15', unit: '万円〜', description: '特定のテーマに絞った単発の分析。', discountLabel: '登録準備価格' },
      { plan: '継続分析', amount: '8', originalAmount: '10', unit: '万円〜/月', description: '定期的なデータ分析とレポート提供。', popular: true, discountLabel: '登録準備価格' },
      { plan: '分析基盤構築', amount: '40', originalAmount: '50', unit: '万円〜', description: '自社で分析できる基盤の構築。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/kpi-dashboard/', icon: '📊', name: 'KPIダッシュボード構築', description: '分析結果を常に見られるダッシュボードを構築。' },
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'データ活用を軸としたDX推進。' },
      { href: '/services/management-consulting/', icon: '📈', name: '経営支援', description: 'データに基づく経営改善の支援。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: 'データ活用について、お気軽にご相談ください。<br>御社のデータから価値を引き出すお手伝いをします。',
    },
  },

  'kpi-dashboard': {
    id: 'kpi-dashboard',
    title: 'KPIダッシュボード構築',
    metaDescription: '経営指標をリアルタイムで可視化するダッシュボードを構築し、データドリブンな意思決定を支援します。',
    icon: '📊',
    name: 'KPIダッシュボード構築',
    tagline: '経営指標をリアルタイムで可視化するダッシュボードを構築し、データドリブンな意思決定を支援します。',
    priceRange: '30〜80',
    priceUnit: '万円/PJ',
    problems: [
      '経営数値の把握に時間がかかる',
      '部門ごとにデータがバラバラ',
      'Excelでのレポート作成が負担',
      'リアルタイムで状況を把握したい',
    ],
    features: [
      { icon: '⚡', title: 'リアルタイム更新', description: 'データを自動で収集・更新し、常に最新の状況を把握できます。' },
      { icon: '🎨', title: '見やすいデザイン', description: '一目で状況がわかる、直感的なダッシュボードを設計します。' },
      { icon: '🔗', title: '各種データ連携', description: '会計ソフト、SFA、ECなど各種システムからデータを集約。' },
      { icon: '📱', title: 'モバイル対応', description: 'スマホやタブレットからもいつでも確認できます。' },
    ],
    flow: [
      { title: 'KPI設計', description: '可視化すべき指標と更新頻度を決定します。' },
      { title: 'データ連携設計', description: 'データソースの特定と連携方法を設計します。' },
      { title: 'ダッシュボード構築', description: 'ツール選定と実装を行います。' },
      { title: '運用開始・改善', description: '運用を開始し、フィードバックに基づき改善します。' },
    ],
    pricing: [
      { plan: 'シンプル構築', amount: '30', unit: '万円〜', description: '単一データソースのダッシュボード。' },
      { plan: '統合ダッシュボード', amount: '50', unit: '万円〜', description: '複数システムからのデータ統合。', popular: true },
      { plan: 'エンタープライズ', amount: '80', unit: '万円〜', description: '大規模データ・高度な分析機能。' },
    ],
    relatedServices: [
      { href: '/services/data-analysis/', icon: '📊', name: '経営データ分析', description: 'ダッシュボードのデータを深堀り分析。' },
      { href: '/services/cloud-accounting/', icon: '☁️', name: 'クラウド会計導入', description: '会計データの連携で財務状況を可視化。' },
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'データ活用を軸としたDX推進。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: 'KPIダッシュボードについて、お気軽にご相談ください。<br>御社の経営判断を支えるダッシュボードを構築します。',
    },
  },

  'management-consulting': {
    id: 'management-consulting',
    title: '経営支援',
    metaDescription: '中小企業診断士として、経営課題の整理から改善施策の実行まで伴走支援します。',
    icon: '📈',
    name: '経営支援',
    tagline: '中小企業診断士として、経営課題の整理から改善施策の実行まで伴走支援します。',
    priceRange: '8〜24',
    originalPriceRange: '10〜30',
    discountReason: '中小企業診断士の登録準備中につき特別価格でご提供',
    priceUnit: '万円/月',
    problems: [
      '漠然とした経営課題を整理したい',
      '売上・利益を改善したいが、何から手をつければいいかわからない',
      '新規事業や事業転換を検討している',
      '経営の相談相手がいない',
    ],
    features: [
      { icon: '🎯', title: '経営課題の整理', description: '漠然とした課題を構造化し、優先順位をつけます。' },
      { icon: '📊', title: 'データに基づく提案', description: '財務分析や市場分析に基づいた客観的な提案を行います。' },
      { icon: '🤝', title: '伴走型支援', description: '計画を立てるだけでなく、実行段階まで寄り添います。' },
      { icon: '💻', title: 'IT活用の視点', description: 'IT×経営の両面から課題解決をサポートします。' },
    ],
    flow: [
      { title: '現状分析', description: '経営状況と課題を詳しくヒアリング・分析します。' },
      { title: '課題の特定', description: '根本的な課題を特定し、優先順位をつけます。' },
      { title: '施策立案', description: '具体的な改善施策とアクションプランを策定します。' },
      { title: '実行支援', description: '施策の実行を伴走しながらサポートします。' },
    ],
    pricing: [
      { plan: 'スポット相談', amount: '2.4', originalAmount: '3', unit: '万円〜/回', description: '特定のテーマについての相談。', discountLabel: '登録準備価格' },
      { plan: '月次顧問', amount: '8', originalAmount: '10', unit: '万円〜/月', description: '定期的なミーティングと随時相談。', popular: true, discountLabel: '登録準備価格' },
      { plan: 'プロジェクト型', amount: '24', originalAmount: '30', unit: '万円〜/PJ', description: '特定の課題に集中して取り組む。', discountLabel: '登録準備価格' },
    ],
    relatedServices: [
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'IT活用による経営改善を推進。' },
      { href: '/services/data-analysis/', icon: '📊', name: '経営データ分析', description: 'データに基づく経営判断を支援。' },
      { href: '/services/subsidy-support/', icon: '💰', name: '補助金申請サポート', description: '経営改善に活用できる補助金を申請。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '経営のお悩みをお聞かせください。<br>一緒に課題を整理し、改善の道筋を考えましょう。',
    },
  },

  'subsidy-support': {
    id: 'subsidy-support',
    title: '補助金申請サポート',
    metaDescription: 'IT導入補助金、ものづくり補助金など、御社の事業に活用できる補助金の申請を支援します。',
    icon: '💰',
    name: '補助金申請サポート',
    tagline: 'IT導入補助金、ものづくり補助金など、御社の事業に活用できる補助金の申請を支援します。',
    priceRange: '成功報酬',
    priceUnit: '10〜15%',
    problems: [
      '補助金があることは知っているが、申請方法がわからない',
      '申請書類の作成に時間が取れない',
      '過去に申請したが不採択だった',
      'どの補助金が自社に合っているかわからない',
    ],
    features: [
      { icon: '🔍', title: '最適な補助金の提案', description: '御社の事業計画に合った補助金を調査・提案します。' },
      { icon: '📝', title: '申請書類の作成', description: '採択率を高める申請書類の作成をサポートします。' },
      { icon: '📋', title: '事業計画の策定', description: '補助金申請に必要な事業計画の策定を支援します。' },
      { icon: '✅', title: '採択後のフォロー', description: '採択後の実績報告まで一貫してサポートします。' },
    ],
    flow: [
      { title: '補助金の選定', description: '御社の事業に適した補助金を調査・選定します。' },
      { title: '事業計画策定', description: '申請に必要な事業計画を一緒に策定します。' },
      { title: '申請書類作成', description: '申請書類を作成し、提出をサポートします。' },
      { title: '採択後支援', description: '採択後の事業実施と報告をサポートします。' },
    ],
    pricing: [
      { plan: '着手金', amount: '5', unit: '万円〜', description: '申請準備の着手金。' },
      { plan: '成功報酬', amount: '10〜15', unit: '%', description: '採択された補助金額に対する成功報酬。', popular: true },
    ],
    relatedServices: [
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: 'IT導入補助金を活用したDX推進。' },
      { href: '/services/management-consulting/', icon: '📈', name: '経営支援', description: '補助金を活用した経営改善。' },
      { href: '/services/web-development/', icon: '🌐', name: 'Web開発・システム構築', description: '補助金を活用したシステム導入。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '補助金活用について、お気軽にご相談ください。<br>御社の事業に合った補助金をご提案します。',
    },
  },

  'bookkeeping': {
    id: 'bookkeeping',
    title: '記帳代行',
    metaDescription: '日々の経理業務を代行し、経営者が本業に集中できる環境を作ります。',
    icon: '📒',
    name: '記帳代行',
    tagline: '日々の経理業務を代行し、経営者が本業に集中できる環境を作ります。',
    priceRange: '2〜5',
    priceUnit: '万円/月',
    problems: [
      '経理作業に時間を取られて本業に集中できない',
      '経理担当者がいない・退職した',
      '記帳が溜まってしまっている',
      '税理士とのやり取りがスムーズにいかない',
    ],
    features: [
      { icon: '⏰', title: '時間の創出', description: '経理作業を代行し、経営者の時間を確保します。' },
      { icon: '✅', title: '正確な記帳', description: '会計事務所経験を活かした正確な記帳を行います。' },
      { icon: '📊', title: '月次レポート', description: '毎月の経営状況をわかりやすくレポートします。' },
      { icon: '🤝', title: '税理士連携', description: '顧問税理士との連携もスムーズに行います。' },
    ],
    flow: [
      { title: 'ヒアリング', description: '現在の経理フローと課題を確認します。' },
      { title: '資料受領', description: '毎月の証憑類をお預かりします。' },
      { title: '記帳処理', description: '会計ソフトへの記帳を代行します。' },
      { title: 'レポート提出', description: '月次レポートと試算表をお届けします。' },
    ],
    pricing: [
      { plan: 'ライト', amount: '2', unit: '万円〜/月', description: '仕訳数50件/月まで。小規模事業者向け。' },
      { plan: 'スタンダード', amount: '3.5', unit: '万円〜/月', description: '仕訳数100件/月まで。', popular: true },
      { plan: 'プロ', amount: '5', unit: '万円〜/月', description: '仕訳数200件/月まで。成長企業向け。' },
    ],
    relatedServices: [
      { href: '/services/cloud-accounting/', icon: '☁️', name: 'クラウド会計導入', description: 'freee・マネーフォワードの導入支援。' },
      { href: '/services/data-analysis/', icon: '📊', name: '経営データ分析', description: '会計データを活用した経営分析。' },
      { href: '/services/management-consulting/', icon: '📈', name: '経営支援', description: '財務面からの経営改善支援。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: '経理業務の負担軽減について、お気軽にご相談ください。<br>御社に合ったプランをご提案します。',
    },
  },

  'cloud-accounting': {
    id: 'cloud-accounting',
    title: 'クラウド会計導入',
    metaDescription: 'freee、マネーフォワードなどのクラウド会計ソフトの導入・移行を支援します。',
    icon: '☁️',
    name: 'クラウド会計導入',
    tagline: 'freee、マネーフォワードなどのクラウド会計ソフトの導入・移行を支援します。',
    priceRange: '10〜30',
    priceUnit: '万円/PJ',
    problems: [
      'デスクトップの会計ソフトが使いづらい',
      '銀行明細の入力に時間がかかっている',
      'リモートで経理作業ができない',
      'クラウド会計に興味はあるが、移行が不安',
    ],
    features: [
      { icon: '🔄', title: '自動連携', description: '銀行・クレジットカードとの自動連携で入力作業を削減。' },
      { icon: '☁️', title: 'どこでもアクセス', description: 'クラウドなので、いつでもどこでも作業可能。' },
      { icon: '📊', title: 'リアルタイム把握', description: '経営状況をリアルタイムで把握できます。' },
      { icon: '🎓', title: '操作研修', description: '導入後の操作研修で定着をサポート。' },
    ],
    flow: [
      { title: '現状確認', description: '現在の会計フローと要件を確認します。' },
      { title: 'ソフト選定', description: '御社に最適なクラウド会計ソフトを選定します。' },
      { title: '初期設定・移行', description: '初期設定とデータ移行を行います。' },
      { title: '研修・定着', description: '操作研修を実施し、定着をサポートします。' },
    ],
    pricing: [
      { plan: '新規導入', amount: '10', unit: '万円〜', description: '新規でクラウド会計を導入。' },
      { plan: '移行サポート', amount: '20', unit: '万円〜', description: '既存ソフトからの移行を含む導入。', popular: true },
      { plan: '導入+記帳代行', amount: '25', unit: '万円〜', description: '導入と3ヶ月の記帳代行をセットで。' },
    ],
    relatedServices: [
      { href: '/services/bookkeeping/', icon: '📒', name: '記帳代行', description: 'クラウド会計での記帳を代行。' },
      { href: '/services/kpi-dashboard/', icon: '📊', name: 'KPIダッシュボード構築', description: '会計データを可視化するダッシュボード。' },
      { href: '/services/dx-consulting/', icon: '🚀', name: 'DX推進サポート', description: '経理DXを含む全社DXの推進。' },
    ],
    cta: {
      title: 'まずは無料相談から',
      description: 'クラウド会計の導入について、お気軽にご相談ください。<br>御社に最適なソフトと導入プランをご提案します。',
    },
  },
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
