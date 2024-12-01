import StyledAnchor from '@/components/ExternalLink'
import UList, { ListItem } from '@/components/List'
import List from '@/components/List'
import SectionWrap from '@/components/SectionWrap'

export default function Blog() {
	return (
		<SectionWrap headingText="Blogs">
			<List>
				<ListItem>
					<StyledAnchor href="https://qiita.com/advent-calendar/2024/react-aria">
						React Ariaの実装読むぞ Advent Calendar 2024
					</StyledAnchor>
					<UList isNested>
						<ListItem>ページ内に25個記事があります</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/1775/">
						Gitを作ってみようとした話
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/2036/">
						Rustでmini-gitを作った話
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/1963/">
						Kuma UIに†OSS Contribution†した話
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/2121/">
						traPに入ってから最強Webエンジニアになるまで
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/2299/">
						わたくしの開発環境を紹介させていただきます
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/2157/">
						traP部員の凍結・除名について
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/2153/">
						VSCodeをカオスにしよう
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/1964/">
						traQのa11yについて
					</StyledAnchor>
				</ListItem>
			</List>
		</SectionWrap>
	)
}
