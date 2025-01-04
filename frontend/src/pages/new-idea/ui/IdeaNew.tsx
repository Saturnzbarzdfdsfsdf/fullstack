import { useState } from 'react'

import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../../shared/api/trpc/index'

import { Input, Segment, Textarea } from '../../../shared/ui/index'

import { zCreateIdeaTrpcInput } from '@full-app/backend/src/router/createIdea/input'

import styles from './IdeaNew.module.scss'

const IdeaNew = () => {
	const [successMessage, setSuccessMessage] = useState(false)
	const [submittingError, setSubmittingError] = useState<string | null>(null)

	const createIdea = trpc.createIdea.useMutation()

	const formik = useFormik({
		initialValues: {
			name: '',
			nick: '',
			description: '',
			text: '',
		},

		onSubmit: async values => {
			try {
				await createIdea.mutateAsync(values)

				console.log('Before reset:', formik.values)
				formik.resetForm({
					values: formik.initialValues,
					errors: {},
					touched: {},
				})
				console.log('After reset:', formik.values)

				setSuccessMessage(true)

				setTimeout(() => {
					setSuccessMessage(false)
				}, 3000)
			} catch (error: any) {
				setSubmittingError(error.message)

				setTimeout(() => {
					setSubmittingError(null)
				}, 3000)
			}
		},

		validate: withZodSchema(zCreateIdeaTrpcInput),
	})

	return (
		<Segment title='New Idea'>
			<form onSubmit={formik.handleSubmit}>
				<Input name='name' label='Name' formik={formik} />
				<Input name='nick' label='Nick' formik={formik} />
				<Input name='description' label='Description' formik={formik} />

				<Textarea name='text' label='Text' formik={formik} />

				{!formik.isValid && !!formik.submitCount && (
					<div style={{ color: 'red' }}>Some fileds are invalid</div>
				)}

				{!!submittingError && (
					<div style={{ color: 'red' }}>{submittingError}</div>
				)}

				<button
					type='submit'
					className={styles.button}
					disabled={formik.isSubmitting}
				>
					{formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
				</button>

				{successMessage && <div style={{ color: 'green' }}>Idea created!</div>}
			</form>
		</Segment>
	)
}

export default IdeaNew
