import type { ReactNode } from 'react'
import styles from './SectionWrap.module.css'

export default function SectionWrap({
	headingText,
	children
}: { headingText: string; children: ReactNode }) {
	return (
		<div className={styles.wrap}>
			<h2 className={styles.heading}>{headingText}</h2>
			{children}
		</div>
	)
}
