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
			<div className="flex justify-center py-8">
				<h2 className="text-3xl flex items-center">制作物</h2>
			</div>
			<div className="mb-20 mx-2">
				<ul className="flex gap-4 flex-wrap justify-center md:justify-between">
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
