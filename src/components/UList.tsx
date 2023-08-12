interface Props {
	isNested?: boolean
	space?: number
	children: React.ReactNode
}

export default function UList({ isNested, space, children }: Props) {
	return (
		<ul className={`list-disc space-y-${space} ${isNested && 'ml-8'}`}>
			{children}
		</ul>
	)
}
