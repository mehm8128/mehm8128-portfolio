import Image from 'next/image'

import type { WorkType } from '../consts/works'

interface Props {
	work: WorkType
	onClose: () => void
}

export default function WorkModal({ work, onClose }: Props) {
	const { title, imagePath, longDescription, links, productLink } = work

	return (
		<>
			<div className='text-center'>
				{imagePath ? (
					<Image
						alt=''
						className='object-contain'
						height={400}
						src={imagePath}
						width={860}
					/>
				) : (
					<p className='h-100 w-215 flex items-center justify-center'>
						画像なし
					</p>
				)}
			</div>
			<section className='py-4'>
				<h3 className='mb-2 text-2xl'>{title}</h3>
				<h4 className='text-lg'>作品リンク</h4>
				{productLink !== '' ? (
					<p>
						<a className='text-sky-500 hover:text-sky-600' href={productLink}>
							{productLink}
						</a>
					</p>
				) : (
					<p>なし</p>
				)}
				<h4 className='text-lg'>その他リンク</h4>
				{links.length > 0 ? (
					links.map(link => (
						<p key={link.url}>
							<a
								className='text-sky-500 hover:text-sky-600'
								href={link.url}
								key={link.url}
							>
								{link.name}
							</a>
						</p>
					))
				) : (
					<p>なし</p>
				)}
				<p className='my-2 whitespace-pre-wrap'>{longDescription}</p>
			</section>
			<div className='text-center'>
				<button
					className='rounded-md border-2 px-12 py-2 hover:border-sky-300'
					onClick={onClose}
				>
					閉じる
				</button>
			</div>
		</>
	)
}
