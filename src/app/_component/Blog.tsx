import { Box, Heading } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Blog() {
	return (
		<Box as="section" animation="oddFadein 3s ease-out">
			<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
				ブログ記事
			</Heading>
			<UList>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/1775/">
						Gitを作ってみようとした話
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/2036/">
						Rustでmini-gitを作った話
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/1963/">
						Kuma UIに†OSS Contribution†した話
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/2121/">
						traPに入ってから最強Webエンジニアになるまで
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/2157/">
						traP部員の凍結・除名について
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/1962/">
						フロントエンドテストに入門してみた話
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/2153/">
						VSCodeをカオスにしよう
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/1964/">
						traQのa11yについて
					</StyledAnchor>
				</ListItem>
				<ListItem isNested>
					<StyledAnchor href="https://trap.jp/post/2044/">
						imgタグについて色んな仕様書とかドキュメントとか眺めてみた話
					</StyledAnchor>
				</ListItem>
			</UList>
		</Box>
	)
}
