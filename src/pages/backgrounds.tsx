import type { NextPage } from 'next'
import { ListItem } from '../components/ListItem'
import { NextLink } from '../components/NextLink'
import { StyledAnchor } from '../components/StyledAnchor'
import { Ul } from '../components/Ul'

const Background: NextPage = () => {
	return (
		<>
			<div className='flex justify-center py-8'>
				<h2 className='flex items-center text-3xl'>経歴</h2>
			</div>
			<div className='mx-auto w-4/5 leading-loose md:w-1/2'>
				<section className='pb-4'>
					<h3 className='mb-2 text-2xl font-bold'>traPでの活動</h3>
					<Ul>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/traQ_S-UI'>
								サークル内SNS traQ
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<Ul>
								<ListItem isNested>
									部員約400人が使うサービスの機能追加・バグ修正・依存関係のアップデートなどを担当
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/Jomon-UI'>
								サークル内会計支援システム Jomon
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<Ul>
								<ListItem isNested>
									部費利用申請や交通費申請の依頼・承認・議論等を行うことができるサービスのv2の開発に参加
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/traPortfolio-Dashboard'>
								外部向けポートフォリオ作成アプリ traPortfolio
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<Ul>
								<ListItem isNested>
									外部に向けて部員がtraPでの活動を紹介できるようなポートフォリオの作成サービスの、主に管理画面の開発に参加
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/Emoine_R-UI'>
								サークル内動画閲覧アプリ Emoine
							</StyledAnchor>
							<span className='ml-1'>のフロントエンドの開発</span>
							<Ul>
								<ListItem isNested>
									メンバー集会やLT会で用いられる、コメントを流したりスタンプを押すことができるサービスのv2の開発に参加
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/gitea'>
								サークルで使用しているOSS Gitea
							</StyledAnchor>
							<span className='ml-1'>の定期的なアップデートを担当</span>
							<Ul>
								<ListItem isNested>
									リリースノートを読んでfork元リポジトリの変更を取り込んでアップデートをし、部内へのアップデート内容のアナウンス等を行った
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<p>ブログ記事の執筆</p>
							<Ul space={1}>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1486/'>
										ReactでToDoリストを作る(新歓ブログ)
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1646/'>草を生やす</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1652/'>
										Giteaをアップデートした話
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1777/'>
										ESLintプラグイン作ってみた
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1722/'>
										traPの講習会とブログリレーの運営について
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1776/'>春休みに色々した話</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1848/'>
										type challengesやってみた
									</StyledAnchor>
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							役員として中高生のためのプログラミング教室の運営に参加
							<Ul>
								<ListItem isNested>
									<StyledAnchor href='https://www.titech.ac.jp/news/2022/063977'>
										デジタル創作同好会traPが「中高生のためのプログラミング教室（2022年春）」を開催 |
										東工大ニュース
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://www.titech.ac.jp/news/2022/064915'>
										デジタル創作同好会traPが「中高生のためのプログラミング教室（2022年夏）」を開催 |
										東工大ニュース
									</StyledAnchor>
								</ListItem>
							</Ul>
						</ListItem>
					</Ul>
				</section>
				<section className='pb-4'>
					<h3 className='mb-2 text-2xl font-bold'>イベント・大会</h3>
					<Ul>
						<ListItem>
							<StyledAnchor href='https://github.com/CyberAgentHack/web-speed-hackathon-2022/blob/main/docs/internal/README.md'>
								Web Speed Hackathon 2022 for Students
							</StyledAnchor>{' '}
							参加
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://isucon.net/archives/56571716.html'>ISUCON12</StyledAnchor>{' '}
							参加
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://2023.hackathon.miyagi.jp/'>みやぎハッカソン</StyledAnchor>{' '}
							参加
							<Ul>
								<ListItem isNested>
									<NextLink href='/works?work=tuitui'>直感観光地検索サービス「tuitui」</NextLink>
									を制作
								</ListItem>
								<ListItem isNested>
									参加記事：
									<StyledAnchor href='https://trap.jp/post/1808/'>
										みやぎハッカソン2023に参加しました(ずんだ食べ食べ委員会)
									</StyledAnchor>
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/CyberAgentHack/web-speed-hackathon-2023'>
								Web Speed Hackathon 2023
							</StyledAnchor>{' '}
							参加
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://inside.pixiv.blog/2023/03/28/130000'>
								pixivスピードアップチャレンジ
							</StyledAnchor>{' '}
							参加
						</ListItem>
						<ListItem>
							ディップ株式会社主催 AWSハンズオン 参加
							<Ul>
								<ListItem isNested>
									参加記事：
									<StyledAnchor href='https://trap.jp/post/1850/'>
										ディップさんのAWSハンズオンに参加してきました
									</StyledAnchor>
								</ListItem>
							</Ul>
						</ListItem>
					</Ul>
				</section>
				<section className='pb-4'>
					<h3 className='mb-2 text-2xl font-bold'>インターンシップ</h3>
					<Ul>
						<ListItem>
							<p>2022年3～5月 株式会社prdでフロントエンドエンジニアインターンに参加</p>
							<Ul isNested>
								<ListItem>
									家庭教師マッチングサイト スマートレーダーのLPのNext.js移行を行った
								</ListItem>
							</Ul>
						</ListItem>
						<ListItem>
							<p>2022年11月～ 株式会社ナンバーナインでフロントエンドエンジニアインターンに参加</p>
							<Ul isNested>
								<ListItem>漫画家さんが使用するWebアプリの新UIの実装をNext.jsで行った</ListItem>
								<ListItem>ダッシュボードや作品登録画面等の実装をした</ListItem>
							</Ul>
						</ListItem>
					</Ul>
				</section>
			</div>
		</>
	)
}

export default Background
