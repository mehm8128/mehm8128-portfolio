import type { NextPage } from "next"

const Background: NextPage = () => {
	return (
		<>
			<div className="flex py-8 justify-center">
				<h2 className="flex text-3xl items-center">経歴</h2>
			</div>
			<div className="mx-auto leading-loose w-4/5 md:w-1/2">
				<section className="pb-4">
					<h3 className="font-bold text-lg">2021年</h3>
					<ul>
						<li>4月 東京工業大学工学院に入学。</li>
						<li>5月 東京工業大学デジタル創作同好会traPに入部。</li>
						<li>
							6月
							traPの部内ハッカソンで部内で制作された音楽をまとめて一覧化するWebアプリ「Qloud」制作のフロントエンドを担当。
						</li>
						<li>10月 AtCoderで茶色になる。</li>
						<li>
							12月
							traPの部内ハッカソン（ピクシブ協賛）で場所法援助Webアプリ「Palamo」制作のフロントエンドを担当。
						</li>
					</ul>
				</section>
				<section className="pb-4">
					<h3 className="font-bold text-lg">2022年</h3>
					<ul>
						<li>
							3月 サイバーエージェントのWeb Speed Hackathon for Studentsに参加。
						</li>
						<li>
							3～5月 prdでフロントエンドエンジニアとしてインターンに参加。
						</li>
					</ul>
				</section>
			</div>
		</>
	)
}

export default Background
