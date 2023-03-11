import type { NextPage } from 'next'
import { StyledAnchor } from '../components/StyledAnchor'

const Background: NextPage = () => {
	return (
		<>
			<div className='flex justify-center py-8'>
				<h2 className='flex items-center text-3xl'>経歴</h2>
			</div>
			<div className='mx-auto w-4/5 leading-loose md:w-1/2'>
				<section className='pb-4'>
					<h3 className='mb-2 text-2xl font-bold'>traPでの活動</h3>
					<ul className='list-disc'>
						<li>
							<StyledAnchor href='https://github.com/traPtitech/traQ_S-UI'>
								サークル内SNS traQ
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<ul className='list-disc'>
								<li className='ml-8'>
									部員約400人が使うサービスの機能追加・バグ修正・依存関係のアップデートなどを担当
								</li>
							</ul>
						</li>
						<li>
							<StyledAnchor href='https://github.com/traPtitech/Jomon-UI'>
								サークル内会計支援システム Jomon
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<ul className='list-disc'>
								<li className='ml-8'>
									部費利用申請や交通費申請の依頼・承認・議論等を行うことができるサービスのv2の開発に参加
								</li>
							</ul>
						</li>
						<li>
							<StyledAnchor href='https://github.com/traPtitech/traPortfolio-Dashboard'>
								外部向けポートフォリオ作成アプリ traPortfolio
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<ul className='list-disc'>
								<li className='ml-8'>
									外部に向けて部員がtraPでの活動を紹介できるようなポートフォリオの作成サービスの、主に管理画面の開発に参加
								</li>
							</ul>
						</li>
						<li>
							<StyledAnchor href='https://github.com/traPtitech/Emoine_R-UI'>
								サークル内動画閲覧アプリ emoine
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<ul className='list-disc'>
								<li className='ml-8'>
									メンバー集会やLT会で用いられる、コメントを流したりスタンプを押すことができるサービスのv2の開発に参加
								</li>
							</ul>
						</li>
						<li>
							<StyledAnchor href='https://github.com/traPtitech/gitea'>
								サークルで使用しているOSS Gitea
							</StyledAnchor>
							<span className='ml-1'>の定期的なアップデートを担当</span>
							<ul className='list-disc'>
								<li className='ml-8'>
									リリースノートを読んでfork元リポジトリの変更を取り込んでアップデートをし、部内へのアップデート内容のアナウンス等を行った
								</li>
							</ul>
						</li>
						<li>
							<p>ブログ記事の執筆</p>
							<ul className='list-disc'>
								<li className='ml-8'>
									<StyledAnchor href='https://trap.jp/post/1486/'>
										ReactでToDoリストを作る(新歓ブログ)
									</StyledAnchor>
								</li>
								<li className='ml-8'>
									<StyledAnchor href='https://trap.jp/post/1646/'>草を生やす</StyledAnchor>
								</li>
								<li className='ml-8'>
									<StyledAnchor href='https://trap.jp/post/1652/'>
										Giteaをアップデートした話
									</StyledAnchor>
								</li>
								<li className='ml-8'>
									<StyledAnchor href='https://trap.jp/post/1722/'>
										traPの講習会とブログリレーの運営について
									</StyledAnchor>
								</li>
							</ul>
						</li>
						<li>
							役員として中高生のためのプログラミング教室の運営に参加
							<ul className='list-disc'>
								<li className='ml-8'>
									<StyledAnchor href='https://www.titech.ac.jp/news/2022/064915'>
										デジタル創作同好会traPが「中高生のためのプログラミング教室（2022年夏）」を開催 |
										東工大ニュース
									</StyledAnchor>
								</li>
							</ul>
						</li>
					</ul>
				</section>
				<section className='pb-4'>
					<h3 className='mb-2 text-2xl font-bold'>イベント・大会</h3>
					<ul className='list-disc'>
						<li>Web Speed Hackathon 2022 for Students 参加</li>
						<li>ISUCON12 参加</li>
					</ul>
				</section>
				<section className='pb-4'>
					<h3 className='mb-2 text-2xl font-bold'>インターンシップ</h3>
					<ul className='list-disc'>
						<li>
							<p>2022年3～5月 株式会社prdでフロントエンドエンジニアインターンに参加</p>
							<ul className='ml-8 list-disc'>
								<li>家庭教師マッチングサイト スマートレーダーのLPのNext.js移行を行った</li>
							</ul>
						</li>
						<li>
							<p>2022年11月～ 株式会社ナンバーナインでフロントエンドエンジニアインターンに参加</p>
							<ul className='ml-8 list-disc'>
								<li>漫画家が使用するWebアプリの新UIの実装をNext.jsで行った</li>
								<li>
									ダッシュボードや作品登録画面等の実装や、それに関連してAWS
									S3との通信やgRPCを用いたServer Streaming等についても勉強して実装した
								</li>
							</ul>
						</li>
					</ul>
				</section>
			</div>
		</>
	)
}

export default Background
