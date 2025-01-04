import { FC } from 'react'
import cn from 'classnames'

import { type IInputProps } from '../../types/index'

import styles from './Textarea.module.scss'

const Textarea: FC<IInputProps> = props => {
	const { name, label, formik } = props

	const touched = formik.touched[name]
	const value = formik.values[name]
	const errors = formik.errors[name] as string | undefined
	const invalid = !!touched && !!errors
	const disabled = formik.isSubmitting

	const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		void formik.setFieldValue(name, e.target.value)
	}

	const handleOnBlur = () => {
		void formik.setFieldTouched(name)
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
			<textarea
				className={cn({
					[styles.input]: true,
					[styles.invalid]: invalid,
				})}
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

export default Textarea
