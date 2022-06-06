import Link from "next/link"
import { useRouter } from "next/router"
import { navs } from "../constants/navs"

export const Header: React.FC = () => {
	const router = useRouter()

	return (
		<header className="fixed w-full z-2 md:flex justify-between items-center px-4 py-2 bg-cyan-300 md:h-16 h-26 shadow-lg">
			<h1 className="text-3xl">
				<Link href="/">
					<a>mehm8128</a>
				</Link>
			</h1>
			<nav className="md:text-xl flex md:gap-8 gap-4 mt-2 md:mt-0">
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
		</header>
	)
}
