import { type FC } from 'react'
import BoardRow from './boardRow'
import { Grid } from '@/lib/utills'

type Props = {
	grid: Grid
	handleCellClick: (row: number, col: number) => void
}

const Baord: FC<Props> = ({ grid, handleCellClick }) => {
	return (
		<div className='grid grid-cols-[repeat(30,minmax(0,1fr))] grid-rows-1'>
			{grid.map((row, rowIdx) => (
				<BoardRow
					key={rowIdx}
					rowIdx={rowIdx}
					row={row}
					handleCellClick={handleCellClick}
				/>
			))}
		</div>
	)
}

export default Baord
