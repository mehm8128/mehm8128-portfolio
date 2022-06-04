import type { NextPage } from "next"

import { Header } from '../components/Header'

const Links: NextPage = () => {
	return (
		<>
			<Header />
			<main>
				<div className="flex justify-center py-12">
					<h2 className="text-3xl flex items-center">リンク</h2>
				</div>
			</main>
		</>
	)
}

export default Links
