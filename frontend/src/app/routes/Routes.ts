const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
	return Object.keys(object).reduce(
		(acc, key) => ({ ...acc, [key]: `:${key}` }),
		{}
	) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => '/'
export const getNewIdeasRoute = () => '/ideas/new'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'

export const getViewIdeaRoute = ({ ideaNick }: TIdeaRouteParams) =>
	`/ideas/${ideaNick}`

export const getEditIdeaRoute = ({ ideaNick }: EditIdeaRouteParams) =>
	`/ideas/${ideaNick}/edit`

export const IdeaRouteParams = getRouteParams({ ideaNick: true })
export const editIdeaRouteParams = getRouteParams({ ideaNick: true })

export type EditIdeaRouteParams = typeof IdeaRouteParams
export type TIdeaRouteParams = typeof IdeaRouteParams
