'use client'

import { useCallback, useEffect, useState } from 'react'

export type Grid = boolean[][]

const COLS = 30
const ROWS = 30

const generateInitialGrid = (rows: number = 10, cols: number = 10) => {
	const grid: Grid = new Array(rows)

	for (let i = 0; i < rows; i++) {
		const arr = new Array(cols)

		for (let j = 0; j < cols; j++)
			arr[j] = Math.floor(Math.random() * 10) % 2 == 1

		grid[i] = arr
	}

	return grid
}

const generateEmptyGrid = () => {
	const grid: Grid = new Array(ROWS)

	for (let i = 0; i < ROWS; i++) grid[i] = new Array(COLS).fill(0)

	return grid
}

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
			else if (!grid[i][j] && aliveNeighbours === 3) newGeneration[i][j] = true
			else newGeneration[i][j] = grid[i][j]
		}
	return newGeneration
}

const useGame = () => {
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [restart, setRestart] = useState<boolean>(false)
	const [isManualStateSet, setIsManualStateSet] = useState<boolean>(false)
	const [grid, setGrid] = useState<Grid>([])

	useEffect(() => {
		setGrid(generateInitialGrid(ROWS, COLS))
	}, [])

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

	return {
		grid,
		handleCellClick,
		isRunning,
		setIsRunning,
		setRestart,
		setIsManualStateSet,
	}
}

export default useGame
