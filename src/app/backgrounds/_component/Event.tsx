import { Heading, css } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import NextLink from '@/components/NextLink'
import StyledAnchor from '@/components/StyledAnchor'
import Tag from '@/components/Tag'
import UList from '@/components/UList'

export default function Event() {
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
					イベント・大会
				</Heading>
			}
		>
			<UList>
				<ListItem>
					<StyledAnchor href="https://github.com/CyberAgentHack/web-speed-hackathon-2022/blob/main/docs/internal/README.md">
						Web Speed Hackathon 2022 for Students
					</StyledAnchor>{' '}
					参加
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://isucon.net/archives/56571716.html">
						ISUCON12
					</StyledAnchor>{' '}
					参加
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://2023.hackathon.miyagi.jp/">
						みやぎハッカソン
					</StyledAnchor>{' '}
					参加
					<UList>
						<ListItem isNested>
							<NextLink href="/works?workId=tuitui">
								直感観光地検索サービス「tuitui」
							</NextLink>
							を制作
						</ListItem>
						<ListItem isNested>
							参加記事：
							<StyledAnchor href="https://trap.jp/post/1808/">
								みやぎハッカソン2023に参加しました(ずんだ食べ食べ委員会)
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/CyberAgentHack/web-speed-hackathon-2023">
						Web Speed Hackathon 2023
					</StyledAnchor>{' '}
					参加
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://isucon.net/archives/57801192.html">
						ISUCON13
					</StyledAnchor>{' '}
					参加
				</ListItem>
			</UList>
		</Tag>
	)
}
