import type { NextPage } from "next"
import { useState } from "react"

import { Work } from "../components/Work"
import { WorkModal } from "../components/WorkModal"
import { works } from "../constants/works"
import type { WorkType } from "../constants/works"

const Works: NextPage = () => {
	const [currentWork, setCurrentWork] = useState<WorkType>()
	return (
		<>
			<div className="flex py-8 justify-center">
				<h2 className="flex text-3xl items-center">制作物</h2>
			</div>
			<div className="mx-2 mb-20">
				<ul className="flex flex-wrap gap-4 justify-center md:justify-between">
					{works.map((work) => (
						<li key={work.title}>
							<Work work={work} setCurrentWork={setCurrentWork} />
						</li>
					))}
				</ul>
			</div>
			{currentWork !== undefined ? (
				<WorkModal work={currentWork} setCurrentWork={setCurrentWork} />
			) : null}
		</>
	)
}

export default Works
