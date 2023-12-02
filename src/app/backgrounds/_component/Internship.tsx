import { Heading, css } from '@kuma-ui/core'

import ListItem from '@/components/ListItem'
import StyledAnchor from '@/components/StyledAnchor'
import Tag from '@/components/Tag'
import UList from '@/components/UList'

export default function Internship() {
	return (
		<Tag
			as="section"
			className={css`
				margin-bottom: 1rem;
			`}
			direction="column"
			color="primary"
			tagName={
				<Heading as="h3" fontSize="1.5rem" fontWeight="bold">
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
							<StyledAnchor href="https://twitter.com/yudai112535/status/1655919698398289933?s=20">
								リリースについてのツイート
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<p>2023年8月～9月 株式会社ゆめみで2週間のサマーインターンに参加</p>
					<UList isNested>
						<ListItem>
							ジョブボードという社内求人ツールの開発にフロントエンドとして参加した
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://note.com/mehm8128/n/n2acd21311531">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					<p>2023年9月 株式会社ナレッジワークで2週間のサマーインターンに参加</p>
					<UList isNested>
						<ListItem>
							ナレッジワークのwork領域の開発に参加し、ミーティング詳細情報画面の改善に取り組んだ
						</ListItem>
						<ListItem>
							ResourceSetを扱ったり、デザイン改善の発案やその実装、リッチテキストエディタの調査・導入などを行った
						</ListItem>
					</UList>
				</ListItem>
			</UList>
		</Tag>
	)
}
