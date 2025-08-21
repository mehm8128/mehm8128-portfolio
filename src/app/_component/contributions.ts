interface Contribution {
	title: string
	link: string
}

export const featuresAndBugfixes = [
	{
		title:
			'feat(biome_js_analyze): implement noExcessiveLinesPerFunction #6166 · biomejs/biome',
		link: 'https://github.com/biomejs/biome/pull/6166'
	},
	{
		title: 'feat(lint): implement useUniqueElementIds #6082 · biomejs/biome',
		link: 'https://github.com/biomejs/biome/pull/6082'
	},
	{
		title:
			'feat(linter): show dependency variable name by useExhaustiveDependencies #1551 · biomejs/biome',
		link: 'https://github.com/biomejs/biome/pull/1551'
	},
	{
		title:
			'fix(css_semantic): semantic event for css supports at-rule #4810 · biomejs/biome',
		link: 'https://github.com/biomejs/biome/pull/4810'
	},
	{
		title: 'Fix the way to calculate processedProps #283 · kuma-ui/kuma-ui',
		link: 'https://github.com/kuma-ui/kuma-ui/pull/283'
	},
	{
		title:
			'feat: トピック名の文字数をvalidateするように #545 · zenn-dev/zenn-editor',
		link: 'https://github.com/zenn-dev/zenn-editor/pull/545'
	},
	{
		title: 'fix: useButton href condition #7239 · adobe/react-spectrum',
		link: 'https://github.com/adobe/react-spectrum/pull/7239'
	},
	{
		title: 'doc: Fix date inputs on Chrome #704 · 47ng/nuqs',
		link: 'https://github.com/47ng/nuqs/pull/704#event-14844194210'
	},
	{
		title:
			'fix: customizing the starting line number even if globally set #2941 · vuejs/vitepress',
		link: 'https://github.com/vuejs/vitepress/pull/2941'
	}
] as const satisfies Contribution[]

export const docs = [
	{
		title: 'mdn/translated-content への Pull Request',
		link: 'https://github.com/mdn/translated-content/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+'
	},
	{
		title: 'docs(ja): translate gritql page #1615 · biomejs/website',
		link: 'https://github.com/biomejs/website/pull/1615'
	},
	{
		title: 'docs: translate some page to Japanese #1046 · biomejs/website',
		link: 'https://github.com/biomejs/website/pull/1046'
	},
	{
		title: 'Doc: add tupleAsync docs #738 · fabian-hiller/valibot',
		link: 'https://github.com/fabian-hiller/valibot/pull/738'
	},
	{
		title: 'Doc: add tupleWithRestAsync doc #739 · fabian-hiller/valibot',
		link: 'https://github.com/fabian-hiller/valibot/pull/739'
	},
	{
		title: 'Doc: add looseTupleAsync doc #740 · fabian-hiller/valibot',
		link: 'https://github.com/fabian-hiller/valibot/pull/740'
	},
	{
		title: 'Doc: add strictTupleAsync doc #741 · fabian-hiller/valibot',
		link: 'https://github.com/fabian-hiller/valibot/pull/741'
	},
	{
		title:
			'doc: translate typescript page into Japanese #344 · vercel/swr-site',
		link: 'https://github.com/vercel/swr-site/pull/344'
	},
	{
		title:
			'fix(website): show eslint-plugin-import-access link name #1836 · biomejs/biome',
		link: 'https://github.com/biomejs/biome/pull/1836'
	}
] as const satisfies Contribution[]
