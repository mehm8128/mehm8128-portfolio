import { Box, Button, Heading, Text, css } from '@kuma-ui/core'
import Image from 'next/image'

import StyledAnchor from '@/components/StyledAnchor'
import Tag from '@/components/Tag'

import type { WorkType } from '../consts/works'

export default function WorkModalContent({
	work,
	onClose,
}: {
	work: WorkType
	onClose: () => void
}) {
	const { title, imagePath, longDescription, links, productLink } = work

	return (
		<>
			<Box textAlign="center">
				{imagePath ? (
					<Image
						alt=""
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
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						画像なし
					</Text>
				)}
			</Box>
			<Box as="section" py={16}>
				<Heading as="h3" mb={8} fontSize="1.5rem">
					{title}
				</Heading>
				<Tag
					tagName={<Heading as="h4">作品リンク</Heading>}
					className={css`
						margin-bottom: 0.5rem;
					`}
				>
					{productLink !== '' ? (
						<p>
							<StyledAnchor href={productLink}>{productLink}</StyledAnchor>
						</p>
					) : (
						<p>なし</p>
					)}
				</Tag>
				<Tag
					direction="column"
					tagName={<Heading as="h4">その他リンク</Heading>}
				>
					<Box>
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
					</Box>
				</Tag>
				<Text my={8} whiteSpace="pre-wrap">
					{longDescription}
				</Text>
			</Box>
			<Box textAlign="center">
				<Button
					border="solid 1.5px #b8c0d2"
					px={48}
					py={8}
					_hover={{ borderColor: '#7dd3fc' }}
					borderRadius="0.375rem"
					onClick={onClose}
				>
					閉じる
				</Button>
			</Box>
		</>
	)
}
