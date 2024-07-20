import type { SetStateAction, FC } from 'react'
import Button from '../button'

type Props = {
	isRunning: boolean
	setIsRunning: (value: SetStateAction<boolean>) => void
	setRestart: (value: SetStateAction<boolean>) => void
	setIsManualStateSet: (value: SetStateAction<boolean>) => void
}

const GameControls: FC<Props> = ({
	isRunning,
	setIsRunning,
	setRestart,
	setIsManualStateSet,
}) => {
	return (
		<div>
			<div className='my-10 h-full'>
				<h1 className='text-center tracking-tighter text-3xl xl:text-4xl font-extrabold font-mono'>
					Conway&apos;s Game of Life
				</h1>
			</div>

			<div className='flex gap-4 flex-wrap h-full'>
				<Button onClick={() => setIsRunning(true)} disabled={isRunning}>
					Start
				</Button>
				<Button onClick={() => setIsRunning(false)} disabled={!isRunning}>
					Pause
				</Button>
				<Button onClick={() => setRestart(true)}>Reset</Button>
				<Button onClick={() => setIsManualStateSet(true)}>
					Set State Manually
				</Button>
			</div>

			<div className='mt-10 flex flex-wrap gap-4'>
				<div className='flex items-center gap-2'>
					<div className='w-5 h-5 bg-red-600'></div>
					<p> Dead Cell </p>
				</div>

				<div className='flex items-center gap-2'>
					<div className='w-5 h-5 bg-green-600'></div>
					<p> living Cell </p>
				</div>
			</div>
		</div>
	)
}

export default GameControls
