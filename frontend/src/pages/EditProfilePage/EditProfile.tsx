import { zUpdateProfileTrpcInput } from '@full-app/backend/src/router/auth/updateProfile/input'

import {
	Alert,
	Button,
	FormItems,
	Input,
	Segment,
} from '../../shared/ui/index'

import { useForm } from '../../shared/Hooks/useForm'
import { withPageWrapper } from '../../shared/components/PageWrapper'
import { trpc } from '../../shared/api/trpc/trpcReact'

export const EditProfilePage = withPageWrapper({
	authorizedOnly: true,
	setProps: ({ ctx }) => ({
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		me: ctx.me!,
	}),
})(({ me }) => {
	const trpcUtils = trpc.useContext()
	const updateProfile = trpc.updateProfile.useMutation()
	const { formik, alertProps, buttonProps } = useForm({
		initialValues: {
			nick: me.nick,
			name: me.name,
		},
		validationSchema: zUpdateProfileTrpcInput,
		onSubmit: async values => {
			const updatedMe = await updateProfile.mutateAsync(values)
			trpcUtils.getMe.setData(undefined, { me: updatedMe })
		},
		successMessage: 'Profile updated',
		resetOnSuccess: false,
	})

	return (
		<Segment title='Edit Profile'>
			<form onSubmit={formik.handleSubmit}>
				<FormItems>
					<Input label='Nick' name='nick' formik={formik} />
					<Input label='Name' name='name' formik={formik} />
					<Alert {...alertProps} />
					<Button {...buttonProps}>Update Profile</Button>
				</FormItems>
			</form>
		</Segment>
	)
})
