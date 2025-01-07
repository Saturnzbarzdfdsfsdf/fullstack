import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'
import { z } from 'zod'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'

import { zSignUpTrpcInput } from '@full-app/backend/src/router/signUp/input'
import { trpc } from '../../../shared/api/trpc/index'

import {
	Input,
	Segment,
	Alert,
	Button,
	FormItems,
} from '../../../shared/ui/index'

import { getAllIdeasRoute } from '../../../app/routes/Routes'

const SignInPage = () => {
	const navigate = useNavigate()
	const trpcUtils = trpc.useContext()

	const [submittingError, setSubmittingError] = useState<string | null>(null)

	const signIn = trpc.signIn.useMutation()

	const formik = useFormik({
		initialValues: {
			nick: '',
			password: '',
		},
		validate: withZodSchema(zSignUpTrpcInput),
		
		onSubmit: async values => {
			try {
				setSubmittingError(null)

				const { token } = await signIn.mutateAsync(values)
				Cookies.set('token', token, { expires: 99999 })
				
				void trpcUtils.invalidate()
				navigate(getAllIdeasRoute())

			} catch (err: any) {
				setSubmittingError(err.message)
			}
		},
	})

	return (
		<Segment title='Sign In'>
			<form onSubmit={formik.handleSubmit}>
				<FormItems>
					<Input label='Nick' name='nick' formik={formik} />

					<Input
						label='Password'
						name='password'
						type='password'
						formik={formik}
					/>

					{!formik.isValid && !!formik.submitCount && (
						<Alert color='red'>Some fields are invalid</Alert>
					)}
					{submittingError && <Alert color='red'>{submittingError}</Alert>}

					<Button loading={formik.isSubmitting}>Sign In</Button>
				</FormItems>
			</form>
		</Segment>
	)
}

export default SignInPage
