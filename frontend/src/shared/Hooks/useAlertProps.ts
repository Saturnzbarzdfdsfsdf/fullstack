import { useMemo } from 'react'
import { useFormik } from 'formik'

import { type z } from 'zod'
import { type IAlertProps } from '../ui/index'
import { type UseFormParams } from './useForm' // Импортируем типы

const useAlertProps = <TZodSchema extends z.ZodTypeAny>(
	params: UseFormParams<TZodSchema>,
	formik: ReturnType<typeof useFormik>,
	successMessageVisible: boolean,
	submittingError: Error | null
): IAlertProps => {
	const { showValidationAlert, successMessage } = params

	return useMemo(() => {
		if (submittingError) {
			return {
				hidden: false,
				children: submittingError.message,
				color: 'red',
			}
		}
		if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
			return {
				hidden: false,
				children: 'Some fields are invalid',
				color: 'red',
			}
		}
		if (successMessageVisible && successMessage) {
			return {
				hidden: false,
				children: successMessage,
				color: 'green',
			}
		}
		return {
			color: 'red',
			hidden: true,
			children: null,
		}
	}, [
		submittingError,
		formik.isValid,
		formik.submitCount,
		successMessageVisible,
		successMessage,
		showValidationAlert,
	])
}

export default useAlertProps
