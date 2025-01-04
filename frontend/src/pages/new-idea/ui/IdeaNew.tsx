import { useFormik } from 'formik'

import { Input, Segment, Textarea } from '../../../shared/ui/index'

// import styles from './IdeaNew.module.scss'

const IdeaNew = () => {

	const formik = useFormik({
		initialValues: {
			name: '',
			nick: '',
			description: '',
			text: '',
		},
		onSubmit: values => {
			console.info('Submitted', values)
		},
	})
	


	return (
		<Segment title='New Idea'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					formik.handleSubmit()
				}}
			>
				<Input name='name' label='Name' formik={formik} />
				<Input name='nick' label='Nick' formik={formik} />
				<Input name='description' label='Description' formik={formik} />

				<Textarea name='text' label='Text' formik={formik} />

				<button type='submit'>Create Idea</button>
			</form>
		</Segment>
	)
}

export default IdeaNew
