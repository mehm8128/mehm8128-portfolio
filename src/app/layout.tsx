import 'the-new-css-reset/css/reset.css'
import './globals.css'

import { Box } from '@kuma-ui/core'
import { KumaRegistry } from '@kuma-ui/next-plugin/registry'
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
		<html lang="ja">
			<body>
				<KumaRegistry>
					<Header />
					<Box
						as="main"
						bgColor="#f4f4f4"
						fontSize={['', '1.25rem']}
						height="100vh"
						overflow="visible scroll"
						pb={48}
						pt={[104, 64]}
					>
						{children}
					</Box>
				</KumaRegistry>
			</body>
		</html>
	)
}
