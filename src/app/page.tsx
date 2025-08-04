import Image from 'next/image'
import IconImg from '/public/mehm8128_circle.png'
import StyledAnchor from '../components/ExternalLink'
import SectionWrap from '../components/SectionWrap'
import { links } from '../consts/links'
import Background from './_component/Background'
import Blog from './_component/Blog'
import Certification from './_component/Certification'
import Contribution from './_component/Contribution'
import styles from './page.module.css'

export default function Home() {
	return (
		<div className={styles.wrap}>
			<div className={styles.headingWrap}>
				<h1 className={styles.title}>
					<Image
						alt=""
						src={IconImg}
						width={60}
						height={60}
						priority
						className={styles.icon}
					/>
					mehm8128
				</h1>
				<div className={styles.links}>
					{links.map(link => (
						<StyledAnchor key={link.alt} href={link.href}>
							<Image src={link.src} alt={link.alt} className={styles.linkImg} />
						</StyledAnchor>
					))}
				</div>
			</div>

			<div className={styles.sections}>
				<SectionWrap headingText="Affiliations">
					<p>Cybozu (Frontend Engineer)、ex-traP</p>
				</SectionWrap>
				<SectionWrap headingText="Interests">
					<p>Accessibility、Web Components、UI</p>
				</SectionWrap>
				<Certification />
				<Background />
				<Blog />
				<Contribution />
			</div>
		</div>
	)
}
