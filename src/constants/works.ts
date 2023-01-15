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
		title: 'I love TikZ',
		productLink: 'https://hackathon-22spring-13.github.io/client/',
		links: [
			{ name: 'Github', url: 'https://github.com/hackathon-22spring-13/client' },
			{ name: 'traPブログ記事', url: 'https://trap.jp/post/1623/' },
		],
		description: 'traPの2022春ハッカソンで作った、描いた絵をTikZ形式のテキストに変換できるツール。',
		longDescription:
			'traPの2022春ハッカソンで作った、描いた絵をTikZ形式のテキストに変換できるツール。チームラボ賞をいただいた。\nクライアントはNext.js+TypeScript+Windi CSS+Recoil+Fabric.js、サーバーはPython+Flask+SVG2TikZを使っている。自分はクライアントを1人で担当した。',
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
			'traPの2021冬ハッカソンで作った場所法援助アプリ。クライアントを担当した。クライアントはReact+TypeScript、サーバーはGoで作られている。\n自分が担当したのは宮殿一覧、テンプレート一覧やクイズ機能、通信周りなど。',
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
]
