import StyledAnchor from '@/components/ExternalLink'
import UList, { ListItem } from '@/components/List'
import SectionWrap from '@/components/SectionWrap'

export default function Event() {
	return (
		<SectionWrap headingText="Events・Contests">
			<UList>
				<ListItem>
					<StyledAnchor href="https://github.com/CyberAgentHack/web-speed-hackathon-2022">
						Web Speed Hackathon 2022 for Students
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://isucon.net/archives/56571716.html">
						ISUCON12
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://2023.hackathon.miyagi.jp/">
						みやぎハッカソン
					</StyledAnchor>
					<UList>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/1808/">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/CyberAgentHack/web-speed-hackathon-2023">
						Web Speed Hackathon 2023
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://isucon.net/archives/57801192.html">
						ISUCON13
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://github.com/CyberAgentHack/web-speed-hackathon-2024">
						Web Speed Hackathon 2024
					</StyledAnchor>
					<UList>
						<ListItem isNested>
							<StyledAnchor href="https://trap.jp/post/2172/">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://techbookfest.org/event/tbf16">
						技術書典16 traP TechBook執筆
					</StyledAnchor>
					<UList>
						<ListItem isNested>
							<StyledAnchor href="https://sizu.me/mehm8128/posts/mb6nidhor1v3">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
			</UList>
		</SectionWrap>
	)
}
