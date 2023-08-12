'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navs } from '@/consts/navs'

export default function Header() {
	const pathname = usePathname()

	return (
		<header className='z-2 min-h-16 fixed flex w-full flex-wrap items-center justify-between bg-sky-300 px-4 py-2 shadow-lg'>
			<h1 className='text-3xl'>
				<Link href='/'>mehm8128</Link>
			</h1>
			<nav className='mr-4 mt-2 flex gap-4 md:mt-0 md:gap-8 md:text-xl'>
				{navs.map((nav) => (
					<Link
						className={`rounded-xl px-2 py-2 hover:bg-sky-400 md:px-4 ${
							pathname === nav.href ? 'bg-sky-400' : ''
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
