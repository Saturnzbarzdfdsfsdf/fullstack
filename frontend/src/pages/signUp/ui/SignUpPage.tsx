import { z } from 'zod'
import Cookies from 'js-cookie'

import { useForm } from '../../../shared/Hooks/useForm'

import { zSignUpTrpcInput } from '@full-app/backend/src/router/auth/signUp/input'
import { trpc } from '../../../shared/api/trpc/index'

import {
	Input,
	Segment,
	Alert,
	Button,
	FormItems,
} from '../../../shared/ui/index'

import { withPageWrapper } from '../../../shared/components/PageWrapper'

const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
	
	const trpcUtils = trpc.useContext()

	const signUp = trpc.signUp.useMutation()

	const { formik, buttonProps, alertProps } = useForm({
		initialValues: {
			nick: '',
			password: '',
			passwordAgain: '',
		},

		validationSchema: zSignUpTrpcInput
			.extend({
				passwordAgain: z.string().min(1),
			})
			
			.superRefine((val, ctx) => {
				if (val.password !== val.passwordAgain) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Passwords must be the same',
						path: ['passwordAgain'],
					})
				}
			}),

		onSubmit: async values => {
			const { token } = await signUp.mutateAsync(values)
			Cookies.set('token', token, { expires: 99999 })
			
			void trpcUtils.invalidate()
		},
	})

	return (
		<Segment title='Sign Up'>
			<form onSubmit={formik.handleSubmit}>
				<FormItems>
					<Input label='Nick' name='nick' formik={formik} />

					<Input
						label='Password'
						name='password'
						type='password'
						formik={formik}
					/>

					<Input
						label='Password again'
						name='passwordAgain'
						type='password'
						formik={formik}
					/>

					<Alert {...alertProps} />
					<Button {...buttonProps}>Sign Up</Button>

				</FormItems>
			</form>
		</Segment>
	)
})

export default SignUpPage
