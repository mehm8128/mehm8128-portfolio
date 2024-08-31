import 'the-new-css-reset/css/reset.css'
import './globals.css'

import { Box } from '@kuma-ui/core'
import { KumaRegistry } from '@kuma-ui/next-plugin/registry'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'mehm8128-portfolio'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ja">
			<body>
				<KumaRegistry>
					<Box
						as="main"
						bgColor="#0a1e69"
						color="#edf1ff"
						fontSize={['', '1.25rem']}
						height="100vh"
						overflow="visible scroll"
						pb={48}
						px={[16, 32]}
						pt={[32, 64]}
					>
						{children}
					</Box>
				</KumaRegistry>
			</body>
		</html>
	)
}
