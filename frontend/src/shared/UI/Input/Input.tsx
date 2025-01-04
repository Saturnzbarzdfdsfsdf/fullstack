import { FC } from 'react'
import { type FormikProps } from 'formik'

interface IInputProps {
	name: string
	label: string
	formik: FormikProps<any>
}

import styles from './Input.module.scss'

const Input: FC<IInputProps> = props => {
	const { name, label, formik } = props

	const value = formik.values[name]
	const touched = formik.touched[name]
	const errors = formik.errors[name] as string | undefined

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		void formik.setFieldValue(name, e.target.value)
	}

	const handleOnBlur = () => {
		void formik.setFieldTouched(name)
	}

	return (
		<div className={styles.input__wrapper}>
			<label htmlFor={name}>{label}</label>
			<br />
			<input
				className={styles.input}
				type='text'
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

export default Input
