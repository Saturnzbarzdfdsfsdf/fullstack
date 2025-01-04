import { Link } from 'react-router-dom'

import { getViewIdeaRoute } from '../../../app/routes/Routes'

import { trpc } from '../../../shared/api/trpc'

import { Segment } from '../../../shared/ui/index'

import styles from './IdeasList.module.scss'

const IdeasList = () => {
	const { data, error, isLoading, isFetching, isError } =
		trpc.getIdeas.useQuery()

	// Обработка загрузки
	if (isLoading || isFetching) {
		return <div className={styles.loading}>Loading...</div>
	}

	// Обработка ошибки
	if (isError) {
		return (
			<div className={styles.error}>
				<p>There was an error loading the ideas: {error?.message}</p>
			</div>
		)
	}

	// Обработка пустого списка идей
	if (!data || !data.ideas || data.ideas.length === 0) {
		return (
			<div className={styles.noIdeas}>
				<p>No ideas found</p>
			</div>
		)
	}

	return (
		<Segment title='All Ideas'>
			<div className={styles.ideas}>
				{data.ideas.map(idea => (
					<div className={styles.idea} key={idea.nick}>
						<Segment
							size={2}
							title={
								<Link
									className={styles.ideaLink}
									to={getViewIdeaRoute({ ideaNick: idea.nick })}
								>
									{idea.name}
								</Link>
							}
							description={idea.description}
						/>
					</div>
				))}
			</div>
		</Segment>
	)
}

export default IdeasList
