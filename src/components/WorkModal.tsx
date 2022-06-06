import Image from "next/image"
import { SetStateAction } from "react"
import type { WorkType } from "../constants/works"

interface Props {
	work: WorkType
	setCurrentWork: React.Dispatch<SetStateAction<WorkType | undefined>>
}

export const WorkModal: React.FC<Props> = ({ work, setCurrentWork }) => {
	const { title, imagePath, longDescription, githubLinks, productLink } = work

	return (
		<div
			className="h-full bg-gray-300/50 w-full top-0 left-0 z-3 fixed"
			onClick={() => setCurrentWork(undefined)}
		>
			<div
				className="bg-white my-auto mx-auto h-6/7 shadow-lg p-4 inset-0 w-6/7 absolute overflow-y-scroll md:w-5/7"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="h-2/5 text-center md:h-3/5">
					{imagePath ? (
						<Image
							alt=""
							className="object-cover "
							height={400}
							src={imagePath}
							width={860}
						/>
					) : (
						<p className="flex h-full justify-center items-center">画像なし</p>
					)}
				</div>
				<section className="min-h-54 py-4">
					<h3 className="mb-2 text-2xl">{title}</h3>

					{githubLinks.map((githubLink, index) => (
						<p key={githubLink}>
							Githubリンク{githubLinks.length > 1 ? index + 1 : null}：
							<a
								className="text-cyan-500 hover:text-cyan-600"
								href={githubLink}
							>
								{githubLink}
							</a>
						</p>
					))}

					{productLink !== "" ? (
						<p>
							作品リンク：
							<a
								className="text-cyan-500 hover:text-cyan-600"
								href={productLink}
							>
								{productLink}
							</a>
						</p>
					) : null}
					<p className="my-2">{longDescription}</p>
				</section>
				<div className="text-center">
					<button
						className="rounded-md border-2 py-2 px-12 hover:border-cyan-300"
						onClick={() => setCurrentWork(undefined)}
					>
						閉じる
					</button>
				</div>
			</div>
		</div>
	)
}
