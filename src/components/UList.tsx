import { Box, css } from '@kuma-ui/core'

interface Props {
	isNested?: boolean
	space?: number
	children: React.ReactNode
}

//todo: use space
export default function UList({ isNested, space, children }: Props) {
	return (
		<Box
			as='ul'
			listStyle='disc'
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
