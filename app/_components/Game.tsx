'use client'

import { useCallback, useEffect, useState, type FC } from 'react'
import Board from './board'
import {
	COLS,
	generateEmptyGrid,
	generateInitialGrid,
	type Grid,
	ROWS,
} from '@/lib/utills'
import GameControls from './gameControls'

const Game: FC = () => {
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [restart, setRestart] = useState<boolean>(false)
	const [isManualStateSet, setIsManualStateSet] = useState<boolean>(false)
	const [grid, setGrid] = useState<Grid>([])

	useEffect(() => {
		setGrid(generateInitialGrid(ROWS, COLS))
	}, [])

	const generateNextGeneration = (grid: boolean[][]) => {
		const newGeneration = generateEmptyGrid()

		for (let i = 0; i < ROWS; i++)
			for (let j = 0; j < COLS; j++) {
				let aliveNeighbours = 0

				for (let ni = -1; ni < 2; ni++)
					for (let nj = -1; nj < 2; nj++)
						if (
							i + ni >= 0 &&
							i + ni < ROWS &&
							j + nj >= 0 &&
							j + nj < COLS &&
							grid[i + ni][j + nj]
						)
							aliveNeighbours++

				if (grid[i][j]) aliveNeighbours--

				if (grid[i][j] && aliveNeighbours < 2) newGeneration[i][j] = false
				else if (grid[i][j] && aliveNeighbours > 3) newGeneration[i][j] = false
				else if (!grid[i][j] && aliveNeighbours === 3)
					newGeneration[i][j] = true
				else newGeneration[i][j] = grid[i][j]
			}
		return newGeneration
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isRunning) return

			setGrid((prev) => generateNextGeneration(prev))
		}, 100)

		return () => clearInterval(interval)
	}, [isRunning])

	useEffect(() => {
		if (!restart) return

		setGrid(generateInitialGrid(ROWS, COLS))
		setRestart(false)
		setIsRunning(false)
	}, [restart])

	useEffect(() => {
		if (!isManualStateSet) return

		setGrid(generateEmptyGrid())
		setIsRunning(false)
		setRestart(false)
		setIsManualStateSet(false)
	}, [isManualStateSet])

	const handleCellClick = useCallback((row: number, col: number) => {
		setGrid((prev) => {
			const newGrid = prev.slice(0)
			newGrid[row] = newGrid[row].slice(0)
			newGrid[row][col] = !newGrid[row][col]

			return newGrid
		})
	}, [])

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
