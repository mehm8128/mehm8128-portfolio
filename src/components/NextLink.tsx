import Link from 'next/link'

interface Props {
	href: string
	children: React.ReactNode
}

export default function NextLink({ href, children }: Props) {
	return (
		<Link className='text-sky-500 underline hover:text-sky-700' href={href}>
			{children}
		</Link>
	)
}
