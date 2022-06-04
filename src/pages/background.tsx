import type { NextPage } from "next"

import { Header } from '../components/Header'

const Background: NextPage = () => {
	return (
		<>
			<Header />
			<main>
				<div className="flex justify-center py-12">
					<h2 className="text-3xl flex items-center">経歴</h2>
				</div>
				<p className="leading-loose container mx-auto w-1/2">
					<h3 className="text-lg font-bold">2021年</h3>
					4月 東京工業大学工学院に入学。
					<br />
					5月 東京工業大学デジタル創作同好会traPに入部。
					<br />
					6月
					traPの部内ハッカソンで部内で制作された音楽をまとめて一覧化するWebアプリ「Qloud」制作のフロントエンドを担当。
					<br />
					10月 Atcoderで茶色になる。
					<br />
					12月
					traPの部内ハッカソン（ピクシブ協賛）で場所法援助Webアプリ「Palamo」制作のフロントエンドを担当。
					<h3 className="text-lg font-bold">2022年</h3>
					3月 サイバーエージェントのWeb Speed Hackathon for Studentsに参加。
					<br />
					3～5月 prdでフロントエンドエンジニアとしてインターンに参加。
				</p>
			</main>
		</>
	)
}

export default Background
