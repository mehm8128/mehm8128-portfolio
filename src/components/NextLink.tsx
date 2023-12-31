import { Link as KumaLink } from '@kuma-ui/core'
import Link from 'next/link'

export default function NextLink({
	href,
	children,
	className
}: {
	href: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<Link legacyBehavior href={href}>
			<KumaLink
				color="#0ea5e9"
				textDecorationLine="underline"
				_hover={{ color: '#b4c2f6' }}
				className={className}
			>
				{children}
			</KumaLink>
		</Link>
	)
}
