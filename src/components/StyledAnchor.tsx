interface Props {
	href: string
	children: React.ReactNode
}

export default function StyledAnchor({ href, children }: Props) {
	return (
		<a className='text-sky-500 underline hover:text-sky-700' href={href}>
			{children}
		</a>
	)
}
