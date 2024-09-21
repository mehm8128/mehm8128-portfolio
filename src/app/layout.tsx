import 'the-new-css-reset/css/reset.css'
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import styles from './layout.module.css'

export const metadata: Metadata = {
	title: 'mehm8128-portfolio'
}

export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
	return (
		<html lang="ja">
			<body>
				<main className={styles.wrap}>{children}</main>
			</body>
		</html>
	)
}
