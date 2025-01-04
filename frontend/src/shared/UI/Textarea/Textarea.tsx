import { FC } from 'react'

import { type IInputProps } from '../types/index'

import styles from './Textarea.module.scss'

const Textarea: FC<IInputProps> = props => {
	const { name, label, formik } = props

	const touched = formik.touched[name]
	const value = formik.values[name]
	const errors = formik.errors[name] as string | undefined

	const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		void formik.setFieldValue(name, e.target.value)
	}

	const handleOnBlur = () => {
		void formik.setFieldTouched(name)
	}

	return (
		<div className={styles.input__wrapper}>
			<label htmlFor={name}>{label}</label>
			<br />
			<textarea
				disabled={formik.isSubmitting}
				className={styles.input}
				onChange={handleOnChange}
				onBlur={handleOnBlur}
				value={value}
				name={name}
				id={name}
			/>
			{!!touched && !!errors && <div style={{ color: 'red' }}>{errors}</div>}
		</div>
	)
}

export default Textarea
