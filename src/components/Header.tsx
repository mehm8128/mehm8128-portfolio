import Link from 'next/link'

interface Link {
	href: string
	text: string
}

const Header: React.FC = () => {
	const links: Link[] = [
		{ href: "/", text: "ホーム" },
		{ href: "/background", text: "経歴" },
		{ href: "/works", text: "制作物" },
		{ href: "/links", text: "リンク" },
		{ href: "/contact", text: "お問い合わせ" },
	]
	return (
		<header className="flex justify-between items-center px-4 bg-cyan-300 h-16">
			<h1 className="text-3xl">mehm8128</h1>
			<nav className="text-xl flex gap-8">
				{links.map((link) => (
					<Link href={link.href} key={link.href}>
						<a className="hover:bg-cyan-400 py-2 px-4 rounded-xl">
							{link.text}
						</a>
					</Link>
				))}
			</nav>
		</header>
	)
}

export { Header }
