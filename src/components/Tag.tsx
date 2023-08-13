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
					  `
					: css`
							flex-direction: column;
							align-items: flex-start;
					  `,
				className,
			)}
		>
			<TagElement data-color={color}>{tagName}</TagElement>
			{children}
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
	color: #cecece;

	&::before {
		content: '';
		display: block;
		border-top: solid 3px #cecece;
		border-right: solid 3px #cecece;
		height: 16px;
		width: 16px;
		transform: rotate(-135deg);
	}
	&::after {
		content: '';
		display: block;
		border-top: solid 3px #cecece;
		border-right: solid 3px #cecece;
		height: 16px;
		width: 16px;
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
