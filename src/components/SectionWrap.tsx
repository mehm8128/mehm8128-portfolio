import { type ReactNode, useId } from 'react'
import styles from './SectionWrap.module.css'

export default function SectionWrap({
	headingText,
	level = 2,
	children
}: {
	headingText: string
	level?: number
	children: ReactNode
}) {
	const id = useId()
	const Heading = `h${level}` as keyof JSX.IntrinsicElements

	return (
		<section className={styles.wrap} aria-labelledby={id}>
			<Heading className={styles.heading} id={id}>
				{headingText}
			</Heading>
			{children}
		</section>
	)
}
