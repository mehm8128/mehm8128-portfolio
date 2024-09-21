import type { DeployDateTimeResponse } from '@/app/api/deploy_datetime/route'
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

const fetchDeployDate = async () => {
	const res = await fetch(
		'https://mehm8128-portfolio.vercel.app/api/deploy_datetime'
	)
	if (!res.ok) throw new Error('Failed to fetch deploy date')

	const data: DeployDateTimeResponse = await res.json()
	return data.deployDateTime
}

export default async function Home() {
	const deployDateTime = await fetchDeployDate()

	return (
		<div>
			<div className={styles.wrap}>
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
				</h1>

				<div className={styles.sections}>
					<SectionWrap headingText="所属">
						<p>
							東京工業大学工学院情報通信系(2021年4月～2024年9月)、東京工業大学デジタル創作同好会traP
						</p>
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
					{formatDate(new Date(deployDateTime))}
				</time>
			</p>
		</div>
	)
}
