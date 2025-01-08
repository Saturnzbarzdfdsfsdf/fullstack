import { useParams } from 'react-router'
import { format } from 'date-fns'

import { trpc } from '../../shared/api/trpc/index'
import { Segment, LinkButton } from '../../shared/ui/index'
import { getEditIdeaRoute } from '../../app/routes/Routes'
import { withPageWrapper } from '../../shared/components/PageWrapper'

import { type TIdeaRouteParams } from '../../app/routes/Routes'

import styles from './IdeaView.module.scss'

const IdeaView = withPageWrapper({
	useQuery: () => {
		const { ideaNick } = useParams() as TIdeaRouteParams
		return trpc.getIdea.useQuery({
			ideaNick,
		})
	},
	checkExists: ({ queryResult }) => !!queryResult.data?.idea,
	checkExistsMessage: 'Idea not found',
	setProps: ({ queryResult, ctx }) => ({
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		idea: queryResult.data?.idea!,
		me: ctx.me,
	}),
})(({ idea, me }) => {
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
})

export default IdeaView
