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
		<div className="w-80 h-80 p-4 border border-cyan-200">
			{imagePath ? (
				<Image
					src={imagePath}
					width={320}
					height={160}
					alt=""
					className="object-cover"
				/>
			) : (
				<div className="h-37 flex justify-center items-center border">
					画像なし
				</div>
			)}
			<h3 className="text-xl py-2">{title}</h3>
			<p dangerouslySetInnerHTML={{ __html: description }} className="h-16" />
			<button
				className="border-2 w-full h-8 hover:border-cyan-300"
				onClick={() => setCurrentWork(work)}
			>
				詳細を見る
			</button>
		</div>
	)
}
