import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ModalWrapper } from '../components/ModalWrapper'
import { Work } from '../components/Work'
import { WorkModal } from '../components/WorkModal'
import { works } from '../consts/works'
import type { WorkType } from '../consts/works'
import { useModal } from '../hooks/useModal'

const Works: NextPage = () => {
	const [currentWork, setCurrentWork] = useState<WorkType>()
	const { isModalOpen, openModal, closeModal } = useModal()
	const router = useRouter()

	function handleSetCurrentWork(currentWork: WorkType) {
		setCurrentWork(currentWork)
		openModal()
	}
	function handleCloseModal() {
		setCurrentWork(undefined)
		closeModal()
	}

	useEffect(() => {
		if (router.query.work) {
			const work = works.find((work) => work.id === router.query.work)
			if (work) {
				handleSetCurrentWork(work)
			}
		}
	}, [router.query.work])

	return (
		<>
			<div className='flex justify-center py-8'>
				<h2 className='flex items-center text-3xl'>制作物</h2>
			</div>
			<div className='px-4 pb-20 md:px-12'>
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
