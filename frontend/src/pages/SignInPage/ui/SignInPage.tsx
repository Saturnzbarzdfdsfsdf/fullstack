import Cookies from 'js-cookie'

import { useForm } from '../../../shared/Hooks/useForm'

import { zSignInTrpcInput } from '@full-app/backend/src/router/signIn/input'
import { trpc } from '../../../shared/api/trpc/index'

import {
	Input,
	Segment,
	Alert,
	Button,
	FormItems,
} from '../../../shared/ui/index'

import { withPageWrapper } from '../../../shared/components/PageWrapper'

const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {

	const trpcUtils = trpc.useContext()

	const signIn = trpc.signIn.useMutation()

	const { formik, buttonProps, alertProps } = useForm({
		initialValues: {
			nick: '',
			password: '',
		},

		validationSchema: zSignInTrpcInput,

		onSubmit: async values => {
	
				const { token } = await signIn.mutateAsync(values)
				Cookies.set('token', token, { expires: 99999 })

				void trpcUtils.invalidate()
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

					<Alert {...alertProps} />
					<Button {...buttonProps}>Sign In</Button>

				</FormItems>
			</form>
		</Segment>
	)
})

export default SignInPage
