import { type FC } from 'react'

type Props = {
	rowIdx: number
	colIdx: number
	cell: boolean
	handleCellClick: (row: number, col: number) => void
}

const BoardCell: FC<Props> = ({ rowIdx, colIdx, cell, handleCellClick }) => {
	return (
		<div
			onClick={() => handleCellClick(rowIdx, colIdx)}
			className={`w-full lg:w-5 aspect-square cursor-pointer border ${
				cell ? 'bg-green-600' : 'bg-red-600'
			}`}></div>
	)
}

export default BoardCell
