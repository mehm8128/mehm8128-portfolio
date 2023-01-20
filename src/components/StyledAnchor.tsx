interface Props {
	href: string
	children: React.ReactNode
}

export const StyledAnchor: React.FC<Props> = ({ href, children }) => {
	return (
		<a className='text-cyan-500 underline hover:text-cyan-700' href={href}>
			{children}
		</a>
	)
}
