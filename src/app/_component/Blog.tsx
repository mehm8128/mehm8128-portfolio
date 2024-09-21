import StyledAnchor from '@/components/ExternalLink'
import { ListItem } from '@/components/List'
import List from '@/components/List'
import SectionWrap from '@/components/SectionWrap'

export default function Blog() {
	return (
		<SectionWrap headingText="ブログ記事">
			<List>
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
					<StyledAnchor href="https://trap.jp/post/2299/">
						わたくしの開発環境を紹介させていただきます
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
			</List>
		</SectionWrap>
	)
}
