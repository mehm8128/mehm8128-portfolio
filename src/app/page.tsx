import { Flex, Heading, Box, Text } from '@kuma-ui/core'
import Image from 'next/image'

import { DeployDateTimeResponse } from '@/app/api/deploy_datetime/route'

import StyledAnchor from '@/components/StyledAnchor'

import { links } from '@/consts/links'
import { formatDate } from '@/lib/date'

const fetchDeployDate = async () => {
	const res = await fetch(
		'https://mehm8128-portfolio.vercel.app/api/deploy_datetime',
	)
	if (!res.ok) throw new Error('Failed to fetch deploy date')
	const data = (await res.json()) as DeployDateTimeResponse
	return data.deployDateTime
}

export default async function Home() {
	const deployDateTime = await fetchDeployDate()

	return (
		<>
			<Heading
				alignItems='center'
				as='h2'
				display='flex'
				fontSize='1.875rem'
				gap={8}
				justifyContent='center'
				py={32}
			>
				<Image
					alt=''
					height={60}
					width={60}
					src='/assets/mehm8128_circle.png'
				/>
				mehm8128
			</Heading>
			<Box mx='auto' width={['80%', '50%']} lineHeight={1.625}>
				<p>ここはmehm8128（読み方：めふも）のポートフォリオサイトです。</p>
				<ul>
					<li>
						所属：東京工業大学工学院情報通信系(2021年4月～)、東京工業大学デジタル創作同好会traP
					</li>
					<li>
						フロントエンド：Next.js、React、Vue.js、TypeScript、Storybookなど
					</li>
					<li>バックエンド：Go</li>
				</ul>
			</Box>
			<Flex
				mt={48}
				flexWrap='wrap'
				justifyContent='center'
				gap={48}
				fontSize='1.5rem'
			>
				{links.map(link => (
					<StyledAnchor key={link.href} href={link.href}>
						{link.text}
					</StyledAnchor>
				))}
			</Flex>
			<Text mr={8} mt={16} textAlign='end'>
				最終更新日時：{formatDate(new Date(deployDateTime))}
			</Text>
		</>
	)
}