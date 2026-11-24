export type MainCard = {
	titleCard: string
	descCard: string
	step: string | number
}

type Props = {
	card: MainCard
}

export function Card({ card }: Props) {
	return (
		<div className="rounded-2xl bg-card p-5 mt-7 border border-line">
			<p className="text-muted">{card.step}</p>
			<span>{card.titleCard}</span>
			<p className="text-muted">{card.descCard}</p>
		</div>
	)
}
