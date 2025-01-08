import { useState, useEffect } from 'react'
import { type FormikHelpers, useFormik } from 'formik'
import { type z } from 'zod'

import { useFormikConfig, useAlertProps, useButtonProps } from './index'

import { type IAlertProps, type IButtonProps } from '../ui/index'

export type UseFormParams<TZodSchema extends z.ZodTypeAny> = {

	initialValues?: z.infer<TZodSchema>
	validationSchema?: TZodSchema

	successMessage?: string | false
	resetOnSuccess?: boolean
	showValidationAlert?: boolean

	onSubmit: (
		values: z.infer<TZodSchema>,
		actions: FormikHelpers<z.infer<TZodSchema>>

	) => Promise<void> | void
}

export interface IUseFormReturn<TZodSchema extends z.ZodTypeAny> {
	formik: ReturnType<typeof useFormik<z.infer<TZodSchema>>>

	alertProps: IAlertProps
	buttonProps: Omit<IButtonProps, 'children'>
}

export const useForm = <TZodSchema extends z.ZodTypeAny>(
	params: UseFormParams<TZodSchema>
): IUseFormReturn<TZodSchema> => {
	
	const [successMessageVisible, setSuccessMessageVisible] = useState(false)
	const [submittingError, setSubmittingError] = useState<Error | null>(null)

	const formik = useFormikConfig(
		params,
		setSuccessMessageVisible,
		setSubmittingError
	)

	const alertProps = useAlertProps(
		params,
		formik,
		successMessageVisible,
		submittingError
	)

	const buttonProps = useButtonProps(formik)

	useEffect(() => {
		if (successMessageVisible) {
			const timer = setTimeout(() => setSuccessMessageVisible(false), 3000)
			return () => clearTimeout(timer)
		}
	}, [successMessageVisible])

	return { formik, alertProps, buttonProps }
}
