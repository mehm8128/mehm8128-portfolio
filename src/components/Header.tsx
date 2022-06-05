import Link from "next/link"
import { useRouter } from "next/router"

interface Link {
	href: string
	text: string
}

export const Header: React.FC = () => {
	const router = useRouter()
	const links: Link[] = [
		{ href: "/", text: "ホーム" },
		{ href: "/background", text: "経歴" },
		{ href: "/works", text: "制作物" },
		{ href: "/contact", text: "お問い合わせ" },
	]
	return (
		<header className="fixed w-full">
			<div className="flex justify-between items-center px-4 bg-cyan-300 h-16 shadow-lg">
				<h1 className="text-3xl">
					<Link href="/">
						<a>mehm8128</a>
					</Link>
				</h1>
				<nav className="text-xl flex gap-8">
					{links.map((link) => (
						<Link href={link.href} key={link.href}>
							<a
								className={`hover:bg-cyan-400 py-2 px-4 rounded-xl ${
									router.pathname === link.href ? "bg-cyan-400" : ""
								}`}
							>
								{link.text}
							</a>
						</Link>
					))}
				</nav>
			</div>
		</header>
	)
}
