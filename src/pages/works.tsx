import type { NextPage } from 'next'
import { useState } from 'react'

import { ModalWrapper } from '../components/ModalWrapper'
import { Work } from '../components/Work'
import { WorkModal } from '../components/WorkModal'
import { works } from '../consts/works'
import type { WorkType } from '../consts/works'
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
				<h2 className='text-3xl'>制作物</h2>
			</div>
			<div className='px-12 pb-20'>
				<ul className='flex flex-wrap gap-12'>
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
