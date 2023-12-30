import { Box, Flex, Heading, Text, VStack, css } from '@kuma-ui/core'
import Image from 'next/image'

import { DeployDateTimeResponse } from '@/app/api/deploy_datetime/route'

import StyledAnchor from '@/components/StyledAnchor'

import NextLink from '@/components/NextLink'
import { links } from '@/consts/links'
import { navs } from '@/consts/navs'
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
			<VStack gap={12} mx="auto" width={['80%', '60%']}>
				<Heading
					alignItems="center"
					as="h1"
					display="flex"
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
				</Heading>
				<Box as="section">
					<Heading as="h2">所属</Heading>
					<Text>
						東京工業大学工学院情報通信系(2021年4月～)、東京工業大学デジタル創作同好会traP
					</Text>
				</Box>
				<Box as="section">
					<Heading as="h2">スキル</Heading>
					<Text>Next.js、React、TypeScript、Storybook、a11y、Vue.js、Go</Text>
				</Box>
			</VStack>

			<Flex alignItems="center" gap={24} width="fit-content" mx="auto" my={32}>
				{navs.map(nav => (
					<NextLink
						href={nav.href}
						key={nav.href}
						className={css`
						font-size: 1.5rem;
					`}
					>
						{nav.text}
					</NextLink>
				))}
			</Flex>

			<Flex
				gap={[16, 24]}
				justifyContent="end"
				alignItems={['end', 'center']}
				flexDirection={['column', 'row']}
			>
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
				<Text display="flex" gap={8}>
					<span>最終更新日時</span>
					<time dateTime={deployDateTime}>
						{formatDate(new Date(deployDateTime))}
					</time>
				</Text>
			</Flex>
		</Box>
	)
}
