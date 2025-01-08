import { FC } from 'react'
import cn from 'classnames'

import styles from './Alert.module.scss'

export interface IAlertProps {
	color: 'red' | 'green'
	children: React.ReactNode
	hidden?: boolean
}

const Alert: FC<IAlertProps> = ({ color, children, hidden }) => {
	
	if (hidden) {
		return null
	}

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
