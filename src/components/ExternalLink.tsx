import type { ReactNode } from 'react'
import styles from './ExternalLink.module.css'

export default function StyledAnchor({
	href,
	children
}: {
	href: string
	children: ReactNode
}) {
	return (
		<a
			className={styles.wrap}
			rel="noopener noreferrer"
			target="_blank"
			href={href}
		>
			{children}
		</a>
	)
}
