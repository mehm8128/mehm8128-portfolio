import {Link as KumaLink} from '@kuma-ui/core'
import Link from 'next/link'

interface Props {
	href: string
	children: React.ReactNode
}

export default function NextLink({ href, children }: Props) {
	return (
		<Link legacyBehavior href={href}>
			<KumaLink
				color='#0ea5e9'
				textDecorationLine='underline'
				_hover={{ color: '#0369a1' }}
			>
				{children}
			</KumaLink>
		</Link>
	)
}
