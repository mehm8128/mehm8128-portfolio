interface Link {
	name: string
	url: string
}

export interface WorkType {
	title: string
	productLink: string
	links: Link[]
	description: string
	longDescription: string
	imagePath: string
}

export const works: WorkType[] = [
	{
		title: 'tuitui',
		productLink: '準備中',
		links: [
			{ name: 'Github', url: '準備中' },
			{ name: 'traPブログ記事', url: '準備中' },
		],
		description: 'みやぎハッカソンで制作した、直感観光地検索サービス。',
		longDescription:
			'みやぎハッカソンで制作した、直感観光地検索サービス。現在位置に近い観光地の画像を一覧で表示し、タップしたら詳細情報を見ることができるようになっている。また、地図で基準となる位置を選択したり、ジャンルを選択したりして検索することも可能。マイナンバーカードと連携して、クーポンの利用や統計情報を管理者に送信して地域の活性化に役立てることができる。',
		imagePath: '/assets/IloveTikZ.png',
	},
	{
		title: 'I love TikZ',
		productLink: 'https://hackathon-22spring-13.github.io/client/',
		links: [
			{ name: 'Github', url: 'https://github.com/hackathon-22spring-13/client' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1623/' },
		],
		description: 'traPの2022春ハッカソンで作った、描いた絵をTikZ形式のテキストに変換できるツール。',
		longDescription:
			'traPの2022春ハッカソンで作った、描いた絵をTikZ形式のテキストに変換できるツール。チームラボ賞をいただいた。\nクライアントはNext.js+Fabric.js、サーバーはPython+SVG2TikZを使っている。自分はクライアントを1人で担当した。',
		imagePath: '/assets/IloveTikZ.png',
	},
	{
		title: '勉強時間管理アプリ',
		productLink: 'https://mehm8128-study-client.vercel.app/',
		links: [
			{
				name: 'Github(フロントエンド)',
				url: 'https://github.com/mehm8128/mehm8128_study_client',
			},
			{
				name: 'Github(バックエンド)',
				url: 'https://github.com/mehm8128/mehm8128-study-server',
			},
		],
		description: '勉強時間を記録できるサービス。',
		longDescription:
			'勉強時間記録と目標を他の人と共有できるサービス。受験期に使っていたアプリを参考にして作った。Next.jsで作っていて、UIフレームワークにWindi CSS+Ant designを使った。単語暗記機能もある。',
		imagePath: '/assets/study.png',
	},
	{
		title: 'Palamo',
		productLink: 'https://frontend-opal-delta-19.vercel.app',
		links: [{ name: 'Github', url: 'https://github.com/mehm8128/frontend' }],
		description: 'traPの2021冬ハッカソンで作った場所法援助アプリ。',
		longDescription:
			'traPの2021冬ハッカソンで作った場所法援助アプリ。クライアントを担当した。クライアントはReact、サーバーはGoで作られている。\n自分が担当したのは宮殿一覧、テンプレート一覧やクイズ機能、通信周りなど。',
		imagePath: '/assets/palamo.png',
	},
	{
		title: 'traQBot',
		productLink: '',
		links: [{ name: 'Github', url: 'https://github.com/mehm8128/traq-mehm8128-bot' }],
		description: 'traP内SNSのtraQで使用しているtraQBot。',
		longDescription:
			'Node.jsを使ってtraQBotを作った。ライブラリはhubot-traqを使った。デプロイはtraP内サービスのshowcaseを使っている。機能はGithubのReadme参照。',
		imagePath: '/assets/traQBot.png',
	},
	{
		title: '自作Git',
		productLink: '',
		links: [{ name: 'Github', url: 'https://github.com/mehm8128/git' }],
		description: '自作Git。いくつかの簡単な機能を実装した。',
		longDescription:
			'自作Git。様々な記事を参考にして、いくつかの簡単な機能をGoで実装した。現在実装されているのはなんたらかんたら。',
		imagePath: '',
	},
	{
		title: 'eslint-plugin-no-relative-path',
		productLink: 'https://www.npmjs.com/package/eslint-plugin-no-relative-path',
		links: [{ name: 'Github', url: 'https://github.com/mehm8128/eslint-plugin-no-relative-path' }],
		description: 'ESLintのプラグインを自作した。importに相対パスを使用するのを禁止する。',
		longDescription:
			'ESLintのプラグインを自作した。importに相対パスを使用するのを禁止する。JavaScriptで書いている。',
		imagePath: '',
	},
]
