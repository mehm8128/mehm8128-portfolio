import Image from "next/image"
import { SetStateAction } from "react"
import type { WorkType } from "../constants/works"

interface Props {
	work: WorkType
	setCurrentWork: React.Dispatch<SetStateAction<WorkType | undefined>>
}

export const WorkModal: React.FC<Props> = ({ work, setCurrentWork }) => {
	const { title, imagePath, longDescription, githubLink, productLink } = work

	return (
		<div
			className="fixed bg-gray-300/50 h-full w-full top-0 left-0 z-3"
			onClick={() => setCurrentWork(undefined)}
		>
			<div
				className="w-5/7 h-6/7 p-4 bg-white shadow-lg mx-auto my-auto absolute inset-0 overflow-y-scroll"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="h-3/5 text-center">
					{imagePath ? (
						<Image
							src={imagePath}
							width={860}
							height={400}
							alt=""
							className="object-cover "
						/>
					) : (
						<p className="flex justify-center items-center h-full">画像なし</p>
					)}
				</div>
				<section className="min-h-54 py-4">
					<h3 className="text-2xl mb-2">{title}</h3>
					<p>
						Githubリンク：<a href={githubLink}>{githubLink}</a>
					</p>
					{productLink !== "" ? (
						<p>
							作品リンク：<a href={productLink}>{productLink}</a>
						</p>
					) : null}
					<p
						className="my-2"
						dangerouslySetInnerHTML={{ __html: longDescription }}
					/>
				</section>
				<div className="text-center">
					<button
						onClick={() => setCurrentWork(undefined)}
						className="py-2 px-12 rounded-md border-2 hover:border-cyan-300"
					>
						閉じる
					</button>
				</div>
			</div>
		</div>
	)
}
