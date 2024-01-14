import { Box, Flex, Heading, Text, VStack, css } from '@kuma-ui/core'
import Image from 'next/image'

import { DeployDateTimeResponse } from '@/app/api/deploy_datetime/route'

import StyledAnchor from '@/components/StyledAnchor'

import Contribution from '@/app/_component/Contribution'
import Event from '@/app/_component/Event'
import Internship from '@/app/_component/Internship'
import Trap from '@/app/_component/Trap'
import { links } from '@/consts/links'
import { formatDate } from '@/lib/date'
import IconImg from '/public/assets/mehm8128_circle.png'

const fetchDeployDate = async () => {
	const res = await fetch(
		'https://mehm8128-portfolio.vercel.app/api/deploy_datetime'
	)
	if (!res.ok) throw new Error('Failed to fetch deploy date')

	const data: DeployDateTimeResponse = await res.json()
	return data.deployDateTime
}

export default async function Home() {
	const deployDateTime = await fetchDeployDate()

	return (
		<Box>
			<VStack gap={12} mx="auto" width={['90%', '60%']}>
				<Heading
					alignItems="center"
					as="h1"
					display="flex"
					flexWrap="wrap"
					fontSize="1.875rem"
					gap={16}
					pt={32}
					pb={16}
				>
					<Image
						alt=""
						src={IconImg}
						className={css`
						width: 60px;
						height: 60px;
					`}
					/>
					mehm8128
					<Flex alignItems="center" gap={20}>
						{links.map(link => (
							<StyledAnchor key={link.alt} href={link.href}>
								<Image
									src={link.src}
									alt={link.alt}
									className={css`
									width: 24px;
									height: 24px;
								`}
								/>
							</StyledAnchor>
						))}
					</Flex>
				</Heading>

				<Box as="section">
					<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
						所属
					</Heading>
					<Text>
						東京工業大学工学院情報通信系(2021年4月～)、東京工業大学デジタル創作同好会traP
					</Text>
				</Box>
				<Box as="section">
					<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
						スキル
					</Heading>
					<Text>
						Next.js、React、TypeScript、Storybook、a11y、Git、Rust、Vue.js、Go
					</Text>
				</Box>

				<Event />
				<Internship />
				<Trap />
				<Contribution />
			</VStack>

			<Text display="flex" gap={8} justifyContent="end">
				<span>最終更新日時</span>
				<time dateTime={deployDateTime}>
					{formatDate(new Date(deployDateTime))}
				</time>
			</Text>
		</Box>
	)
}
