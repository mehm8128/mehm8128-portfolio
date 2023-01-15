import type { NextPage } from 'next'
import { useState } from 'react'

import { ModalWrapper } from '../components/ModalWrapper'
import { Work } from '../components/Work'
import { WorkModal } from '../components/WorkModal'
import { works } from '../constants/works'
import type { WorkType } from '../constants/works'
import { useModal } from '../hooks/useModal'

const Works: NextPage = () => {
	const [currentWork, setCurrentWork] = useState<WorkType>()
	const { isModalOpen, openModal, closeModal } = useModal()

	function handleSetCurrentWork(currentWork: WorkType) {
		setCurrentWork(currentWork)
		openModal()
	}
	function handleCloseModal() {
		setCurrentWork(undefined)
		closeModal()
	}

	return (
		<>
			<div className='flex justify-center py-8'>
				<h2 className='flex items-center text-3xl'>制作物</h2>
			</div>
			<div className='mx-2 mb-20'>
				<ul className='flex flex-wrap justify-center gap-4 md:justify-start'>
					{works.map((work) => (
						<li key={work.title}>
							<Work setCurrentWork={handleSetCurrentWork} work={work} />
						</li>
					))}
				</ul>
			</div>
			{isModalOpen && currentWork !== undefined ? (
				<ModalWrapper onClose={handleCloseModal}>
					<WorkModal work={currentWork} onClose={handleCloseModal} />
				</ModalWrapper>
			) : null}
		</>
	)
}

export default Works
