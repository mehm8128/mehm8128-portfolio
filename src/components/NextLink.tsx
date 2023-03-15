import Link from 'next/link'

interface Props {
	href: string
	children: React.ReactNode
}

export const NextLink: React.FC<Props> = ({ href, children }) => {
	return (
		<Link className='text-cyan-500 underline hover:text-cyan-700' href={href}>
			{children}
		</Link>
	)
}
