import { Box, Heading } from '@kuma-ui/core'

import Contribution from './_component/Contribution'
import Event from './_component/Event'
import Internship from './_component/Internship'
import Trap from './_component/Trap'

export default function Background() {
	return (
		<>
			<Heading
				justifyContent="center"
				py={32}
				as="h2"
				display="flex"
				alignItems="center"
				fontSize=" 1.875rem"
			>
				経歴
			</Heading>
			<Box mx="auto" width={['80%', '50%']} lineHeight={2}>
				<Trap />
				<Event />
				<Internship />
				<Contribution />
			</Box>
		</>
	)
}
