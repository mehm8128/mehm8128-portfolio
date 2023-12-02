import { Link } from '@kuma-ui/core'

export default function StyledAnchor({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) {
	return (
		<Link
			color="#0ea5e9"
			textDecorationLine="underline"
			_hover={{ color: '#0369a1' }}
			target="_blank"
			href={href}
		>
			{children}
		</Link>
	)
}
