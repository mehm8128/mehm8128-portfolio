'use client'

import { Box, Heading, Link as KumaLink, css } from '@kuma-ui/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navs } from '@/consts/navs'

export default function Header() {
	const pathname = usePathname()

	return (
		<Box
			as="header"
			zIndex={2}
			minHeight={64}
			position="fixed"
			display="flex"
			width="100%"
			flexWrap="wrap"
			alignItems="center"
			justifyContent="space-between"
			bgColor="#7dd3fc"
			px={16}
			py={8}
			boxShadow="0 0 8px 0 rgba(0, 0, 0, 0.2)"
		>
			<Heading as="h1" fontSize="1.875rem">
				<Link href="/">mehm8128</Link>
			</Heading>
			<Box
				as="nav"
				mr={16}
				mt={[8, 0]}
				display="flex"
				gap={[16, 32]}
				fontSize={['1rem', '1.25rem']}
			>
				{navs.map(nav => (
					<Link legacyBehavior href={nav.href} key={nav.href}>
						<KumaLink
							borderRadius="0.75rem"
							px={[8, 16]}
							py={8}
							_hover={{
								bgColor: '#38bdf8'
							}}
							className={
								pathname === nav.href
									? css`
											background-color: #38bdf8;
									  `
									: ''
							}
						>
							{nav.text}
						</KumaLink>
					</Link>
				))}
			</Box>
		</Box>
	)
}
