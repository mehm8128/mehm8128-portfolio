import Link from "next/link"
import { useRouter } from "next/router"
import { navs } from "../constants/navs"

export const Header: React.FC = () => {
	const router = useRouter()

	return (
		<header className="bg-cyan-300 h-26 shadow-lg w-full py-2 px-4 z-2 fixed justify-between items-center md:flex md:h-16">
			<h1 className="text-3xl">
				<Link href="/">
					<a>mehm8128</a>
				</Link>
			</h1>
			<nav className="flex mt-2 gap-4 md:mt-0 md:text-xl md:gap-8">
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
