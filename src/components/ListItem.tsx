import { Box, css } from '@kuma-ui/core'

interface Props {
	isNested?: boolean
	children: React.ReactNode
}

export default function ListItem({ isNested, children }: Props) {
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
