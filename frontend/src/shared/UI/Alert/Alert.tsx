import { FC } from 'react'
import cn from 'classnames'

import styles from './Alert.module.scss'

interface IAlertProps {
	color: 'red' | 'green'
	children: React.ReactNode
}

const Alert: FC<IAlertProps> = ({ color, children }) => {
	return (
		<div
			className={cn({
				[styles.alert]: true,
				[styles[color]]: true,
			})}
		>
			{children}
		</div>
	)
}

export default Alert
