import { Link } from 'react-router-dom'
export interface NavItem {
	id: number | string
	headerNav: string
	href: string
}

export type HeaderProps = {
	title?: string
	logoSrc: string
	navItems: NavItem[]
}

export function Header({ title, logoSrc, navItems }: HeaderProps) {
	return (
		<header className="flex items-center justify-between px-8 py-4 border-b border-[#2a2a2a]">
			<a href="/" className="flex items-center gap-3">
				<img className="w-10 h-10 rounded-2xl" src={logoSrc} alt={title || 'logo'} />
				{title && <span>{title}</span>}
			</a>

			<nav aria-label="Main Navigation" className="flex items-center gap-6">
				<ul className="flex items-center gap-6">
					{navItems.map(item => (
						<li key={item.id}>
							<Link to={item.href} className="text-[#A3A3A3] hover:text-white duration-300">
								{item.headerNav}
							</Link>
						</li>
					))}
				</ul>
				<Link
					to="/login"
					className="rounded-lg border border-[#555] px-4 py-2 hover:bg-white hover:text-black duration-400"
				>
					Войти
				</Link>
			</nav>
		</header>
	)
}
