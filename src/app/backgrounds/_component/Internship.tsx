import { Box, Heading, Text, css } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Internship() {
	return (
		<Box
			as="section"
			className={css`
				margin-bottom: 1rem;
			`}
		>
			<Heading as="h3" fontSize="1.5rem" fontWeight="bold">
				インターンシップ
			</Heading>
			<UList>
				<ListItem>
					<Text>2022年11月～ 株式会社ナンバーナイン</Text>
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://twitter.com/yudai112535/status/1655919698398289933?s=20">
								リリースツイート
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<Text>2023年8月～9月 株式会社ゆめみ 2週間のサマーインターン</Text>
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://note.com/mehm8128/n/n2acd21311531">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<Text>2023年9月 株式会社ナレッジワーク 2週間のサマーインターン</Text>
				</ListItem>
			</UList>
		</Box>
	)
}
