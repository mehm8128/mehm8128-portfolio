import Image from 'next/image';
import { SetStateAction } from 'react';
import type { WorkType } from '../constants/works';

interface Props {
	work: WorkType;
	setCurrentWork: React.Dispatch<SetStateAction<WorkType | undefined>>;
}

export const Work: React.FC<Props> = ({ work, setCurrentWork }) => {
	const { title, imagePath, description } = work;

	return (
		<div className='h-80 w-80 border border-cyan-200 p-4'>
			{imagePath ? (
				<Image alt='' className='object-cover' height={160} src={imagePath} width={320} />
			) : (
				<div className='h-37 flex items-center justify-center border'>画像なし</div>
			)}
			<h3 className='py-2 text-xl'>{title}</h3>
			<p className='h-16' dangerouslySetInnerHTML={{ __html: description }} />
			<button
				className='h-8 w-full border-2 hover:border-cyan-300'
				onClick={() => setCurrentWork(work)}
			>
				詳細を見る
			</button>
		</div>
	);
};
