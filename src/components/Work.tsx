import Image from "next/image"
import { SetStateAction } from "react"
import type { WorkType } from "../constants/works"

interface Props {
	work: WorkType
	setCurrentWork: React.Dispatch<SetStateAction<WorkType | undefined>>
}

export const Work: React.FC<Props> = ({ work, setCurrentWork }) => {
	const { title, imagePath, description } = work

	return (
		<div className="border border-cyan-200 h-80 p-4 w-80">
			{imagePath ? (
				<Image
					src={imagePath}
					width={320}
					height={160}
					alt=""
					className="object-cover"
				/>
			) : (
				<div className="border flex h-37 items-center justify-center">
					画像なし
				</div>
			)}
			<h3 className="text-xl py-2">{title}</h3>
			<p dangerouslySetInnerHTML={{ __html: description }} className="h-16" />
			<button
				className="border-2 h-8 w-full hover:border-cyan-300"
				onClick={() => setCurrentWork(work)}
			>
				詳細を見る
			</button>
		</div>
	)
}
