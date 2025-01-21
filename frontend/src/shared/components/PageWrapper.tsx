import {
	type UseTRPCQueryResult,
	type UseTRPCQuerySuccessResult,
} from '@trpc/react-query/shared'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage'
import { useAppContext, type AppContext } from '../../app/Context/ctx'
import { getAllIdeasRoute } from '../../app/routes/Routes'

class CheckExistsError extends Error {}
const checkExistsFn = <T,>(value: T, message?: string): NonNullable<T> => {
	if (!value) {
		throw new CheckExistsError(message)
	}
	return value
}

class CheckAccessError extends Error {}
const checkAccessFn = <T,>(value: T, message?: string): void => {
	if (!value) {
		throw new CheckAccessError(message)
	}
}



type Props = Record<string, any>

type QueryResult = UseTRPCQueryResult<any, any>

type QuerySuccessResult<TQueryResult extends QueryResult> =
	UseTRPCQuerySuccessResult<NonNullable<TQueryResult['data']>, null>

	type HelperProps<TQueryResult extends QueryResult | undefined> = {
	ctx: AppContext
	queryResult: TQueryResult extends QueryResult
		? QuerySuccessResult<TQueryResult>
		: undefined
}

type SetPropsProps<TQueryResult extends QueryResult | undefined> =
	HelperProps<TQueryResult> & {
		checkExists: typeof checkExistsFn
		checkAccess: typeof checkAccessFn
	}

type PageWrapperProps<
	TProps extends Props,
	TQueryResult extends QueryResult | undefined
> = {
	redirectAuthorized?: boolean
	authorizedOnly?: boolean
	authorizedOnlyTitle?: string
	authorizedOnlyMessage?: string
	checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean
	checkAccessTitle?: string
	checkAccessMessage?: string
	checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean
	checkExistsTitle?: string
	checkExistsMessage?: string
	useQuery?: () => TQueryResult
	setProps?: (setPropsProps: SetPropsProps<TQueryResult>) => TProps
	Page: React.FC<TProps>
}


const PageWrapper = <
	TProps extends Props = object,
	TQueryResult extends QueryResult | undefined = undefined
>({
	authorizedOnly,
	authorizedOnlyTitle = 'Пожалуйста, авторизуйтесь',
	authorizedOnlyMessage = 'Эта страница доступна только авторизованным пользователям',
	redirectAuthorized,
	checkAccess,
	checkAccessTitle = 'Доступ запрещен',
	checkAccessMessage = 'У вас нет доступа к этой странице',
	checkExists,
	checkExistsTitle = 'Не найдено',
	checkExistsMessage = 'Эта страница не существует',
	useQuery,
	
	setProps,
	Page,
}: PageWrapperProps<TProps, TQueryResult>) => {

	const navigate = useNavigate()
	const ctx = useAppContext()
	const queryResult = useQuery?.()

	const redirectNeeded = redirectAuthorized && ctx.me

	useEffect(() => {
		if (redirectNeeded) {
			navigate(getAllIdeasRoute(), { replace: true })
		}
	}, [redirectNeeded, navigate])

	if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
		return <p>Загрузка...</p>
	}

	if (queryResult?.isError) {
		return (
			<NotFoundPage
				message={
					queryResult.error.message || 'Произошла непредвиденная ошибка.'
				}
			/>
		)
	}

	if (authorizedOnly && !ctx.me) {
		return (
			<NotFoundPage
				title={authorizedOnlyTitle}
				message={authorizedOnlyMessage}
			/>
		)
	}

	const helperProps = { ctx, queryResult: queryResult as never }

	if (checkAccess && !checkAccess(helperProps)) {
		return (
			<NotFoundPage
				title={checkAccessTitle}
				message={checkAccessMessage}
			/>
		)
	}

	if (checkExists && !checkExists(helperProps)) {
		return (
			<NotFoundPage
				title={checkExistsTitle}
				message={checkExistsMessage}
			/>
		)
	}

	  try {
			const props = setProps?.({
				...helperProps,
				checkExists: checkExistsFn,
				checkAccess: checkAccessFn,
			}) as TProps
			return <Page {...props} />
		} catch (error) {
			if (error instanceof CheckExistsError) {
				return (
					<NotFoundPage
						title={checkExistsTitle}
						message={error.message || checkExistsMessage}
					/>
				)
			}
			if (error instanceof CheckAccessError) {
				return (
					<NotFoundPage
						title={checkAccessTitle}
						message={error.message || checkAccessMessage}
					/>
				)
			}
			throw error
		}

}

export const withPageWrapper = <
	TProps extends Props = object,
	TQueryResult extends QueryResult | undefined = undefined
>(
	pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
	return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
		return () => <PageWrapper {...pageWrapperProps} Page={Page} />
	}
}

export default PageWrapper
