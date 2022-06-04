import "../styles/globals.css"
import "windi.css"

import type { AppProps } from "next/app"
import { Header } from "../components/Header"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<main className="pt-16">
				<Component {...pageProps} />
			</main>
		</>
	)
}

export default MyApp
