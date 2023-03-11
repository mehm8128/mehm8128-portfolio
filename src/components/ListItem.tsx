interface Props {
	isNested?: boolean
	children: React.ReactNode
}

export const ListItem: React.FC<Props> = ({ isNested, children }) => {
	return <li className={`leading-8 ${isNested && 'ml-8'}`}>{children}</li>
}
