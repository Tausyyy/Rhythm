import { Link } from 'react-router-dom'
import { Card, type MainCard } from './MainCard'
export type MainProps = {
	titleMain: string
	desc: string
}

const cards: MainCard[] = [
	{
		step: 'Шаг 1',
		titleCard: 'Анкета',
		descCard: 'Цель, опыт, дни в неделю и место занятий.'
	},
	{
		step: 'Шаг 2',
		titleCard: 'Программа',
		descCard: 'Готовый план с упражнениями и повторами.'
	},
	{
		step: 'Шаг 3',
		titleCard: 'Календарь и дневник',
		descCard: 'Отмечай тренировки и записывай вес.'
	}
]

export function Main({ titleMain, desc }: MainProps) {
	return (
		<main className="mx-auto flex max-w-5xl flex-col gap-10 px-8 pt-20">
			<div className="flex flex-col gap-4">
				<h1 className="text-5xl font-bold">{titleMain}</h1>
				<p className="text-gray-500">{desc}</p>
				<div className="flex items-center gap-4">
					<Link
						to="/PodobratyTrenirovky"
						className="rounded-lg bg-white text-black border border-black px-4 py-2 hover:bg-page hover:text-white duration-400"
					>
						Подобрать тренировку
					</Link>
					<Link
						to="/HowItWorks"
						className="rounded-lg border border-[#555] px-4 py-2 hover:bg-white hover:text-black duration-400"
					>
						Как это работает
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
				{cards.map(card => (
					<Card key={card.step} card={card} />
				))}
			</div>
		</main>
	)
}
