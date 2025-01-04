import { type FormikProps } from 'formik'

interface IFormValues {
	name: string
	nick: string
	description: string
	text: string
}

export interface IInputProps {
	name: keyof IFormValues
	label: string
	formik: FormikProps<IFormValues>
}
