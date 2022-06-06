export interface WorkType {
	title: string
	productLink: string
	githubLinks: string[]
	description: string
	longDescription: string
	imagePath: string
}

export const works: WorkType[] = [
	{
		title: "Palamo",
		productLink: "https://frontend-opal-delta-19.vercel.app",
		githubLinks: ["https://github.com/mehm8128/frontend"],
		description: "traPの2021冬ハッカソンで作った場所法援助アプリ。",
		longDescription:
			"traPの2021冬ハッカソンで作った場所法援助アプリ。クライアントを担当した。クライアントはReact+TypeScript、サーバーはgolangで作られている。自分が担当したのは宮殿一覧、テンプレート一覧やクイズ機能、通信周りなど。",
		imagePath: "/assets/palamo.png",
	},
	{
		title: "Jomon",
		productLink: "",
		githubLinks: ["https://github.com/traPtitech/Jomon-UI"],
		description: "traPの会計支援サービス。",
		longDescription:
			"traPの会計支援サービス。Vue.jsで作られていて、状態管理にpinia、CSSにWindi CSSが使われている。まだ開発中。",
		imagePath: "",
	},
	{
		title: "勉強時間管理アプリ",
		productLink: "https://mehm8128-study-client.vercel.app/",
		githubLinks: [
			"https://github.com/mehm8128/mehm8128_study_client",
			"https://github.com/mehm8128/mehm8128-study-server",
		],
		description: "勉強時間を記録できるサービス。",
		longDescription:
			"勉強時間記録を他の人と共有できるサービス。受験期に使っていたアプリを参考にして作った。Next.jsで作っていて、UIフレームワークに初めてChakra-UIを使ってみた。単語暗記機能を制作中。セッション機能を導入予定。",
		imagePath: "/assets/study.png",
	},
	{
		title: "ポートフォリオ",
		productLink: "https://mehm8128-portfolio.vercel.app/",
		githubLinks: ["https://github.com/mehm8128/mehm8128-portfolio"],
		description: "このポートフォリオ。",
		longDescription:
			"前に使っていたものをデザインや使う技術を変えて作り直した。Next.jsで作り、UIフレームワークにWindi CSSを使っている。",
		imagePath: "/assets/portfolio.png",
	},
	{
		title: "TwitterBot",
		productLink: "",
		githubLinks: ["https://github.com/mehm8128/TwitterBot"],
		description: "TwitterAPIを利用して自分のアカウントをBot化。",
		longDescription:
			"Node.jsでTwitterAPIを使い、TwitterBotを作った。ライブラリはnode-twitter-api-v2を使った。現在は自動返信機能と日付が変わるタイミングでの時報のみ。デプロイはherokuを使っている。",
		imagePath: "",
	},
	{
		title: "traQBot",
		productLink: "",
		githubLinks: ["https://github.com/mehm8128/traq-mehm8128-bot"],
		description: "traP内SNSのtraQで使用しているtraQBot。",
		longDescription:
			"Node.jsを使ってtraQBotを作った(traQとはtraP内SNS)。ライブラリは<a href='https://github.com/sapphi-red/hubot-traq'>hubot-traq</a>を使った。デプロイはtraP内サービスのshowcaseを使っている。",
		imagePath: "/assets/traQBot.png",
	},
]
