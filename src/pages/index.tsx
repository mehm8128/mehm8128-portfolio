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
			<section className="flex py-8 justify-center">
				<h2 className="flex text-3xl gap-2 items-center">
					<Image
						src="/assets/mehm8128_circle.png"
						alt=""
						width={60}
						height={60}
					/>
					mehm8128
				</h2>
			</section>
			<div className="mx-auto leading-relaxed w-4/5 md:w-1/2">
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
			<ul className="flex flex-wrap mt-12 text-2xl gap-12 justify-center">
				{links.map((link) => (
					<LiWithArrow key={link.href}>
						<Link href={link.href}>
							<a className="underline">{link.text}</a>
						</Link>
					</LiWithArrow>
				))}
			</ul>
			<p className="mt-4 text-right mr-2">
				最終更新日時：{formattedDate(updatedDate)}
			</p>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	return { props: { updatedDate: String(new Date()) } }
}

export default Home
