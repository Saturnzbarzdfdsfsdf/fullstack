import { trpc } from '../../../shared/api/trpc/index'
import { withPageWrapper } from '../../../shared/components/PageWrapper'

import { useForm } from '../../../shared/Hooks/useForm'

import { Input, Segment, Textarea, Alert, Button, FormItems } from '../../../shared/ui/index'

import { zCreateIdeaTrpcInput } from '@full-app/backend/src/router/idea/createIdea/input'

const IdeaNew =  withPageWrapper({
  authorizedOnly: true,
})(() => {
	const createIdea = trpc.createIdea.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
		initialValues: {
			name: '',
			nick: '',
			description: '',
			text: '',
		},
		validationSchema: zCreateIdeaTrpcInput,

		onSubmit: async values => {
			 await createIdea.mutateAsync(values)
      formik.resetForm()

	},
    successMessage: 'Idea created!',
    showValidationAlert: true,
})

	return (
		<Segment title='New Idea'>
			<form onSubmit={formik.handleSubmit}>
				<FormItems>
					<Input name='name' label='Name' formik={formik} />
					<Input name='nick' label='Nick' formik={formik} />
					<Input name='description' label='Description' formik={formik} />

					<Textarea name='text' label='Text' formik={formik} />

					<Alert {...alertProps} />
					<Button {...buttonProps}>Create Idea</Button>

				</FormItems>
			</form>
		</Segment>
	)
})

export default IdeaNew
