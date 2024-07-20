import { type FC } from 'react'
import BoardCell from './boardCell'

type Props = {
	rowIdx: number
	row: boolean[]
	handleCellClick: (row: number, col: number) => void
}

const BoardRow: FC<Props> = ({ rowIdx, row, handleCellClick }) => {
	return (
		<div className='grid grid-rows-[repeat(30,minmax(0,1fr))]'>
			{row.map((cell, colIdx) => (
				<BoardCell
					key={colIdx}
					cell={cell}
					rowIdx={rowIdx}
					colIdx={colIdx}
					handleCellClick={handleCellClick}
				/>
			))}
		</div>
	)
}

export default BoardRow
