interface Blog {
	title: string
	link: string
}

export const blogs = [
	{
		title: 'React Ariaの実装読むぞ Advent Calendar 2024',
		link: 'https://qiita.com/advent-calendar/2024/react-aria'
	},
	{
		title: 'Rustでmini-gitを作った話',
		link: 'https://trap.jp/post/2036/'
	},
	{
		title: '25新卒エンジニア5人の内定者アルバイト体験記',
		link: 'https://blog.cybozu.io/entry/2025/02/26/112000'
	},
	{
		title: 'query-by-role というライブラリを作った',
		link: 'https://zenn.dev/mehm8128/articles/query-by-role'
	},
	{
		title: 'Kuma UIに†OSS Contribution†した話',
		link: 'https://trap.jp/post/1963/'
	},
	{
		title: '2024年のa11y活動報告',
		link: 'https://sizu.me/mehm8128/posts/vahz9skimne4'
	},
	{
		title: 'traPに入ってから最強Webエンジニアになるまで',
		link: 'https://trap.jp/post/2121/'
	},
	{
		title: 'BiomeのPluginについて',
		link: 'https://zenn.dev/mehm8128/articles/biome-plugin'
	},
	{
		title: 'aria-label、ボタン/リンクに付けるか？アイコンに付けるか？',
		link: 'https://zenn.dev/mehm8128/articles/aria-label-target'
	},
	{
		title: 'OSSのドキュメント翻訳に†Contribution†しよう',
		link: 'https://zenn.dev/mehm8128/articles/oss-document-translation/'
	},
	{
		title: 'みやぎハッカソン2023に参加しました（ずんだ食べ食べ委員会）',
		link: 'https://trap.jp/post/1808/'
	},
	{
		title: '技術書典16 traP TechBook執筆',
		link: 'https://sizu.me/mehm8128/posts/mb6nidhor1v3'
	},
	{
		title: '読んだ本',
		link: 'https://gist.github.com/mehm8128/ec0ea128b5cbd5547708535a81b91c85'
	}
] as const satisfies Blog[]
