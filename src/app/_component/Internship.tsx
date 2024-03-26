import { Box, Heading } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Internship() {
	return (
		<Box as="section" mb={16} animation="evenFadein 2.5s ease-out">
			<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
				インターンシップ
			</Heading>
			<UList>
				<ListItem>
					2022年11月～ 株式会社ナンバーナイン
					<UList isNested>
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
			</UList>
		</Box>
	)
}
