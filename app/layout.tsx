import type { Metadata } from 'next'
import type { FC, ReactNode } from 'react'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: "Conway's Game of Life",
	description: 'Generated by create next app',
}

type Props = {
	children: ReactNode
}

const RootLayout: FC<Readonly<Props>> = ({ children }) => {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
export default RootLayout
