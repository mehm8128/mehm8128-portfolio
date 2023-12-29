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
				color="#edf1ff"
				textDecorationLine="underline"
				_hover={{ color: '#8fa6fa' }}
				className={className}
			>
				{children}
			</KumaLink>
		</Link>
	)
}
