export const steps = [
	{
		key: 'goal',
		title: 'Какая у тебя цель?',
		options: [
			{ value: 'lose', label: 'Похудеть' },
			{ value: 'mass', label: 'Набрать массу' },
			{ value: 'strength', label: 'Стать сильнее' },
			{ value: 'shape', label: 'Общая форма' }
		]
	},

	{
		key: 'experience',
		title: 'Сколько вы занимались?',
		options: [
			{ value: 'never', label: 'Никогда' },
			{ value: 'under6', label: 'Меньше 6 месяцев' },
			{ value: 'over6', label: 'Больше 6 месяцев' }
		]
	},

	{
		key: 'daysPerWeek',
		title: 'Сколько готовы заниматься в неделю?',
		options: [
			{ value: 2, label: 2 },
			{ value: 3, label: 3 },
			{ value: 4, label: 4 }
		]
	},

	{
		key: 'place',
		title: 'Где вы будете заниматься?',
		options: [
			{ value: 'gym', label: 'Тренажерный зал' },
			{ value: 'home-dumbbells', label: 'Дома с гантелями' },
			{ value: 'home-bodyweight', label: 'Дома без инвентаря' }
		]
	}
]
