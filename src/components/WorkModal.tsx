import { Box, Button, Heading, Text } from '@kuma-ui/core'
import Image from 'next/image'

import StyledAnchor from '@/components/StyledAnchor'

import type { WorkType } from '../consts/works'

interface Props {
	work: WorkType
	onClose: () => void
}

export default function WorkModal({ work, onClose }: Props) {
	const { title, imagePath, longDescription, links, productLink } = work

	return (
		<>
			<Box textAlign='center'>
				{imagePath ? (
					<Image
						alt=''
						style={{
							objectFit: 'contain',
						}}
						height={400}
						src={imagePath}
						width={860}
					/>
				) : (
					<Text
						height={400}
						width={860}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						画像なし
					</Text>
				)}
			</Box>
			<Box as='section' py={16}>
				<Heading as='h3' mb={8} fontSize='1.5rem'>
					{title}
				</Heading>
				<Heading as='h4' fontSize='1.125rem'>
					作品リンク
				</Heading>
				{productLink !== '' ? (
					<p>
						<StyledAnchor href={productLink}>{productLink}</StyledAnchor>
					</p>
				) : (
					<p>なし</p>
				)}
				<Heading as='h4' fontSize='1.125rem'>
					その他リンク
				</Heading>
				{links.length > 0 ? (
					links.map(link => (
						<p key={link.url}>
							<StyledAnchor href={link.url} key={link.url}>
								{link.name}
							</StyledAnchor>
						</p>
					))
				) : (
					<p>なし</p>
				)}
				<Text my={8} whiteSpace='pre-wrap'>
					{longDescription}
				</Text>
			</Box>
			<Box textAlign='center'>
				<Button
					border='solid 2px #e5e7eb'
					px={48}
					py={8}
					_hover={{ borderColor: '#7dd3fc' }}
					borderRadius='0.375rem'
					onClick={onClose}
				>
					閉じる
				</Button>
			</Box>
		</>
	)
}
