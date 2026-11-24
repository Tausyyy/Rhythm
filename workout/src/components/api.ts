import type { QuizAnswers, Recommendation } from './types'

export async function recommend(answers: QuizAnswers): Promise<Recommendation> {
	const response = await fetch('/api/quiz/recommend', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(answers)
	})

	if (!response.ok) {
		throw new Error(`Ошибка запроса: ${response.status}`)
	}

	return response.json()
}
