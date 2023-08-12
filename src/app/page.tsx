import Image from 'next/image'
import Link from 'next/link'

import { DeployDateTimeResponse } from '@/app/api/deploy_datetime/route'
import LiWithArrow from '@/components/LiWithArrow'
import { links } from '@/consts/links'
import { formatDate } from '@/utils/date'

const fetchDeployDate = async () => {
	const res = await fetch('http://localhost:3000/api/deploy_datetime')
	if (!res.ok) throw new Error('Failed to fetch deploy date')
	const data: DeployDateTimeResponse = await res.json()
	return data.deployDateTime
}

export default async function Home() {
	const deployDateTime = await fetchDeployDate()

	return (
		<>
			<section className='flex justify-center py-8'>
				<h2 className='flex items-center gap-2 text-3xl'>
					<Image
						alt=''
						height={60}
						src='/assets/mehm8128_circle.png'
						width={60}
					/>
					mehm8128
				</h2>
			</section>
			<div className='mx-auto w-4/5 leading-relaxed md:w-1/2'>
				<p>ここはmehm8128（読み方：めふも）のポートフォリオサイトです。</p>
				<ul>
					<li>
						所属：東京工業大学工学院情報通信系(2021年4月～)、東京工業大学デジタル創作同好会traP
					</li>
					<li>
						フロントエンド：Next.js、React、Vue.js、TypeScript、Storybookなど
					</li>
					<li>バックエンド：Go</li>
				</ul>
			</div>
			<ul className='mt-12 flex flex-wrap justify-center gap-12 text-2xl'>
				{links.map((link) => (
					<LiWithArrow key={link.href}>
						<Link className='underline' href={link.href}>
							{link.text}
						</Link>
					</LiWithArrow>
				))}
			</ul>
			<p className='mr-2 mt-4 text-right'>
				最終更新日時：{formatDate(new Date(deployDateTime))}
			</p>
		</>
	)
}
