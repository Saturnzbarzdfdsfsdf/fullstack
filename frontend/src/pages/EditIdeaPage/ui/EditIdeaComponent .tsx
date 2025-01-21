import { useParams } from 'react-router-dom'
import pick from 'lodash/pick'

import { useForm } from '../../../shared/Hooks/useForm'

import { zUpdateIdeaTrpcInput } from '@full-app/backend/src/router/idea/updateIdea/input'

import {
	Input,
	Segment,
	Textarea,
	Alert,
	Button,
	FormItems,
} from '../../../shared/ui/index'

import type { EditIdeaRouteParams } from '../../../app/routes/Routes'

import { trpc } from '../../../shared/api/trpc/index'
import { withPageWrapper } from '../../../shared/components/PageWrapper'

export const EditIdeaPage = withPageWrapper({
	authorizedOnly: true,

	useQuery: () => {
		const { ideaNick } = useParams() as EditIdeaRouteParams
		return trpc.getIdea.useQuery({
			ideaNick,
		})
	},

	checkExists: ({ queryResult }) => !!queryResult.data.idea,
	checkExistsMessage: 'Idea not found',

	checkAccess: ({ queryResult, ctx }) =>
		!!ctx.me && ctx.me.id === queryResult.data.idea?.authorId,
	checkAccessMessage: 'An idea can only be edited by the author',

	setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
		const idea = checkExists(queryResult.data.idea, 'Idea not found')
		checkAccess(
			ctx.me?.id === idea.authorId,
			'An idea can only be edited by the author'
		)
		return {
			idea,
		}
	},
})(({ idea }) => {
	const updateIdea = trpc.updateIdea.useMutation()

	const { formik, buttonProps, alertProps } = useForm({
		initialValues: pick(idea, ['name', 'nick', 'description', 'text']),

		validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),

		onSubmit: async values => {
			await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
		},

		resetOnSuccess: false,
		showValidationAlert: true,
	})

	return (
		<Segment title={`Edit Idea: ${idea.nick}`}>
			<form onSubmit={formik.handleSubmit}>
				<FormItems>
					<Input label='Name' name='name' formik={formik} />
					<Input label='Nick' name='nick' formik={formik} />
					<Input label='Description' name='description' formik={formik} />
					<Textarea label='Text' name='text' formik={formik} />

					<Alert {...alertProps} />
					<Button {...buttonProps}>Update Idea</Button>
				</FormItems>
			</form>
		</Segment>
	)
})
