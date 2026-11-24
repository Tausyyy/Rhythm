import { useState } from 'react'
import type { QuizAnswers } from '../../../components/types'
import { LiquidGlassButton } from '../../../components/viberdy/liquid-glass-button'
import { steps } from '../data/quizSteps'

type Props = {
	onComplete: (answers: QuizAnswers) => void
}

export function QuizForm({ onComplete }: Props) {
	const [step, setStep] = useState(0)
	const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
	const current = steps[step]
	const selected = answers[current.key as keyof QuizAnswers]

	function choose(value: string | number) {
		setAnswers({ ...answers, [current.key]: value })
	}

	async function next() {
		if (step < steps.length - 1) {
			setStep(step + 1)
		} else {
			onComplete(answers as QuizAnswers)
		}
	}
	return (
		<main className="mx-auto max-w-3xl px-6 pt-16">
			<div className="mb-10">
				<p className="text-sm text-muted">
					Шаг {step + 1} из {steps.length}
				</p>
				<div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
					<div
						className="h-full rounded-full bg-white transition-all duration-300"
						style={{
							width: `${((step + 1) / steps.length) * 100}%`
						}}
					/>
				</div>
				<h1 className="mt-5 text-3xl font-bold">{current.title}</h1>
				<p className="text-[20px] text-muted">
					Выбери одну из предложенных кнопок, чего вы хотите достичь
				</p>

				{current.options.map(option => (
					<LiquidGlassButton
						size="lg"
						surface="frost"
						tone="dark"
						tint="#8b5cf6"
						key={option.value}
						onClick={() => choose(option.value)}
						className={`w-full rounded-xl border px-5 py-4 text-left transition-colors duration-200 ${
							selected === option.value
								? 'border-violet-500 bg-violet-500/10 text-white'
								: 'border-[#29272F] bg-[#141419] text-zinc-400 hover:border-violet-500/50 hover:text-white'
						}`}
					>
						{option.label}
					</LiquidGlassButton>
				))}
			</div>
		</main>
	)
}
