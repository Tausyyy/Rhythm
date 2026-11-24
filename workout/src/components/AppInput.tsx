import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	error?: string
}

export function AppInput({ label, error, className = '', ...props }: Props) {
	return (
		<div className="flex flex-col gap-2 w-full">
			{label && <label className="text-sm text-zinc-300">{label}</label>}

			<input
				{...props}
				className={`
          w-full rounded-xl px-4 py-3
          bg-white/[0.04]
          backdrop-blur-xl
          border border-white/10
          text-white placeholder:text-zinc-500
          outline-none
          transition-all duration-200
          focus:border-violet-400/50
          focus:bg-violet-500/[0.06]
          focus:shadow-[0_0_20px_rgba(139,92,246,0.10)]
          ${error ? 'border-red-400/50' : ''}
          ${className}
        `}
			/>

			{error && <span className="text-xs text-red-400">{error}</span>}
		</div>
	)
}
