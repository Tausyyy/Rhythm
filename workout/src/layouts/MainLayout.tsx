import type { ReactNode } from 'react'
import logo from '../assets/headerLogo.svg'
import { Header, type NavItem } from '../components/header'
type Props = {
	children: ReactNode
}

const navItems: NavItem[] = [
	{ id: 1, headerNav: 'Как это работает', href: '/quiz' },
	{ id: 2, headerNav: 'Упражнения', href: '/quiz' }
]

export default function MainLayout({ children }: Props) {
	return (
		<div className="min-h-screen bg-black text-white">
			<Header logoSrc={logo} navItems={navItems} title="Ритм" />
			{children}
		</div>
	)
}
