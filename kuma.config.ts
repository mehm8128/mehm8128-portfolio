import { createTheme } from '@kuma-ui/core'

const theme = createTheme({
	colors: {
		primary: '#7dd3fc',
		secondary: '#af5718',
	},
})

type UserTheme = typeof theme

declare module '@kuma-ui/core' {
	export type Theme = UserTheme
}

export default theme
