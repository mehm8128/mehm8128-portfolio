import { Box, Flex, Button, Text, Heading } from '@kuma-ui/core'
import Image from 'next/image'

import type { WorkType } from '../consts/works'

interface Props {
	work: WorkType
	setCurrentWork: (work: WorkType) => void
}

export default function Work({ work, setCurrentWork }: Props) {
	const { title, imagePath, description } = work

	return (
		<Box width={352} height={[352, 384]} border='solid 1px #bae6fd' p={16}>
			{imagePath ? (
				<Image
					alt=''
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
					alignItems='center'
					justifyContent='center'
					border='solid 1px #e5e7eb'
					bgColor='#fdfdfd'
					height={160}
				>
					画像なし
				</Flex>
			)}
			<Heading as='h3' py={8} fontSize='1.25rem' fontWeight='bold'>
				{title}
			</Heading>
			<Text height={[64, 96]}>{description}</Text>
			<Button
				height={40}
				width='100%'
				border='solid 2px #e5e7eb'
				_hover={{
					border: 'solid 2px #0ea5e9',
				}}
				py={4}
				onClick={() => setCurrentWork(work)}
			>
				詳細を見る
			</Button>
		</Box>
	)
}
