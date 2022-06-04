import type { NextPage } from "next"
import Image from 'next/image'

import { Header } from '../components/Header'

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
			</main>
		</>
	)
}

export default Home
