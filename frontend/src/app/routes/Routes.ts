const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
	return Object.keys(object).reduce(
		(acc, key) => ({ ...acc, [key]: `:${key}` }),
		{}
	) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => '/'
export const getNewIdeasRoute = () => '/ideas/new'

export const getViewIdeaRoute = ({ ideaNick }: TIdeaRouteParams) =>
	`/ideas/${ideaNick}`

export const IdeaRouteParams = getRouteParams({ ideaNick: true })
export type TIdeaRouteParams = typeof IdeaRouteParams
