import StyledAnchor from '../../components/ExternalLink'
import UList, { ListItem } from '../../components/List'
import SectionWrap from '../../components/SectionWrap'
import { docs, featuresAndBugfixes } from './contributions'

export default function Contribution() {
	return (
		<SectionWrap headingText="Contributions">
			<SectionWrap headingText="Features and Bugfixes" level={3}>
				<UList>
					{featuresAndBugfixes.map(feature => (
						<ListItem key={feature.title}>
							<StyledAnchor href={feature.link}>{feature.title}</StyledAnchor>
						</ListItem>
					))}
				</UList>
			</SectionWrap>
			<SectionWrap headingText="Docs" level={3}>
				<UList>
					{docs.map(doc => (
						<ListItem key={doc.title}>
							<StyledAnchor href={doc.link}>{doc.title}</StyledAnchor>
						</ListItem>
					))}
				</UList>
			</SectionWrap>
		</SectionWrap>
	)
}
