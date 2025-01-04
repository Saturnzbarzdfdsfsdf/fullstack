import { FC } from 'react'

import styles from './FormItems.module.scss'

interface IFormItemsProps {
	children: React.ReactNode
}

const FormItems: FC<IFormItemsProps> = ({ children }) => {
	return <div className={styles.formItems}>{children}</div>
}

export default FormItems
