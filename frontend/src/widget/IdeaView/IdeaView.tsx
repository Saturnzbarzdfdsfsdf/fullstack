import { useParams } from 'react-router'

import { type TIdeaRouteParams } from '../../app/routes/Routes'

import { trpc } from '../../shared/api/trpc'
import Segment from '../../shared/UI/Segment/Segment'

import styles from './IdeaView.module.scss'

const IdeaView = () => {
	const { ideaNick } = useParams() as TIdeaRouteParams

	const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery(
		{
			ideaNick,
		}
	)

	if (isLoading || isFetching) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	if (!data.idea) {
		return <span>Idea not found</span>
	}

	return (
		<Segment title={data.idea.name} description={data.idea.description}>
			<div
				className={styles.text}
				dangerouslySetInnerHTML={{ __html: data.idea.text }}
			/>
		</Segment>
	)
}

export default IdeaView
