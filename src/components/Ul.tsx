interface Props {
	isNested?: boolean
	space?: number
	children: React.ReactNode
}

export const Ul: React.FC<Props> = ({ isNested, children }) => {
	return <ul className={`list-disc space-y-${space} ${isNested && 'ml-8'}`}>{children}</ul>
}
