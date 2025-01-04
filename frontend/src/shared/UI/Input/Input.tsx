import { FC } from 'react'
import { type FormikProps } from 'formik'

interface IInputProps {
	name: string
	label: string
	formik: FormikProps<any>
}

const Input: FC<IInputProps> = props => {

	const { name, label, formik } = props

	const value = formik.values[name]
	const touched = formik.touched[name] 
	const errors = formik.errors[name] as string | undefined
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		void formik.setFieldValue(name, e.target.value)
	}
	
	const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
		void formik.setFieldTouched(name)
	}
	

	return (
		<div style={{ marginBottom: 10 }}>
			<label htmlFor={name}>{label}</label>
			<br />
			<input
				type='text'
				onChange={handleChange}
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
