import StyledAnchor from '@/components/ExternalLink'
import UList, { ListItem } from '@/components/List'
import SectionWrap from '@/components/SectionWrap'

export default function Background() {
	return (
		<SectionWrap headingText="Backgrounds">
			<UList>
				<ListItem>
					2021年4月～2024年9月 東京工業大学 工学院情報通信系
					(早期卒業)、東京工業大学デジタル創作同好会traP
				</ListItem>
				<ListItem>
					2022年11月～2025年2月 株式会社ナンバーナイン 長期インターン、業務委託
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://zenn.dev/no9_dev/articles/next-migration">
								ナンバーナインのフロントエンドをNext.jsに移行した
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://twitter.com/yudai112535/status/1655919698398289933?s=20">
								リリースツイート
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://x.com/no9editor/status/1752528473518948490?s=20">
								リリースツイート2
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					2023年8月～9月 株式会社ゆめみ 2週間のサマーインターン
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://note.com/mehm8128/n/n2acd21311531">
								参加記事
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					2023年9月 株式会社ナレッジワーク 2週間のサマーインターン
				</ListItem>
				<ListItem>2024年8～9月 株式会社CoeFont 業務委託</ListItem>
				<ListItem>2024年10月～ サイボウズ株式会社 内定者アルバイト</ListItem>
			</UList>
		</SectionWrap>
	)
}
