interface Props {
	isNested?: boolean
	children: React.ReactNode
}

export default function ListItem({ isNested, children }: Props) {
	return <li className={`leading-8 ${isNested && 'ml-8'}`}>{children}</li>
}
