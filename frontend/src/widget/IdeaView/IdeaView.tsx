import { useParams } from 'react-router'
import { format } from 'date-fns'

import { trpc } from '../../shared/api/trpc/index'
import { Segment, LinkButton } from '../../shared/ui/index'

import { getEditIdeaRoute } from '../../app/routes/Routes'

import { useMe } from '../../app/Context/ctx'

import { type TIdeaRouteParams } from '../../app/routes/Routes'

import styles from './IdeaView.module.scss'

const IdeaView = () => {
	const { ideaNick } = useParams() as TIdeaRouteParams

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

	return (
		<Segment title={idea.name} description={idea.description}>
			<div className={styles.createdAt}>
				Created At: {format(idea.createdAt, 'dd-MM-yyyy')}
			</div>
			<div className={styles.author}>Author: {idea.author.nick}</div>
			<div
				className={styles.text}
				dangerouslySetInnerHTML={{ __html: idea.text }}
			/>

			{me?.id === idea.authorId && (
				<div className={styles.editButton}>
					<LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
						Edit Idea
					</LinkButton>
				</div>
			)}
		</Segment>
	)
}

export default IdeaView
