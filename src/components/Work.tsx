import { Box, Button, Flex, Heading, Text } from '@kuma-ui/core'
import Image from 'next/image'

import type { WorkType } from '../consts/works'

export default function Work({
	work,
	setCurrentWork,
}: {
	work: WorkType
	setCurrentWork: (work: WorkType) => void
}) {
	const { title, imagePath, description } = work

	return (
		<Box
			width={352}
			height={['auto', 384]}
			border="solid 3px #bae6fd"
			borderRadius={12}
			p={16}
		>
			{imagePath ? (
				<Image
					alt=""
					style={{
						objectFit: 'contain',
						height: 160,
						width: 320,
					}}
					height={160}
					src={imagePath}
					width={320}
				/>
			) : (
				<Flex
					alignItems="center"
					justifyContent="center"
					border="solid 1px #e5e7eb"
					bgColor="#fdfdfd"
					height={160}
				>
					画像なし
				</Flex>
			)}
			<Heading as="h3" py={8} fontSize="1.25rem" fontWeight="bold">
				{title}
			</Heading>
			<Text height={['auto', 96]}>{description}</Text>
			<Button
				height={40}
				width="100%"
				border="solid 1.5px #b8c0d2"
				_hover={{
					borderColor: '#7dd3fc',
				}}
				mt={8}
				py={4}
				onClick={() => setCurrentWork(work)}
			>
				詳細を見る
			</Button>
		</Box>
	)
}
