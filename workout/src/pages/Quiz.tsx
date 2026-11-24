import { useNavigate } from 'react-router-dom'
import { recommend } from '../components/api'
import type { QuizAnswers } from '../components/types'
import { QuizForm } from '../features/quiz/components/QuizForm'

export default function Quiz() {
	const navigate = useNavigate()

	async function handleComplete(answers: QuizAnswers) {
		const result = await recommend(answers)

		navigate('/result', { state: result })
	}

	return <QuizForm onComplete={handleComplete} />
}
