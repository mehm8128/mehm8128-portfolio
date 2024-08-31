import { Box, Heading } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Internship() {
	return (
		<Box as="section" animation="evenFadein 2.5s ease-out">
			<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
				経歴
			</Heading>
			<UList>
				<ListItem>
					2022年11月～2025年2月 株式会社ナンバーナイン 長期インターン、業務委託
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://zenn.dev/no9_dev/articles/next-migration">
								ナンバーナインのフロントエンドをNext.jsに移行した
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://twitter.com/yudai112535/status/1655919698398289933?s=20">
								リリースツイート
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://x.com/no9editor/status/1752528473518948490?s=20">
								リリースツイート2
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					2023年8月～9月 株式会社ゆめみ 2週間のサマーインターン
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://note.com/mehm8128/n/n2acd21311531">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					2023年9月 株式会社ナレッジワーク 2週間のサマーインターン
				</ListItem>
				<ListItem>2024年8～9月 株式会社CoeFont 業務委託</ListItem>
			</UList>
		</Box>
	)
}
