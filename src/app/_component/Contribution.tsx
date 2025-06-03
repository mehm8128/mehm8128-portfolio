import StyledAnchor from '../../components/ExternalLink'
import UList, { ListItem } from '../../components/List'
import SectionWrap from '../../components/SectionWrap'
import { docs, featuresAndBugfixes } from './contributions'

export default function Contribution() {
	return (
		<SectionWrap headingText="Contributions">
			<UList>
				<ListItem>
					Features and Bugfixes
					<UList isNested>
						{featuresAndBugfixes.map(feature => (
							<ListItem key={feature.title}>
								<StyledAnchor href={feature.link}>{feature.title}</StyledAnchor>
							</ListItem>
						))}
					</UList>
				</ListItem>
				<ListItem>
					Docs
					<UList isNested>
						{docs.map(doc => (
							<ListItem key={doc.title}>
								<StyledAnchor href={doc.link}>{doc.title}</StyledAnchor>
							</ListItem>
						))}
					</UList>
				</ListItem>
			</UList>
		</SectionWrap>
	)
}
