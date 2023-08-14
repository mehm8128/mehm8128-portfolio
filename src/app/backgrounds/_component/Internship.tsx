import { Heading, css } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import Tag from '@/components/Tag'
import UList from '@/components/UList'

export default function Internship() {
	return (
		<Tag
			as='section'
			className={css`
				margin-bottom: 1rem;
			`}
			direction='column'
			color='primary'
			tagName={
				<Heading as='h3' fontSize='1.5rem' fontWeight='bold'>
					インターンシップ
				</Heading>
			}
		>
			<UList>
				<ListItem>
					<p>
						2022年3～5月 株式会社prdでフロントエンドエンジニアインターンに参加
					</p>
					<UList isNested>
						<ListItem>
							家庭教師マッチングサイト スマートレーダーのLPのNext.js移行を行った
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
		</Tag>
	)
}
