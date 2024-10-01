import StyledAnchor from '@/components/ExternalLink'
import SectionWrap from '@/components/SectionWrap'
import { links } from '@/consts/links'
import { formatDate } from '@/lib/date'
import Image from 'next/image'
import IconImg from '/public/mehm8128_circle.png'
import Blog from './_component/Blog'
import Contribution from './_component/Contribution'
import Event from './_component/Event'
import Internship from './_component/Internship'
import styles from './page.module.css'

export default async function Home() {
	const deployDateTime = process.env.NEXT_PUBLIC_BUILD_TIME

	return (
		<div>
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
								<Image
									src={link.src}
									alt={link.alt}
									className={styles.linkImg}
								/>
							</StyledAnchor>
						))}
					</div>
				</div>

				<div className={styles.sections}>
					<SectionWrap headingText="所属">
						<p>Cybozu (Frontend Engineer)、ex-traP</p>
					</SectionWrap>
					<SectionWrap headingText="スキル">
						<p>
							Next.js、React、TypeScript、Storybook、Testing、a11y、Git、Go、Rust、Vue.js
						</p>
					</SectionWrap>

					<Internship />
					<Blog />
					<Event />
					<Contribution />
				</div>
			</div>

			<p className={styles.lastUpdated}>
				<span>最終更新日時</span>
				<time dateTime={deployDateTime}>
					{deployDateTime
						? formatDate(new Date(deployDateTime))
						: '取得できませんでした'}
				</time>
			</p>
		</div>
	)
}
