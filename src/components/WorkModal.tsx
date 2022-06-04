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
			className="fixed bg-gray-300/50 h-full w-full top-0 left-0 z-2"
			onClick={() => setCurrentWork(undefined)}
		>
			<div
				className="w-5/7 h-6/7 bg-white shadow-lg mx-auto my-auto absolute inset-0"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="w-225 h-110 mx-auto py-4">
					{imagePath ? (
						<Image
							src={imagePath}
							width="900px"
							height="440px"
							alt=""
							className="object-cover "
						/>
					) : (
						<p className="flex justify-center items-center h-full">画像なし</p>
					)}
				</div>
				<section className="p-4">
					<h3 className="text-2xl">{title}</h3>
					<p>
						Githubリンク：<a href={githubLink}>{githubLink}</a>
					</p>
					{productLink !== "" ? (
						<p>
							作品リンク：<a href={productLink}>{productLink}</a>
						</p>
					) : null}
					<p
						className="py-2"
						dangerouslySetInnerHTML={{ __html: longDescription }}
					/>
				</section>
				<div className="text-center">
					<button
						onClick={() => setCurrentWork(undefined)}
						className="py-2 px-12 rounded-md bg-cyan-200"
					>
						閉じる
					</button>
				</div>
			</div>
		</div>
	)
}
