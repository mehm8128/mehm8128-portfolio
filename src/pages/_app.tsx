import '../styles/globals.css'
import 'windi.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>mehm8128-portfolio</title>
			</Head>
			<Header />
			<main className='pt-26 h-screen overflow-y-scroll text-xl md:pt-16'>
				<Component {...pageProps} />
			</main>
		</>
	)
}

export default MyApp
