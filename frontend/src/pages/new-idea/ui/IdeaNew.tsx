import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../../shared/api/trpc/index'

import { Input, Segment, Textarea } from '../../../shared/ui/index'

import { zCreateIdeaTrpcInput } from '@full-app/backend/src/router/createIdea/input'

import styles from './IdeaNew.module.scss'

const IdeaNew = () => {

 const createIdea = trpc.createIdea.useMutation()

	const formik = useFormik({
		initialValues: {
			name: '',
			nick: '',
			description: '',
			text: '',
		},
		onSubmit: async values => {
			await createIdea.mutateAsync(values)
		},
		validate: withZodSchema(zCreateIdeaTrpcInput),
	})

	return (
		<Segment title='New Idea'>
			<form
				onSubmit={e => {
					e.preventDefault()
					formik.handleSubmit()
				}}
			>
				<Input name='name' label='Name' formik={formik} />
				<Input name='nick' label='Nick' formik={formik} />
				<Input name='description' label='Description' formik={formik} />

				<Textarea name='text' label='Text' formik={formik} />

				{!formik.isValid && !!formik.submitCount&&(
					<div style={{ color: 'red' }}>Some fileds are invalid</div>
				)}
				<button className={styles.button} type='submit'>Create Idea</button>
			</form>
		</Segment>
	)
}

export default IdeaNew
