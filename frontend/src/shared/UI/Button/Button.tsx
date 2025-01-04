import { FC } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

interface IButtonProps {
	children: React.ReactNode
	loading?: boolean
}

const Button: FC<IButtonProps> = ({ children, loading = false }) => {
	return (
		<button
			type='submit'
			disabled={loading}
			className={cn({
				[styles.button]: true,
				[styles.disabled]: loading,
			})}
		>
			{loading ? 'Submitting...' : children}
		</button>
	)
}

export default Button
