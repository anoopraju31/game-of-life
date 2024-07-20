'use client'

import { type FC } from 'react'
import useGame from '../_hooks/useGame'
import Board from './board'
import GameControls from './gameControls'

const Game: FC = () => {
	const {
		grid,
		handleCellClick,
		isRunning,
		setIsRunning,
		setRestart,
		setIsManualStateSet,
	} = useGame()

	if (!grid.length) return null

	return (
		<div className='min-h-screen h-full flex flex-col-reverse lg:flex-row justify-end lg:justify-center items-center'>
			<div className='p-6 w-full lg:w-fit flex-shrink-0'>
				<Board grid={grid} handleCellClick={handleCellClick} />
			</div>
			<div className='lg:min-h-screen p-6'>
				<GameControls
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					setRestart={setRestart}
					setIsManualStateSet={setIsManualStateSet}
				/>
			</div>
		</div>
	)
}

export default Game
