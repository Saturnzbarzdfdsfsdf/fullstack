import { Link } from 'react-router-dom'

import cn from 'classnames'

import styles from './LinkButton.module.scss'

const LinkButton = ({
	children,
	to,
}: {
	children: React.ReactNode
	to: string
}) => {
	return (
		<Link className={cn({ [styles.button]: true })} to={to}>
			{children}
		</Link>
	)
}

export default LinkButton