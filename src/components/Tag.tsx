import { Box, Flex, styled, css } from '@kuma-ui/core'
import clsx from 'clsx'
import React from 'react'

type Direction = 'row' | 'column'
type TagType = 'primary' | 'secondary'

export default function Tag({
	tagName,
	as = 'div',
	children,
	color = 'secondary',
	direction = 'row',
	className = '',
}: {
	tagName: React.ReactNode
	as?: React.ElementType
	children: React.ReactNode
	color?: TagType
	direction?: Direction
	className?: string
}) {
	return (
		<Flex
			as={as}
			gap={8}
			flexWrap='wrap'
			className={clsx(
				direction === 'row'
					? css`
							flex-direction: row;
							align-items: center;

							@media (max-width: md) {
								align-items: flex-start;
								flex-direction: column;
							}
					  `
					: css`
							flex-direction: column;
							align-items: flex-start;
					  `,
				className,
			)}
		>
			<TagElement data-color={color}>{tagName}</TagElement>
			<Box
				className={
					direction === 'column'
						? css`
								margin-left: 1.25rem;
						  `
						: ''
				}
			>
				{children}
			</Box>
			<TagElement data-color={color}>
				<Box as='span' mr={2}>
					/
				</Box>
				{tagName}
			</TagElement>
		</Flex>
	)
}

const TagElement = styled('div')`
	display: flex;
	align-items: center;
	color: #af5718;

	&::before {
		content: '';
		display: block;
		border-top: solid 2px #af5718;
		border-right: solid 2px #af5718;
		height: 12px;
		width: 12px;
		transform: rotate(-135deg);
	}
	&::after {
		content: '';
		display: block;
		border-top: solid 2px #af5718;
		border-right: solid 2px #af5718;
		height: 12px;
		width: 12px;
		transform: rotate(45deg);
	}

	&[data-color='primary'] {
		color: #2d2d2d;
	}
	&[data-color='primary']::before {
		border-top: solid 3px #2d2d2d;
		border-right: solid 3px #2d2d2d;
	}
	&[data-color='primary']::after {
		border-top: solid 3px #2d2d2d;
		border-right: solid 3px #2d2d2d;
	}
`
