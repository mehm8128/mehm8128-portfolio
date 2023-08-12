import Image from 'next/image'

import type { WorkType } from '../consts/works'

interface Props {
	work: WorkType
	setCurrentWork: (work: WorkType) => void
}

export default function Work({ work, setCurrentWork }: Props) {
	const { title, imagePath, description } = work

	return (
		<div className='w-88 h-88 border border-sky-200 p-4 md:h-96'>
			{imagePath ? (
				<Image alt='' className='object-contain' height={160} src={imagePath} width={320} />
			) : (
				<div className='bg-light-50 flex h-40 items-center justify-center border'>画像なし</div>
			)}
			<h3 className='py-2 text-xl font-bold'>{title}</h3>
			<p className='h-16 md:h-24'>{description}</p>
			<button
				className='h-10 w-full border-2 py-1 hover:border-sky-300'
				onClick={() => setCurrentWork(work)}
			>
				詳細を見る
			</button>
		</div>
	)
}
