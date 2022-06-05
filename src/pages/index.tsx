import type { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

import { LiWithArrow } from "../components/LiWithArrow"
import { links } from "../constants/links"

interface Props {
	updatedDate: string
}

const Home: NextPage<Props> = ({ updatedDate }) => {
	const formattedDate = (stringDate: string) => {
		const date = new Date(stringDate)
		return `${date.getFullYear()}年${
			date.getMonth() + 1
		}月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`
	}
	return (
		<>
			<section className="flex justify-center py-8">
				<h2 className="text-3xl flex items-center gap-2">
					<Image
						src="/assets/mehm8128_circle.png"
						alt=""
						width={60}
						height={60}
					/>
					mehm8128
				</h2>
			</section>
			<div className="w-1/2 mx-auto  leading-loose">
				<p>ここはmehm8128（読み方：めふも）のポートフォリオサイトです。</p>
				<ul>
					<li>
						所属：東京工業大学工学院情報通信系、東京工業大学デジタル創作同好会traP（SysAd班、アルゴリズム班、CTF班）
					</li>
					<li>
						やってること：Web（主にフロントエンド）、競プロ（Atcoder）、CTF
					</li>
					<li>
						Web：フロントエンドはReact、Vue.js、Next.js、TypeScriptなど、バックエンドはGolangを主に使っています。
					</li>
					<li>競プロ：主にPython。C++は勉強中。</li>
					<li>CTF：これから活動予定。</li>
				</ul>
			</div>
			<ul className="text-2xl flex justify-center gap-12 pt-12">
				{links.map((link) => (
					<LiWithArrow key={link.href}>
						<Link href={link.href}>
							<a className="underline">{link.text}</a>
						</Link>
					</LiWithArrow>
				))}
			</ul>
			<p className="text-right mt-2 mr-2">
				最終更新日時：{formattedDate(updatedDate)}
			</p>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	return { props: { updatedDate: String(new Date()) } }
}

export default Home
