import Image from 'next/image'

interface Props {
	title: string
	description: string
	imagePath: string
}

export const WorkModal: React.FC<Props> = ({
	title,
	description,
	imagePath,
}) => {
	function handleClick() {
		console.log("close")
	}
	return (
		<div>
			<Image src={imagePath} width="60" height="60" alt="" />
			<h3>{title}</h3>
			<p>{description}</p>
			<button onClick={handleClick}>閉じる</button>
		</div>
	)
}
