import type { NextPage } from 'next';
import { useState } from 'react';

import { Work } from '../components/Work';
import { WorkModal } from '../components/WorkModal';
import { works } from '../constants/works';
import type { WorkType } from '../constants/works';

const Works: NextPage = () => {
	const [currentWork, setCurrentWork] = useState<WorkType>();
	return (
		<>
			<div className='flex justify-center py-8'>
				<h2 className='flex items-center text-3xl'>制作物</h2>
			</div>
			<div className='mx-2 mb-20'>
				<ul className='flex flex-wrap justify-center gap-4 md:justify-start'>
					{works.map((work) => (
						<li key={work.title}>
							<Work setCurrentWork={setCurrentWork} work={work} />
						</li>
					))}
				</ul>
			</div>
			{currentWork !== undefined ? (
				<WorkModal setCurrentWork={setCurrentWork} work={currentWork} />
			) : null}
		</>
	);
};

export default Works;
