'use client'

import { useEffect, useRef, useState } from 'react'

import ModalWrapper from '@/components/ModalWrapper'
import Work from '@/components/Work'
import WorkModal from '@/components/WorkModal'
import { works } from '@/consts/works'
import type { WorkType } from '@/consts/works'

export default function Works({
	searchParams: { workId },
}: {
	searchParams: { workId: string }
}) {
	const [currentWork, setCurrentWork] = useState<WorkType | undefined>()
	const dialogRef = useRef<HTMLDialogElement>(null)

	function handleSetCurrentWork(currentWork: WorkType) {
		setCurrentWork(currentWork)
		if (!dialogRef.current) return
		dialogRef.current.showModal()
	}
	function handleCloseModal() {
		setCurrentWork(undefined)
		if (!dialogRef.current) return
		dialogRef.current.close()
	}

	useEffect(() => {
		if (!workId) return
		const work = works.find((work) => work.id === workId)
		if (!work) return
		handleSetCurrentWork(work)
	}, [workId])

	return (
		<div>
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
			<ModalWrapper ref={dialogRef} onClose={handleCloseModal}>
				{currentWork && (
					<WorkModal work={currentWork} onClose={handleCloseModal} />
				)}
			</ModalWrapper>
		</div>
	)
}
