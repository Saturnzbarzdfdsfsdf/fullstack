import { FC } from 'react'
import cn from 'classnames'
import { type IInputProps } from '../../types/index'

import styles from './Input.module.scss'

const Input: FC<IInputProps> = props => {
	
	const { name, label, formik, type } = props

	const value = formik.values[name]
	const touched = formik.touched[name]
	const errors = formik.errors[name] as string | undefined
	const invalid = !!touched && !!errors
	const disabled = formik.isSubmitting

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		formik.setFieldValue(name, e.target.value)
	}

	const handleOnBlur = () => {
		formik.setFieldTouched(name)
	}

	return (
		<div
			className={cn({
				[styles.field]: true,
				[styles.disabled]: disabled,
			})}
		>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>

			<input
				className={cn({
					[styles.input]: true,
					[styles.invalid]: invalid,
				})}
				type={type}
				disabled={formik.isSubmitting}
				onChange={handleOnChange}
				onBlur={handleOnBlur}
				value={value}
				name={name}
				id={name}
			/>
			{invalid && <div className={styles.error}>{errors}</div>}
		</div>
	)
}

export default Input
