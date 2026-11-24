import { Card, type MainCard } from '../../../components/MainCard'

type Props = {
	cards: MainCard[]
}

export function StepsSection({ cards }: Props) {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
			{cards.map(card => (
				<Card key={card.step} card={card} />
			))}
		</div>
	)
}
