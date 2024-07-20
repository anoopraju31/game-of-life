import { type FC } from 'react'
import Game from './_components/Game'

const HomePage: FC = () => {
	return (
		<main className='min-h-screen bg-black text-white'>
			<Game />
		</main>
	)
}

export default HomePage
