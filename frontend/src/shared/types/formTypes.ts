import { type FormikProps } from 'formik'

export interface IFormValues {
	name: string
	nick: string
	description: string
	text: string
	password?: string
	passwordAgain?: string
}

export interface IInputProps {
	name: keyof IFormValues
	type?: 'text' | 'password'
	label: string
	formik: FormikProps<IFormValues>
}
