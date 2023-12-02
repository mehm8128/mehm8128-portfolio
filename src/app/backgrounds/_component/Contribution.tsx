import { Heading, css } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import Tag from '@/components/Tag'
import UList from '@/components/UList'

export default function Contribution() {
	return (
		<Tag
			as="section"
			className={css`
				margin-bottom: 1rem;
			`}
			direction="column"
			color="primary"
			tagName={
				<Heading as="h3" fontSize="1.5rem" fontWeight="bold">
					コントリビューション
				</Heading>
			}
		>
			<UList>
				<ListItem>
					<StyledAnchor href="https://github.com/vuejs/vitepress/pull/2941">
						fix: customizing the starting line number even if globally set by
						mehm8128 · Pull Request #2941 · vuejs/vitepress
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/vuejs/vitepress/issues/2907">
						Specifing the start line number on code block · Issue #2907 ·
						vuejs/vitepress
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/kuma-ui/kuma-ui/pull/283">
						Fix the way to calculate processedProps by mehm8128 · Pull Request
						#283 · kuma-ui/kuma-ui
					</StyledAnchor>{' '}
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/vercel/swr/issues/2396">
						Improved type support for suspense is not working well · Issue #2396
						· vercel/swr
					</StyledAnchor>{' '}
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/vercel/swr-site/pull/344">
						doc: translate typescript page into Japanese by mehm8128 · Pull
						Request #344 · vercel/swr-site
					</StyledAnchor>{' '}
				</ListItem>
			</UList>
		</Tag>
	)
}
