import { type FormikProps } from 'formik'

interface IFormValues {
	name?: string
	nick: string
	description?: string
	text?: string
	passwordAgain: string
	password: string
}

export interface IInputProps {
	name: keyof IFormValues
	type?: 'text' | 'password'
	label: string
	formik: FormikProps<IFormValues>
}
