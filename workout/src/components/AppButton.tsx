import type { ReactNode } from 'react'
import { LiquidGlassButton } from './viberdy/liquid-glass-button'

type Props = {
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'ghost'
	size?: 'md' | 'lg'
	onClick?: () => void
	disabled?: boolean
}

export function AppButton({
	children,
	variant = 'primary',
	size = 'md',
	onClick,
	disabled = false
}: Props) {
	const variants = {
		primary: {
			surface: 'frost' as const,
			tint: '#8b5cf6',
			icon: true
		},
		secondary: {
			surface: 'clear' as const,
			tint: '#a78bfa',
			icon: false
		},
		ghost: {
			surface: 'clear' as const,
			tint: undefined,
			icon: false
		}
	}

	const currentVariant = variants[variant]

	return (
		<LiquidGlassButton
			size={size}
			onClick={onClick}
			surface={currentVariant.surface}
			tint={currentVariant.tint}
			icon={currentVariant.icon}
			tone="dark"
			className={disabled ? 'opacity-40 pointer-events-none' : ''}
		>
			{children}
		</LiquidGlassButton>
	)
}
