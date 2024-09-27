import 'the-new-css-reset/css/reset.css'
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import styles from './layout.module.css'

export const metadata: Metadata = {
	title: 'mehm8128-portfolio',
	description: 'mehm8128のポートフォリオです。',
	openGraph: {
		type: 'website',
		locale: 'ja_JP',
		url: 'https://mehm8128-portfolio.vercel.app/',
		title: 'mehm8128-portfolio',
		description: 'mehm8128のポートフォリオです。',
		siteName: 'mehm8128-portfolio'
	},
	twitter: {
		card: 'summary',
		site: '@mehm08128',
		title: 'mehm8128-portfolio',
		description: 'mehm8128のポートフォリオです。'
	}
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
