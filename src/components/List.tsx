import type { ReactNode } from 'react'
import styles from './List.module.css'

export default function UList({
	isNested,
	space,
	children
}: {
	isNested?: boolean
	space?: number
	children: ReactNode
}) {
	return (
		<ul className={styles.ul} data-is-nested={isNested}>
			{children}
		</ul>
	)
}

export function ListItem({
	isNested,
	children
}: {
	isNested?: boolean
	children: ReactNode
}) {
	return (
		<li className={styles.li} data-is-nested={isNested}>
			{children}
		</li>
	)
}
