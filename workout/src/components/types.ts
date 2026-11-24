export type QuizAnswers = {
	goal: 'lose' | 'mass' | 'strength' | 'shape'
	experience: 'never' | 'under6' | 'over6'
	daysPerWeek: 2 | 3 | 4
	place: 'gym' | 'home-dumbbells' | 'home-bodyweight'
}

export type ProgramExercise = {
	exerciseId: number
	name: string
	muscleGroup: string
	sets: number
	repsMin: number
	repsMax: number
}

export type ProgramDay = {
	dayNumber: number
	title: string
	exercises: ProgramExercise[]
}

export type Program = {
	id: number
	name: string
	level: string
	daysPerWeek: number
	place: string
	days: ProgramDay[]
}

export type Recommendation = {
	program: Program
	note: string | null
}
