import { Box, css } from '@kuma-ui/core'

export default function ListItem({
	isNested,
	children,
}: {
	isNested?: boolean
	children: React.ReactNode
}) {
	return (
		<Box
			as='li'
			lineHeight='2rem'
			className={
				isNested
					? css`
							margin-left: 32px;
					  `
					: ''
			}
		>
			{children}
		</Box>
	)
}
