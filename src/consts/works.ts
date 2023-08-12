interface Link {
	name: string
	url: string
}

export interface WorkType {
	id: string
	title: string
	productLink: string
	links: Link[]
	description: string
	longDescription: string
	imagePath: string
}

export const works: WorkType[] = [
	{
		id: 'tuitui',
		title: 'tuitui',
		productLink: '',
		links: [
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1808/' },
			{
				name: '発表スライド(チーム：ずんだ食べ食べ委員会)',
				url: 'https://www.pref.miyagi.jp/soshiki/sangyod/hackathon.html',
			},
		],
		description: 'みやぎハッカソンで制作した、直感観光地検索サービス。',
		longDescription:
			'みやぎハッカソンで制作した、直感観光地検索サービス。\n現在位置に近い観光地の画像を一覧で表示し、タップしたら詳細情報を見ることができるようになっている。また、地図で基準となる位置を選択したり、ジャンルを選択したりして検索することも可能。\nマイナンバーカードと連携して、クーポンの利用や統計情報を管理者に送信して地域の活性化に役立てることができる。\n自分は主に観光地の詳細ページと地図から検索ページ、通信周り全般に関わっていて、デザインメンバーと相談しながら細かい仕様を練ったり、バックエンドのメンバーと一緒に通信周りのバグの解消を行ったりもした。',
		imagePath: '/assets/tuitui.jpg',
	},
	{
		id: 'tikz',
		title: 'I love TikZ',
		productLink: 'https://hackathon-22spring-13.github.io/client/',
		links: [
			{
				name: 'GitHub',
				url: 'https://github.com/hackathon-22spring-13/client',
			},
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1623/' },
		],
		description:
			'traPの2022春ハッカソンで作った、描いた絵をTikZ形式のテキストに変換できるツール。',
		longDescription:
			'traPの2022春ハッカソンで作った、描いた絵をTikZ形式のテキストに変換できるツール。チームラボ賞をいただいた。\nクライアントはNext.js+Fabric.js、サーバーはPython+SVG2TikZを使っている。自分はクライアントを1人で担当した。',
		imagePath: '/assets/IloveTikZ.png',
	},
	{
		id: 'study',
		title: '勉強時間管理アプリ',
		productLink: 'https://mehm8128-study-client.vercel.app/',
		links: [
			{
				name: 'GitHub(フロントエンド)',
				url: 'https://github.com/mehm8128/mehm8128_study_client',
			},
			{
				name: 'GitHub(バックエンド)',
				url: 'https://github.com/mehm8128/mehm8128-study-server',
			},
		],
		description: '勉強時間を記録できるサービス。',
		longDescription:
			'勉強時間記録と目標を他の人と共有できるサービス。受験期に使っていたアプリを参考にして作った。Next.jsで作っていて、UIフレームワークにWindi CSS+Ant designを使った。単語暗記機能もある。',
		imagePath: '/assets/study.png',
	},
	{
		id: 'traquest',
		title: 'traQuest',
		productLink: '',
		links: [
			{
				name: 'GitHub(フロントエンド)',
				url: 'https://github.com/mehm8128/traQuest-UI',
			},
			{
				name: 'GitHub(バックエンド)',
				url: 'https://github.com/mehm8128/traQuest-server',
			},
		],
		description:
			'新入生にtraQの使い方に慣れてもらいやすくするために作ったクエスト形式のアプリ。',
		longDescription:
			'新入生に部内サービスtraQの使い方に慣れてもらいやすくするために作ったクエスト形式のアプリ(部員認証が必要なため、URLは掲載していません)。クエストの作成申請を出し、adminがapproveしたら一覧に反映される。ポイント数のランキングもある。\nNext.jsのapp routerを使ってみた。',
		imagePath: '/assets/traquest.png',
	},
	{
		id: 'thanqyou',
		title: 'ThanQ-you',
		productLink: '',
		links: [{ name: 'GitHub', url: 'https://github.com/mehm8128/thanQ-you' }],
		description: '部員同士が感謝を伝えるためのアプリ。',
		longDescription:
			'部員同士が感謝を伝えるためのアプリ。メッセージとともにコーヒーを送れる(部員認証が必要なため、URLは掲載していません)。感謝されたら部内SNSのDMにBOTから通知がくるようになっている。\nNext.jsのapi routesを使ってサーバーも実装してみた。',
		imagePath: '/assets/thanqyou.png',
	},
	{
		id: 'progreesstree',
		title: '進捗が木になる～',
		productLink: '',
		links: [
			{ name: 'GitHub', url: 'https://github.com/traP-jp/h23s_20_frontend' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1915/' },
		],
		description: '進捗に応じて木が成長するアプリ。',
		longDescription:
			'traPの2023春ハッカソンで作った、進捗に応じて木が成長するアプリ(サーバーが完成していないのでURLは掲載していません)。GitHubのcontributionやAtCoderのAC、サークル内SNSの進捗報告チャンネルでの報告などで自動で木が成長する。\nフロントエンドを担当し、デザインを考えるのと、ReactPixiを用いて木を描画する部分を主に担当した。',
		imagePath: '/assets/progresstree.png',
	},
	{
		id: 'questions',
		title: 'Questions',
		productLink: 'https://questions-ui-silk.vercel.app/',
		links: [
			{ name: 'GitHub', url: 'https://github.com/mehm8128/questions-UI' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1842/' },
		],
		description: 'traP向け専用質問箱サービス。',
		longDescription:
			'traP向け専用質問箱サービス。新歓の時期に質問箱を使って質問を募集しているが、不便な点がいくつかあったので作った。質問がきたときに部内SNSに通知がくるようになっていて、回答には回答者の名前も一緒に表示されるようになっている。\nフロントエンドを担当し、Next.jsで作った。デザインは考えるのがあまり得意でないので、TailwindCSSを採用してChatGPTにclassNameの部分を埋めてもらうように指示して作ってもらった。',
		imagePath: '/assets/questions.png',
	},
	{
		id: 'palamo',
		title: 'Palamo',
		productLink: 'https://frontend-opal-delta-19.vercel.app',
		links: [
			{ name: 'GitHub', url: 'https://github.com/mehm8128/frontend' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1456/' },
		],
		description: 'traPの2021冬ハッカソンで作った場所法援助アプリ。',
		longDescription:
			'traPの2021冬ハッカソンで作った場所法援助アプリ。クライアントを担当した。クライアントはReact、サーバーはGoで作られている。\n自分が担当したのは宮殿一覧、テンプレート一覧やクイズ機能、通信周りなど。',
		imagePath: '/assets/palamo.png',
	},
	{
		id: 'traqbot',
		title: 'traQBot',
		productLink: '',
		links: [
			{ name: 'GitHub', url: 'https://github.com/mehm8128/traq-mehm8128-bot' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1646/' },
		],
		description: 'traP内SNSのtraQで使用しているtraQBot。',
		longDescription:
			'Node.jsを使ってtraQBotを作った。ライブラリはhubot-traqを使った。主な機能としてはブログリレーのリマインダーやtraQでの投稿数に応じてGitHubの草のような表示をしてくれるものなどがある。',
		imagePath: '/assets/traQBot.png',
	},
	{
		id: 'git',
		title: '自作Git',
		productLink: '',
		links: [
			{ name: 'GitHub', url: 'https://github.com/mehm8128/git' },
			{ name: 'ブログ記事', url: 'https://trap.jp/post/1775/' },
		],
		description: '自作Git。いくつかの簡単な機能を実装した。',
		longDescription:
			'自作Git。様々な記事を参考にして、いくつかの簡単な機能をGoで実装した。詳細はブログ記事参照。',
		imagePath: '',
	},
	{
		id: 'eslint',
		title: 'eslint-plugin-no-relative-path',
		productLink: 'https://www.npmjs.com/package/eslint-plugin-no-relative-path',
		links: [
			{
				name: 'GitHub',
				url: 'https://github.com/mehm8128/eslint-plugin-no-relative-path',
			},
			{
				name: 'npm',
				url: 'https://www.npmjs.com/package/eslint-plugin-no-relative-path',
			},
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1777/' },
		],
		description:
			'ESLintのプラグインを自作した。importに相対パスを使用するのを禁止する。',
		longDescription:
			'ESLintのプラグインを自作した。importに相対パスを使用するのを禁止する。JavaScriptで書いている。',
		imagePath: '',
	},
]
