import { FC } from 'react'
import { type FormikProps } from 'formik'

import styles from './Textarea.module.scss'

interface IInputProps {
	name: string
	label: string
	formik: FormikProps<any>
}

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
