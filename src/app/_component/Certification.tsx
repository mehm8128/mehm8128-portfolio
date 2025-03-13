import StyledAnchor from '../../components/ExternalLink'
import UList, { ListItem } from '../../components/List'
import SectionWrap from '../../components/SectionWrap'

export default function Certification() {
	return (
		<SectionWrap headingText="Certifications">
			<UList>
				<ListItem>
					<StyledAnchor href="https://zenn.dev/mehm8128/trusted-tester">
						DHS Trusted Tester
					</StyledAnchor>
				</ListItem>
				<ListItem>
					<StyledAnchor href="https://sizu.me/mehm8128/posts/sfuw6k948udz">
						kintone認定アソシエイト
					</StyledAnchor>
				</ListItem>
			</UList>
		</SectionWrap>
	)
}
