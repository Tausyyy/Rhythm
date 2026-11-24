import { useNavigate } from 'react-router-dom'
import { AppButton } from '../components/AppButton'
import { type MainCard } from '../components/MainCard'
import { StepsSection } from '../features/home/components/StepsSection'

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

export default function Home() {
	const navigate = useNavigate()

	return (
		<main className="mx-auto flex max-w-5xl flex-col gap-10 px-8 pt-20">
			<div className="flex flex-col gap-4">
				<h1 className="font-display text-5xl font-bold">Не знаешь, с чего начать в зале?</h1>

				<p className="text-lg text-muted">
					Ответь на 4 вопроса, и мы покажем программу под тебя. Без регистрации.
				</p>

				<div className="flex items-center gap-4">
					<AppButton variant="primary" size="lg" onClick={() => navigate('/quiz')}>
						Подобрать тренировку
					</AppButton>
				</div>
			</div>

			<StepsSection cards={cards} />
		</main>
	)
}
