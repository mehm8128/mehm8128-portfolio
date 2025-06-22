import { formatDate } from '../../lib/date'
import styles from './Footer.module.css'

export default function Footer() {
	const deployDateTime = process.env.NEXT_PUBLIC_BUILD_TIME

	return (
		<footer className={styles.footer}>
			<span>Last updated at</span>
			<time dateTime={deployDateTime}>
				{deployDateTime ? (
					<>{formatDate(new Date(deployDateTime))} (UTC)</>
				) : (
					'Failed to get the last updated date'
				)}
			</time>
		</footer>
	)
}
