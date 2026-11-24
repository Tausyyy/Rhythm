'use client'

import type { CSSProperties, ReactNode, PointerEvent as ReactPointerEvent } from 'react'
import { useEffect, useId, useRef } from 'react'

type Tone = 'dark' | 'light'
type Surface = 'clear' | 'frost'
type Size = 'md' | 'lg'

function safeHref(href: string): string {
	const v = href.replace(/[\t\n\r]/g, '').trim()

	if (v.indexOf(String.fromCharCode(92)) !== -1) return '#'
	if (/^(https?:|mailto:|tel:)/i.test(v)) return v
	if (/^[\/#?]/.test(v) && !/^\/\//.test(v)) return v

	return '#'
}

function rgbOf(hex?: string): string | null {
	const m = /^#([0-9a-f]{6})$/i.exec(hex || '')
	if (!m) return null

	const n = parseInt(m[1], 16)

	return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255)
}

function lensMap(w: number, h: number, r: number, bezel: number): string {
	const c = document.createElement('canvas')

	c.width = w
	c.height = h

	const ctx = c.getContext('2d')
	if (!ctx) return ''

	const img = ctx.createImageData(w, h)
	const hw = w / 2
	const hh = h / 2

	const sd = (x: number, y: number) => {
		const qx = Math.abs(x) - (hw - r)
		const qy = Math.abs(y) - (hh - r)

		return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r
	}

	for (let j = 0; j < h; j++) {
		for (let i = 0; i < w; i++) {
			const x = i + 0.5 - hw
			const y = j + 0.5 - hh
			const d = sd(x, y)

			let dx = 0
			let dy = 0

			const t = -d

			if (t > 0 && t < bezel) {
				const nx = sd(x + 0.5, y) - sd(x - 0.5, y)
				const ny = sd(x, y + 0.5) - sd(x, y - 0.5)

				const len = Math.hypot(nx, ny) || 1
				const m = Math.pow(1 - t / bezel, 2)

				dx = (-nx / len) * m
				dy = (-ny / len) * m
			}

			const k = (j * w + i) * 4

			img.data[k] = Math.round(128 + 127 * dx)
			img.data[k + 1] = Math.round(128 + 127 * dy)
			img.data[k + 2] = 128
			img.data[k + 3] = 255
		}
	}

	ctx.putImageData(img, 0, 0)

	return c.toDataURL()
}

export function LiquidGlassButton({
	children,
	href,
	onClick,
	tone = 'dark',
	surface = 'clear',
	size = 'md',
	tint,
	refraction = 1,
	icon = true,
	className = ''
}: {
	children: ReactNode
	href?: string
	onClick?: () => void
	tone?: Tone
	surface?: Surface
	size?: Size
	tint?: string
	refraction?: number
	icon?: boolean
	className?: string
}) {
	const rootRef = useRef<HTMLElement | null>(null)

	const filterId = 'lg' + useId().replace(/[^a-zA-Z0-9]/g, '')

	const mapRef = useRef<SVGFEImageElement>(null)
	const dispRef = useRef<SVGFEDisplacementMapElement>(null)

	const blur = surface === 'frost' ? 14 : 3

	const base =
		'blur(' + blur + 'px) saturate(190%) brightness(' + (tone === 'dark' ? 1.12 : 1.04) + ')'

	const rgb = rgbOf(tint)

	const fill =
		tone === 'dark'
			? rgb
				? `rgba(${rgb}, 0.10)`
				: 'rgba(18, 15, 29, 0.18)'
			: rgb
				? `rgba(${rgb}, 0.12)`
				: 'rgba(255, 255, 255, 0.22)'

	useEffect(() => {
		const el = rootRef.current
		if (!el) return

		const ua = (
			navigator as Navigator & {
				userAgentData?: {
					brands?: { brand: string }[]
				}
			}
		).userAgentData

		const chromium = !!ua && !!ua.brands && ua.brands.some(b => /Chromium/.test(b.brand))

		if (!chromium || refraction <= 0) {
			el.style.backdropFilter = base
			return
		}

		const apply = () => {
			const w = Math.round(el.offsetWidth)
			const h = Math.round(el.offsetHeight)

			if (!w || !h || !mapRef.current || !dispRef.current) return

			const url = lensMap(w, h, h / 2, Math.min(h * 0.24, 12))

			mapRef.current.setAttribute('href', url)
			mapRef.current.setAttribute('width', String(w))
			mapRef.current.setAttribute('height', String(h))

			dispRef.current.setAttribute('scale', String(Math.round(28 * refraction)))

			el.style.backdropFilter = `url(#${filterId}) ${base}`
		}

		apply()

		const ro = new ResizeObserver(apply)
		ro.observe(el)

		return () => ro.disconnect()
	}, [filterId, base, refraction])

	function onPointerMove(e: ReactPointerEvent<HTMLElement>) {
		const el = e.currentTarget
		const r = el.getBoundingClientRect()

		el.style.setProperty('--lgx', ((e.clientX - r.left) / r.width) * 100 + '%')

		el.style.setProperty('--lgy', ((e.clientY - r.top) / r.height) * 100 + '%')

		el.style.setProperty('--lgo', '1')
	}

	function onPointerLeave(e: ReactPointerEvent<HTMLElement>) {
		e.currentTarget.style.setProperty('--lgo', '0')
	}

	const ink = tone === 'dark' ? '#ffffff' : '#111111'

	const style = {
		background: fill,
		backdropFilter: base,
		WebkitBackdropFilter: base,
		color: ink,

		boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.65),
      inset 0 -1px 1px rgba(255,255,255,0.16),
      inset 1px 0 1px rgba(255,255,255,0.12),
      0 8px 24px rgba(0,0,0,0.28),
      0 0 35px rgba(139,92,246,0.13)
    `,

		'--lgx': '30%',
		'--lgy': '0%',
		'--lgo': '0'
	} as CSSProperties

	const inner = (
		<>
			{/* Pointer-lit rim */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-full"
				style={{
					padding: 1,
					background:
						'radial-gradient(120px circle at var(--lgx) var(--lgy), rgba(255,255,255,calc(0.25 + var(--lgo) * 0.6)), rgba(255,255,255,0.14) 70%)',
					WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
					WebkitMaskComposite: 'xor',
					mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)'
				}}
			/>

			{/* Upper glass reflection */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-full"
				style={{
					background:
						'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.04) 25%, transparent 55%)'
				}}
			/>

			{/* Violet light inside the glass */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-full"
				style={{
					background: 'radial-gradient(ellipse at 50% 120%, rgba(139,92,246,0.24), transparent 68%)'
				}}
			/>

			{/* Inner glass contour */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-[1px] rounded-full"
				style={{
					border: '1px solid rgba(255,255,255,0.12)',
					boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.16)'
				}}
			/>

			{/* Specular highlight */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
				style={{
					opacity: 'calc(0.35 + var(--lgo) * 0.65)',
					background:
						'radial-gradient(80% 140% at var(--lgx) var(--lgy), rgba(255,255,255,0.28), rgba(255,255,255,0) 60%)',
					mixBlendMode: 'screen'
				}}
			/>

			{/* Press glow */}
			<span
				aria-hidden
				className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full opacity-0 transition-all duration-200 ease-out group-active:scale-[7] group-active:opacity-100"
				style={{
					left: 'var(--lgx)',
					top: 'var(--lgy)',
					background: 'radial-gradient(closest-side, rgba(255,255,255,0.4), rgba(255,255,255,0))'
				}}
			/>

			{/* Button content */}
			<span
				className="relative z-10 flex items-center gap-2 font-semibold tracking-[-0.01em]"
				style={{
					textShadow: tone === 'dark' ? '0 1px 12px rgba(0,0,0,0.4)' : 'none'
				}}
			>
				{children}

				{icon && (
					<span
						aria-hidden
						className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					>
						↗
					</span>
				)}
			</span>

			{/* SVG refraction filter */}
			<svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
				<filter
					id={filterId}
					x="0"
					y="0"
					width="100%"
					height="100%"
					colorInterpolationFilters="sRGB"
				>
					<feImage ref={mapRef} x="0" y="0" preserveAspectRatio="none" result="map" />

					<feDisplacementMap
						ref={dispRef}
						in="SourceGraphic"
						in2="map"
						scale="28"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</svg>
		</>
	)

	const cls =
		'group relative isolate inline-flex select-none items-center justify-center overflow-hidden rounded-full ' +
		(size === 'lg' ? 'h-14 px-7 text-[17px] ' : 'h-11 px-5 text-[15px] ') +
		'transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] active:scale-x-[0.98] active:scale-y-[0.97] active:duration-100 ' +
		'outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ' +
		className

	if (href) {
		return (
			<a
				ref={n => {
					rootRef.current = n
				}}
				href={safeHref(href)}
				onClick={onClick}
				onPointerMove={onPointerMove}
				onPointerDown={onPointerMove}
				onPointerLeave={onPointerLeave}
				className={cls}
				style={style}
			>
				{inner}
			</a>
		)
	}

	return (
		<button
			ref={n => {
				rootRef.current = n
			}}
			type="button"
			onClick={onClick}
			onPointerMove={onPointerMove}
			onPointerDown={onPointerMove}
			onPointerLeave={onPointerLeave}
			className={cls}
			style={style}
		>
			{inner}
		</button>
	)
}
