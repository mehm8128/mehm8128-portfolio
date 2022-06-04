import type { NextPage } from "next"
import Image from 'next/image'
import Link from 'next/link'

import { Header } from '../components/Header'
import { LiWithArrow } from '../components/LiWithArrow'

const Home: NextPage = () => {
	return (
		<>
			<Header />
			<main>
				<div className="flex justify-center py-12">
					<h2 className="text-3xl flex items-center gap-2">
						<Image
							src="/assets/mehm8128_circle.png"
							alt=""
							width="60"
							height="60"
						/>
						mehm8128
					</h2>
				</div>
				<p className="flex justify-center leading-loose">
					ここはmehm8128（読み方：めふも）のポートフォリオサイトです。
					<br />
					ヘッダーから各ページへ飛ぶことができます。
					<br />
					所属：東京工業大学工学院情報通信系、東京工業大学デジタル創作同好会traP（SysAd班、アルゴリズム班、CTF班）
					<br />
					やってること：Web（主にフロントエンド）、競プロ（Atcoder）、CTF
					<br />
					Web：フロントエンドはReact、Vue.js、Next.js、TypeScriptなど、バックエンドはGolangを主に使っています。
					<br />
					競プロ：主にPython。C++は勉強中。
					<br />
					CTF：これから活動予定。
				</p>
				<ul className="text-xl flex justify-center gap-12 pt-12">
					<LiWithArrow>
						<Link href="https://twitter.com/mehm08128">
							<a className="underline">Twitter</a>
						</Link>
					</LiWithArrow>
					<LiWithArrow>
						<Link href="https://github.com/mehm8128">
							<a className="underline">Github</a>
						</Link>
					</LiWithArrow>
					<LiWithArrow>
						<Link href="https://atcoder.jp/users/mehm8128">
							<a className="underline">AtCoder</a>
						</Link>
					</LiWithArrow>
					<LiWithArrow>
						<Link href="https://trap.jp/author/mehm8128/">
							<a className="underline">traPブログ</a>
						</Link>
					</LiWithArrow>
				</ul>
			</main>
		</>
	)
}

export default Home
