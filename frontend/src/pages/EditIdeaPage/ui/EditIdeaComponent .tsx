import { FC } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import pick from 'lodash/pick'

import { useMe } from '../../../app/Context/ctx'
import { useForm } from '../../../shared/Hooks/useForm'

import { zUpdateIdeaTrpcInput } from '@full-app/backend/src/router/updateIdea/input'
import { getViewIdeaRoute } from '../../../app/routes/Routes'

import {
	Input,
	Segment,
	Textarea,
	Alert,
	Button,
	FormItems,
} from '../../../shared/ui/index'

import type { TrpcRouterOutput } from '@full-app/backend/src/router'
import type { EditIdeaRouteParams } from '../../../app/routes/Routes'

import { trpc } from '../../../shared/api/trpc/index'

type TIdea = NonNullable<TrpcRouterOutput['getIdea']['idea']>

interface IEditIdeaComponent {

	idea: TIdea
}

const EditIdeaComponent: FC<IEditIdeaComponent> = ({ idea }) => {
	const navigate = useNavigate()

	const updateIdea = trpc.updateIdea.useMutation()

	const { formik, buttonProps, alertProps } = useForm({
		initialValues: pick(idea, ['name', 'nick', 'description', 'text']),

		validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),

		onSubmit: async values => {
			await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
			navigate(getViewIdeaRoute({ ideaNick: values.nick }))
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
					<Input
						label='Description'
						name='description'
						formik={formik}
					/>
					<Textarea label='Text' name='text' formik={formik} />

					<Alert {...alertProps} />
					<Button {...buttonProps}>Update Idea</Button>
				</FormItems>
			</form>
		</Segment>
	)
}

export const EditIdeaPage = () => {
	const { ideaNick } = useParams() as EditIdeaRouteParams

	const getIdeaResult = trpc.getIdea.useQuery({
		ideaNick,
	})

	const me = useMe()

	if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
		return <span>Loading...</span>
	}

	if (getIdeaResult.isError) {
		return <span>Error: {getIdeaResult.error.message}</span>
	}

	if (!getIdeaResult.data.idea) {
		return <span>Idea not found</span>
	}

	const idea = getIdeaResult.data.idea

	if (!me) {
		return <span>Only for authorized</span>
	}

	if (me.id !== idea.authorId) {
		return <span>An idea can only be edited by the author</span>
	}

	return <EditIdeaComponent idea={idea} />
}
