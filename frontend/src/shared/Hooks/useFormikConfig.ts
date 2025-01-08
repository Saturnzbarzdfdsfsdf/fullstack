import { type FormikHelpers, useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { type z } from 'zod'

type UseFormParams<TZodSchema extends z.ZodTypeAny> = {
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

const useFormikConfig = <TZodSchema extends z.ZodTypeAny>(
	params: UseFormParams<TZodSchema>,

	setSuccessMessageVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setSubmittingError: React.Dispatch<React.SetStateAction<Error | null>>
) => {

	const { initialValues, validationSchema, onSubmit, resetOnSuccess } = params
	
	return useFormik<z.infer<TZodSchema>>({

		initialValues: initialValues,
		...(validationSchema && { validate: withZodSchema(validationSchema) }),

		onSubmit: async (values, formikHelpers) => {
			try {

				setSubmittingError(null)

				await onSubmit(values, formikHelpers)

				if (resetOnSuccess) {
					formikHelpers.resetForm()
				}

				setSuccessMessageVisible(true)
				
			} catch (error) {
				setSubmittingError(
					error instanceof Error ? error : new Error('Unknown error occurred')
				)
			}
		},
	})
}

export default useFormikConfig
