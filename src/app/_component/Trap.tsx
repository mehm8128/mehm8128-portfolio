import { Box, Heading } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Trap() {
	return (
		<Box as="section" mb={16} animation="oddFadein 3s ease-out">
			<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
				traPでの活動
			</Heading>
			<UList>
				<ListItem>
					<StyledAnchor href="https://github.com/traPtitech/traQ_S-UI">
						traQ
					</StyledAnchor>
					<span>, </span>
					<StyledAnchor href="https://github.com/traPtitech/traPortfolio-Dashboard">
						traPortfolio
					</StyledAnchor>
					<span>, </span>
					<StyledAnchor href="https://github.com/traPtitech/Emoine_R-UI">
						Emoine
					</StyledAnchor>
					<span>, </span>
					<StyledAnchor href="https://github.com/traPtitech/Jomon-UI">
						Jomon
					</StyledAnchor>
					<span>, </span>
					<StyledAnchor href="https://github.com/traPtitech/gitea">
						Gitea
					</StyledAnchor>
					の開発・運用を担当
				</ListItem>
				<ListItem>
					ブログ記事
					<UList space={1}>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/1652/">
								Giteaをアップデートした話
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/1775/">
								Gitを作ってみようとした話
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/1962/">
								フロントエンドテストに入門してみた話
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/1963/">
								Kuma UIに†OSS Contribution†した話
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/1964/">
								traQのa11yについて
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2021/">
								DIGI-CON HACKATHON 参加記事「Comic DoQ」
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2044/">
								imgタグについて色んな仕様書とかドキュメントとか眺めてみた話
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2089/">
								次世代Webカンファレンス2023参加記
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2036/">
								Rustでmini-gitを作った話
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2153/">
								VSCodeをカオスにしよう
							</StyledAnchor>
						</ListItem>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2121/">
								traPに入ってから最強Webエンジニアになるまで
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
			</UList>
		</Box>
	)
}
