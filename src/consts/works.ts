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
		productLink: 'http://frontend.zundatabe2committee.trap.show/',
		links: [
			//	{ name: 'traPブログ記事', url: '' }
		],
		description: 'みやぎハッカソンで制作した、直感観光地検索サービス。',
		longDescription:
			'みやぎハッカソンで制作した、直感観光地検索サービス。\n現在位置に近い観光地の画像を一覧で表示し、タップしたら詳細情報を見ることができるようになっている。また、地図で基準となる位置を選択したり、ジャンルを選択したりして検索することも可能。\nマイナンバーカードと連携して、クーポンの利用や統計情報を管理者に送信して地域の活性化に役立てることができる。',
		imagePath: '/assets/tuitui.jpg',
	},
	{
		id: 'tikz',
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
		id: 'study',
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
		id: 'palamo',
		title: 'Palamo',
		productLink: 'https://frontend-opal-delta-19.vercel.app',
		links: [
			{ name: 'Github', url: 'https://github.com/mehm8128/frontend' },
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
			{ name: 'Github', url: 'https://github.com/mehm8128/traq-mehm8128-bot' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1646/' },
		],
		description: 'traP内SNSのtraQで使用しているtraQBot。',
		longDescription:
			'Node.jsを使ってtraQBotを作った。ライブラリはhubot-traqを使った。主な機能としてはブログリレーのリマインダーやtraQでの投稿数に応じてGitHubの草のような表示をしてくれるものなどがある。',
		imagePath: '/assets/traQBot.png',
	},
	// {
	// 	id: 'git',
	// 	title: '自作Git',
	// 	productLink: '',
	// 	links: [
	// 		{ name: 'Github', url: 'https://github.com/mehm8128/git' },
	// 		//	{ name: 'ブログ記事', url: '' },
	// 	],
	// 	description: '自作Git。いくつかの簡単な機能を実装した。',
	// 	longDescription:
	// 		'自作Git。様々な記事を参考にして、いくつかの簡単な機能をGoで実装した。詳細はブログ記事参照。',
	// 	imagePath: '',
	// },
	{
		id: 'eslint',
		title: 'eslint-plugin-no-relative-path',
		productLink: 'https://www.npmjs.com/package/eslint-plugin-no-relative-path',
		links: [
			{ name: 'Github', url: 'https://github.com/mehm8128/eslint-plugin-no-relative-path' },
			{ name: 'npm', url: 'https://www.npmjs.com/package/eslint-plugin-no-relative-path' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1777/' },
		],
		description: 'ESLintのプラグインを自作した。importに相対パスを使用するのを禁止する。',
		longDescription:
			'ESLintのプラグインを自作した。importに相対パスを使用するのを禁止する。JavaScriptで書いている。',
		imagePath: '',
	},
]
