import { useParams } from 'react-router'

import { type TIdeaRouteParams } from '../../app/routes/Routes'

import { trpc } from '../../shared/api/trpc'

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
		<div>
			<h1 className={styles.title}>{data.idea.name}</h1>
			<p className={styles.description}>{data.idea.description}</p>
			<div
				className={styles.text}
				dangerouslySetInnerHTML={{ __html: data.idea.text }}
			/>
		</div>
	)
}

export default IdeaView