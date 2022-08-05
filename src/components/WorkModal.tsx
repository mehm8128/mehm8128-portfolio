import Image from 'next/image';
import { SetStateAction } from 'react';
import type { WorkType } from '../constants/works';

interface Props {
	work: WorkType;
	setCurrentWork: React.Dispatch<SetStateAction<WorkType | undefined>>;
}

export const WorkModal: React.FC<Props> = ({ work, setCurrentWork }) => {
	const { title, imagePath, longDescription, links, productLink } = work;

	return (
		<div
			className='z-3 fixed top-0 left-0 h-full w-full bg-gray-300/50'
			onClick={() => setCurrentWork(undefined)}
		>
			<div
				className='h-6/7 w-6/7 md:w-5/7 absolute inset-0 my-auto mx-auto overflow-y-scroll bg-white p-4 shadow-lg'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='h-2/5 text-center md:h-3/5'>
					{imagePath ? (
						<Image alt='' className='object-cover ' height={400} src={imagePath} width={860} />
					) : (
						<p className='flex h-full items-center justify-center'>画像なし</p>
					)}
				</div>
				<section className='min-h-54 py-4'>
					<h3 className='mb-2 text-2xl'>{title}</h3>
					<h4>作品リンク</h4>
					{productLink !== '' ? (
						<p>
							<a className='text-cyan-500 hover:text-cyan-600' href={productLink}>
								{productLink}
							</a>
						</p>
					) : null}
					<h4> その他リンク</h4>
					{links.map((link) => (
						<p key={link.url}>
							<a className='text-cyan-500 hover:text-cyan-600' href={link.url} key={link.url}>
								{link.name}
							</a>
						</p>
					))}
					<p className='my-2'>{longDescription}</p>
				</section>
				<div className='text-center'>
					<button
						className='rounded-md border-2 py-2 px-12 hover:border-cyan-300'
						onClick={() => setCurrentWork(undefined)}
					>
						閉じる
					</button>
				</div>
			</div>
		</div>
	);
};
