'use client'

import { Heading, Box, Flex } from '@kuma-ui/core'
import { useEffect, useRef, useState } from 'react'

import Modal from '@/components/Modal'
import Work from '@/components/Work'
import WorkModalContent from '@/components/WorkModalContent'

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
		const work = works.find(work => work.id === workId)
		if (!work) return
		handleSetCurrentWork(work)
	}, [workId])

	return (
		<div>
			<Heading
				as='h2'
				display='flex'
				justifyContent='center'
				py={32}
				alignItems='center'
				fontSize='1.875rem'
			>
				制作物
			</Heading>
			<Box px={[32, 48]} pb={80}>
				<Flex as='ul' flexWrap='wrap' gap={48}>
					{works.map(work => (
						<li key={work.title}>
							<Work setCurrentWork={handleSetCurrentWork} work={work} />
						</li>
					))}
				</Flex>
			</Box>
			<Modal ref={dialogRef} onClose={handleCloseModal}>
				{currentWork && (
					<WorkModalContent work={currentWork} onClose={handleCloseModal} />
				)}
			</Modal>
		</div>
	)
}
