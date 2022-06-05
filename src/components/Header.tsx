import Link from "next/link"
import { useRouter } from "next/router"
import { navs } from "../constants/navs"

export const Header: React.FC = () => {
	const router = useRouter()

	return (
		<header className="fixed w-full z-2">
			<div className="flex justify-between items-center px-4 bg-cyan-300 h-16 shadow-lg">
				<h1 className="text-3xl">
					<Link href="/">
						<a>mehm8128</a>
					</Link>
				</h1>
				<nav className="text-xl flex gap-8">
					{navs.map((nav) => (
						<Link href={nav.href} key={nav.href}>
							<a
								className={`hover:bg-cyan-400 py-2 px-4 rounded-xl ${
									router.pathname === nav.href ? "bg-cyan-400" : ""
								}`}
							>
								{nav.text}
							</a>
						</Link>
					))}
				</nav>
			</div>
		</header>
	)
}
