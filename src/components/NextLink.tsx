import Link from 'next/link'

interface Props {
	href: string
	children: React.ReactNode
}

export const NextLink: React.FC<Props> = ({ href, children }) => {
	return (
		<Link className='text-sky-500 underline hover:text-sky-700' href={href}>
			{children}
		</Link>
	)
}
