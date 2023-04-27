interface Props {
	href: string
	children: React.ReactNode
}

export const StyledAnchor: React.FC<Props> = ({ href, children }) => {
	return (
		<a className='text-sky-500 underline hover:text-sky-700' href={href}>
			{children}
		</a>
	)
}
