import { Box, css } from '@kuma-ui/core'
import clsx from 'clsx'

export default function ListItem({
	isNested,
	children
}: {
	isNested?: boolean
	children: React.ReactNode
}) {
	return (
		<Box
			as="li"
			lineHeight="2rem"
			className={clsx(
				isNested
					? css`
							margin-left: 32px;
					  `
					: '',
				css`
				&::before {
					content: '・';
					display: inline;
					margin-right: 8px;
					@media (width<= 768px) {
						margin-right: 0px;
					}
				}
				`
			)}
		>
			{children}
		</Box>
	)
}
