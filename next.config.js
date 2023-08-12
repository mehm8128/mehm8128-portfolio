const WindiCSSWebpackPlugin = require('windicss-webpack-plugin') //eslint-disable-line
const { withKumaUI } = require('@kuma-ui/next-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack(config) {
		config.plugins.push(new WindiCSSWebpackPlugin())
		return config
	},
}

module.exports = withKumaUI(nextConfig)
