import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { LiWithArrow } from '../components/LiWithArrow'
import { links } from '../constants/links'
import { formatDate } from '../utils/date'

interface Props {
	updatedDate: string
}

const Home: NextPage<Props> = ({ updatedDate }) => {
	return (
		<>
			<section className='flex justify-center py-8'>
				<h2 className='flex items-center gap-2 text-3xl'>
					<Image alt='' height={60} src='/assets/mehm8128_circle.png' width={60} />
					mehm8128
				</h2>
			</section>
			<div className='mx-auto w-4/5 leading-relaxed md:w-1/2'>
				<p>ここはmehm8128（読み方：めふも）のポートフォリオサイトです。</p>
				<ul>
					<li>所属：東京工業大学工学院情報通信系、東京工業大学デジタル創作同好会traP</li>
					<li>フロントエンド：React、Vue.js、Next.js、TypeScriptなど</li>
					<li>バックエンド：Go</li>
				</ul>
			</div>
			<ul className='mt-12 flex flex-wrap justify-center gap-12 text-2xl'>
				{links.map((link) => (
					<LiWithArrow key={link.href}>
						<Link href={link.href}>
							<a className='underline'>{link.text}</a>
						</Link>
					</LiWithArrow>
				))}
			</ul>
			<p className='mt-4 mr-2 text-right'>最終更新日時：{formatDate(updatedDate)}</p>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	return { props: { updatedDate: Date() } }
}

export default Home
