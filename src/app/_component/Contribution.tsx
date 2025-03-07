import StyledAnchor from '@/components/ExternalLink'
import UList, { ListItem } from '@/components/List'
import SectionWrap from '@/components/SectionWrap'

export default function Contribution() {
	return (
		<SectionWrap headingText="Contributions">
			<UList>
				<ListItem>
					Features and Bugfixes
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://github.com/biomejs/biome/pull/1551">
								feat(linter): show dependency variable name by
								useExhaustiveDependencies #1551 · biomejs/biome
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/biomejs/biome/pull/4810">
								fix(css_semantic): semantic event for css supports at-rule #4810
								· biomejs/biome
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/kuma-ui/kuma-ui/pull/283">
								Fix the way to calculate processedProps #283 · kuma-ui/kuma-ui
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/adobe/react-spectrum/pull/7239">
								fix: useButton href condition #7239 · adobe/react-spectrum
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/47ng/nuqs/pull/704#event-14844194210">
								doc: Fix date inputs on Chrome #704 · 47ng/nuqs
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/vuejs/vitepress/pull/2941">
								fix: customizing the starting line number even if globally set
								#2941 · vuejs/vitepress
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
				<ListItem>
					Docs
					<UList isNested>
						<ListItem>
							<StyledAnchor href="https://github.com/mdn/translated-content/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+">
								mdn/translated-content への Pull Request
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/biomejs/website/pull/1615">
								docs(ja): translate gritql page #1615 · biomejs/website
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/biomejs/website/pull/1046">
								docs: translate some page to Japanese #1046 · biomejs/website
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/fabian-hiller/valibot/pull/738">
								Doc: add tupleAsync docs #738 · fabian-hiller/valibot
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/fabian-hiller/valibot/pull/739">
								Doc: add tupleWithRestAsync doc #739 · fabian-hiller/valibot
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/fabian-hiller/valibot/pull/740">
								Doc: add looseTupleAsync doc #740 · fabian-hiller/valibot
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/fabian-hiller/valibot/pull/741">
								Doc: add strictTupleAsync doc #741 · fabian-hiller/valibot
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/vercel/swr-site/pull/344">
								doc: translate typescript page into Japanese #344 ·
								vercel/swr-site
							</StyledAnchor>
						</ListItem>
						<ListItem>
							<StyledAnchor href="https://github.com/biomejs/biome/pull/1836">
								fix(website): show eslint-plugin-import-access link name #1836 ·
								biomejs/biome
							</StyledAnchor>
						</ListItem>
					</UList>
				</ListItem>
			</UList>
		</SectionWrap>
	)
}
