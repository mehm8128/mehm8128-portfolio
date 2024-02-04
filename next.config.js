const { withKumaUI } = require('@kuma-ui/next-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export'
}

module.exports = withKumaUI(nextConfig)
