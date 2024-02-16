import { Box, Heading } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Contribution() {
	return (
		<Box as="section" mb={16} animation="evenFadein 3.5s ease-out">
			<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
				コントリビューション
			</Heading>

			<UList>
				<ListItem>
					<StyledAnchor href="https://github.com/biomejs/biome/pull/1836">
						fix(website): show eslint-plugin-import-access link name #1836 ·
						biomejs/biome
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/biomejs/biome/pull/1551">
						feat(linter): show dependency variable name by
						useExhaustiveDependencies #1551 · biomejs/biome
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/vuejs/vitepress/pull/2941">
						fix: customizing the starting line number even if globally set #2941
						· vuejs/vitepress
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/kuma-ui/kuma-ui/pull/283">
						Fix the way to calculate processedProps #283 · kuma-ui/kuma-ui
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/vercel/swr-site/pull/344">
						doc: translate typescript page into Japanese #344 · vercel/swr-site
					</StyledAnchor>
				</ListItem>
			</UList>
		</Box>
	)
}
