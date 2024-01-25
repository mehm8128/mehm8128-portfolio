import { Box, css } from '@kuma-ui/core'

//TODO: use space
export default function UList({
	isNested,
	space,
	children
}: {
	isNested?: boolean
	space?: number
	children: React.ReactNode
}) {
	return (
		<Box
			as="ul"
			listStyle="none"
			listStylePosition="inside"
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
