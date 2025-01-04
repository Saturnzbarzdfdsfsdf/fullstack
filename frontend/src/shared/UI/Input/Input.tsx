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
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		void formik.setFieldValue(name, e.target.value)
	}
	

	return (
		<div style={{ marginBottom: 10 }}>
			<label htmlFor={name}>{label}</label>
			<br />
			<input
				type='text'
				onChange={handleChange}
				value={value}
				name={name}
				id={name}
			/>
		</div>
	)
}

export default Input
