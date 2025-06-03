import StyledAnchor from '../../components/ExternalLink'
import List, { ListItem } from '../../components/List'
import SectionWrap from '../../components/SectionWrap'
import { blogs } from './blogs'

export default function Blog() {
	return (
		<SectionWrap headingText="Blogs">
			<List>
				{blogs.map(blog => (
					<ListItem key={blog.title}>
						<StyledAnchor href={blog.link}>{blog.title}</StyledAnchor>
					</ListItem>
				))}
			</List>
		</SectionWrap>
	)
}
