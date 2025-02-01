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
					<StyledAnchor href="https://sizu.me/mehm8128/posts/vahz9skimne4">
						2024年のa11y活動報告
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://trap.jp/post/2121/">
						traPに入ってから最強Webエンジニアになるまで
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://zenn.dev/mehm8128/articles/biome-plugin">
						BiomeのPluginについて
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://zenn.dev/mehm8128/articles/oss-document-translation/">
						OSSのドキュメント翻訳に†Contribution†しよう
					</StyledAnchor>
				</ListItem>
			</List>
		</SectionWrap>
	)
}
