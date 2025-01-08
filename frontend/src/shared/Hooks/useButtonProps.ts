import { useMemo } from 'react'
import { useFormik } from 'formik'

import { type IButtonProps } from '../ui/index'

const useButtonProps = (
	formik: ReturnType<typeof useFormik>
): Omit<IButtonProps, 'children'> => {
  
	return useMemo(
		() => ({ loading: formik.isSubmitting }),
		[formik.isSubmitting]
	)
}

export default useButtonProps
