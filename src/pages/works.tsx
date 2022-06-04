import type { NextPage } from "next"

import { Work } from "../components/Work"
import { works } from "../constants/works"

const Works: NextPage = () => {
	return (
		<>
			<div className="flex justify-center py-8">
				<h2 className="text-3xl flex items-center">制作物</h2>
			</div>
			<div>
				<ul className="flex gap-4 flex-wrap">
					{works.map((work) => (
						<li key={work.title}>
							<Work
								title={work.title}
								description={work.description}
								imagePath={work.imagePath}
							/>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default Works
