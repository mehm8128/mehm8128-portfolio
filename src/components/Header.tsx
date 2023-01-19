import Link from 'next/link'
import { useRouter } from 'next/router'
import { navs } from '../consts/navs'

export const Header: React.FC = () => {
	const router = useRouter()

	return (
		<header className='h-26 z-2 fixed w-full items-center justify-between bg-cyan-300 py-2 px-4 shadow-lg md:flex md:h-16'>
			<h1 className='text-3xl'>
				<Link href='/'>mehm8128</Link>
			</h1>
			<nav className='mt-2 mr-4 flex gap-4 md:mt-0 md:gap-8 md:text-xl'>
				{navs.map((nav) => (
					<Link
						className={`rounded-xl py-2 px-2 hover:bg-cyan-400 md:px-4 ${
							router.pathname === nav.href ? 'bg-cyan-400' : ''
						}`}
						href={nav.href}
						key={nav.href}
					>
						{nav.text}
					</Link>
				))}
			</nav>
		</header>
	)
}
