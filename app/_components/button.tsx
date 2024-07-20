'use client'

import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

const Button: FC<Props> = ({ children, ...rest }) => {
	return (
		<button
			{...rest}
			className='w-full px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-opacity-70'>
			{children}
		</button>
	)
}

export default Button
