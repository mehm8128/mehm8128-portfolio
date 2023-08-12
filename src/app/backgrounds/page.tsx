import { Heading, Box } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import NextLink from '@/components/NextLink'
import StyledAnchor from '@/components/StyledAnchor'
import UList from '@/components/UList'

export default function Background() {
	return (
		<>
			<Heading
				justifyContent='center'
				py={32}
				as='h2'
				display='flex'
				alignItems='center'
				fontSize=' 1.875rem'
			>
				経歴
			</Heading>
			<Box mx='auto' width={['80%', '50%']} lineHeight={2}>
				<Box as='section' pb={16}>
					<Heading as='h3' mb={8} fontSize='1.5rem' fontWeight='bold'>
						traPでの活動
					</Heading>
					<UList>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/traQ_S-UI'>
								サークル内SNS traQ
							</StyledAnchor>
							<Box as='span' ml={4}>
								のフロントエンドの開発
							</Box>
							<UList>
								<ListItem isNested>
									部員約400人が使うサービスの機能追加・バグ修正・依存関係のアップデートなどを担当
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/Jomon-UI'>
								サークル内会計支援システム Jomon
							</StyledAnchor>
							<Box as='span' ml={4}>
								のフロントエンドの開発
							</Box>
							<UList>
								<ListItem isNested>
									部費利用申請や交通費申請の依頼・承認・議論等を行うことができるサービスのv2の開発に参加
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/traPortfolio-Dashboard'>
								外部向けポートフォリオ作成アプリ traPortfolio
							</StyledAnchor>
							<Box as='span' ml={4}>
								のフロントエンドの開発
							</Box>
							<UList>
								<ListItem isNested>
									外部に向けて部員がtraPでの活動を紹介できるようなポートフォリオの作成サービスの、主に管理画面の開発に参加
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/Emoine_R-UI'>
								サークル内動画閲覧アプリ Emoine
							</StyledAnchor>
							<Box as='span' ml={4}>
								のフロントエンドの開発
							</Box>
							<UList>
								<ListItem isNested>
									メンバー集会やLT会で用いられる、コメントを流したりスタンプを押すことができるサービスのv2の開発に参加
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://github.com/traPtitech/gitea'>
								サークルで使用しているOSS Gitea
							</StyledAnchor>
							<Box as='span' ml={4}>
								の定期的なアップデートを担当
							</Box>
							<UList>
								<ListItem isNested>
									リリースノートを読んでfork元リポジトリの変更を取り込んでアップデートをし、部内へのアップデート内容のアナウンス等を行った
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://trap.jp/post/1862/'>
								CPCTF2023のスコアサーバー
							</StyledAnchor>
							<Box as='span' ml={4}>
								の昨年度使用したものからのUI変更に参加
							</Box>
						</ListItem>
						<ListItem>
							講習会の運営・TA
							<UList>
								<ListItem isNested>
									Webエンジニアになろう講習会、Git講習会など
								</ListItem>
								<ListItem isNested>
									ブログ記事：
									<StyledAnchor href='https://trap.jp/post/1722/'>
										traPの講習会とブログリレーの運営について
									</StyledAnchor>
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							ブログ記事の執筆
							<UList space={1}>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1486/'>
										ReactでToDoリストを作る(新歓ブログ)
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1646/'>
										草を生やす
									</StyledAnchor>
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
									<StyledAnchor href='https://trap.jp/post/1776/'>
										春休みに色々した話
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1848/'>
										type challengesやってみた
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://trap.jp/post/1775/'>
										Gitを作ってみようとした話
									</StyledAnchor>
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							役員として中高生のためのプログラミング教室の運営に参加
							<UList>
								<ListItem isNested>
									<StyledAnchor href='https://www.titech.ac.jp/news/2022/063977'>
										デジタル創作同好会traPが「中高生のためのプログラミング教室（2022年春）」を開催
										| 東工大ニュース
									</StyledAnchor>
								</ListItem>
								<ListItem isNested>
									<StyledAnchor href='https://www.titech.ac.jp/news/2022/064915'>
										デジタル創作同好会traPが「中高生のためのプログラミング教室（2022年夏）」を開催
										| 東工大ニュース
									</StyledAnchor>
								</ListItem>
							</UList>
						</ListItem>
					</UList>
				</Box>
				<Box as='section' pb={16}>
					<Heading as='h3' mb={8} fontSize='1.5rem' fontWeight='bold'>
						イベント・大会
					</Heading>
					<UList>
						<ListItem>
							<StyledAnchor href='https://github.com/CyberAgentHack/web-speed-hackathon-2022/blob/main/docs/internal/README.md'>
								Web Speed Hackathon 2022 for Students
							</StyledAnchor>{' '}
							参加
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://isucon.net/archives/56571716.html'>
								ISUCON12
							</StyledAnchor>{' '}
							参加
						</ListItem>
						<ListItem>
							<StyledAnchor href='https://2023.hackathon.miyagi.jp/'>
								みやぎハッカソン
							</StyledAnchor>{' '}
							参加
							<UList>
								<ListItem isNested>
									<NextLink href='/works?workId=tuitui'>
										直感観光地検索サービス「tuitui」
									</NextLink>
									を制作
								</ListItem>
								<ListItem isNested>
									参加記事：
									<StyledAnchor href='https://trap.jp/post/1808/'>
										みやぎハッカソン2023に参加しました(ずんだ食べ食べ委員会)
									</StyledAnchor>
								</ListItem>
							</UList>
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
							<UList>
								<ListItem isNested>
									参加記事：
									<StyledAnchor href='https://trap.jp/post/1850/'>
										ディップさんのAWSハンズオンに参加してきました
									</StyledAnchor>
								</ListItem>
							</UList>
						</ListItem>
					</UList>
				</Box>
				<Box as='section' pb={16}>
					<Heading as='h3' mb={8} fontSize='1.5rem' fontWeight='bold'>
						インターンシップ
					</Heading>
					<UList>
						<ListItem>
							<p>
								2022年3～5月
								株式会社prdでフロントエンドエンジニアインターンに参加
							</p>
							<UList isNested>
								<ListItem>
									家庭教師マッチングサイト
									スマートレーダーのLPのNext.js移行を行った
								</ListItem>
							</UList>
						</ListItem>
						<ListItem>
							<p>
								2022年11月～
								株式会社ナンバーナインでフロントエンドエンジニアインターンに参加
							</p>
							<UList isNested>
								<ListItem>
									漫画家さんが使用するWebアプリの新UIの実装をNext.jsで行った
								</ListItem>
								<ListItem>ダッシュボードや作品登録画面等の実装をした</ListItem>
								<ListItem>
									<StyledAnchor href='https://twitter.com/yudai112535/status/1655919698398289933?s=20'>
										リリースについてのツイート
									</StyledAnchor>
								</ListItem>
							</UList>
						</ListItem>
					</UList>
				</Box>
			</Box>
		</>
	)
}
