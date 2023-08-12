import './globals.css'
import 'windi.css'

import { Metadata } from 'next'

import Header from '@/components/Header'

export const metadata: Metadata = {
	title: 'mehm8128-portfolio',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ja'>
			<body>
				<Header />
				<main className='pt-26 bg-light-200 h-screen overflow-y-scroll pb-12 md:pt-16 md:text-xl'>
					{children}
				</main>
			</body>
		</html>
	)
}
