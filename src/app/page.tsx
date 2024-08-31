import { Box, Flex, Heading, Text, VStack, css } from '@kuma-ui/core'
import Image from 'next/image'

import { DeployDateTimeResponse } from '@/app/api/deploy_datetime/route'

import StyledAnchor from '@/components/StyledAnchor'

import { links } from '@/consts/links'
import { formatDate } from '@/lib/date'
import IconImg from '/public/mehm8128_circle.png'
import Blog from './_component/Blog'
import Contribution from './_component/Contribution'
import Event from './_component/Event'
import Internship from './_component/Internship'

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
						width={60}
						height={60}
						className={css`
						@keyframes iconFadein {
							0% {
								transform: translateX(-50vw) rotate(9000deg);
							}
							100% {
								transform: translateX(0%) rotate(0deg);
							}
						}
						animation: iconFadein 4s ease-out;
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

				<VStack
					gap={20}
					className={css`
						@keyframes oddFadein {
							0% {
								transform: translateX(100%) rotate(180deg);
							}
							100% {
								transform: translateX(0%) rotate(0deg);
							}
						}
						@keyframes evenFadein {
							0% {
								transform: translateX(-100%) rotate(-180deg);
							}
							100% {
								transform: translateX(0%) rotate(0deg);
							}
						}
					`}
				>
					<Box as="section" animation="oddFadein 1s ease-out">
						<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
							所属
						</Heading>
						<Text>
							東京工業大学工学院情報通信系(2021年4月～2024年9月)、東京工業大学デジタル創作同好会traP
						</Text>
					</Box>
					<Box as="section" animation="evenFadein 1.5s ease-out">
						<Heading as="h2" fontSize="1.5rem" fontWeight="bold">
							スキル
						</Heading>
						<Text>
							Next.js、React、TypeScript、Storybook、Testing、a11y、Git、Go、Rust、Vue.js
						</Text>
					</Box>

					<Internship />
					<Blog />
					<Event />
					<Contribution />
				</VStack>
			</VStack>

			<Text display="flex" gap={8} justifyContent="flex-end">
				<span>最終更新日時</span>
				<time dateTime={deployDateTime}>
					{formatDate(new Date(deployDateTime))}
				</time>
			</Text>
		</Box>
	)
}
