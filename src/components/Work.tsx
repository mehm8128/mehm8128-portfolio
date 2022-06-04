import Image from "next/image"

interface Props {
	title: string
	description: string
	imagePath: string
}

export const Work: React.FC<Props> = ({ title, description, imagePath }) => {
	return (
		<div className="w-80 h-80 p-4 border">
			{imagePath ? (
				<Image
					src={imagePath}
					width="320px"
					height="160px"
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
			<button className="border w-full h-8">詳細を見る</button>
		</div>
	)
}
