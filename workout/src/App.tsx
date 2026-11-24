import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'

export default function App() {
	return (
		<MainLayout>
			<Routes>
				<Route path="/Home" element={<Home />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</MainLayout>
	)
}
