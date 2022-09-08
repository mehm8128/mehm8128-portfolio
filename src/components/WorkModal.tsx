import Image from 'next/image';
import type { WorkType } from '../constants/works';

interface Props {
	work: WorkType;
	onClose: () => void;
}

export const WorkModal: React.FC<Props> = ({ work, onClose }) => {
	const { title, imagePath, longDescription, links, productLink } = work;

	return (
		<>
			<div className='h-2/5 text-center md:h-3/5'>
				{imagePath ? (
					<Image alt='' className='object-cover ' height={400} src={imagePath} width={860} />
				) : (
					<p className='flex h-full items-center justify-center'>画像なし</p>
				)}
			</div>
			<section className='min-h-54 py-4'>
				<h3 className='mb-2 text-2xl'>{title}</h3>
				<h4 className='text-lg'>作品リンク</h4>
				{productLink !== '' ? (
					<p>
						<a className='text-cyan-500 hover:text-cyan-600' href={productLink}>
							{productLink}
						</a>
					</p>
				) : (
					<p>なし</p>
				)}
				<h4 className='text-lg'>その他リンク</h4>
				{links.length > 0 ? (
					links.map((link) => (
						<p key={link.url}>
							<a className='text-cyan-500 hover:text-cyan-600' href={link.url} key={link.url}>
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
				<button className='rounded-md border-2 py-2 px-12 hover:border-cyan-300' onClick={onClose}>
					閉じる
				</button>
			</div>
		</>
	);
};
