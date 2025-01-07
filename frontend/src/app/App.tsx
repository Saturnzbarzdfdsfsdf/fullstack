import { BrowserRouter, Route, Routes } from 'react-router'

import * as routes from './routes/Routes'

import { TrpcProvider } from './providers/TrpcProvider'

import Layout from './Layout/Layout'

import { IdeasList } from '../pages/IdeasList'
import { IdeaNew } from '../pages/new-idea'

import ViewIdea from '../widget/IdeaView/IdeaView'

import { SignUpPage } from '../pages/signUp/index'
import { SignInPage } from '../pages/SignInPage/index'
import { SignOutPage } from '../pages/SignOut/index'

import '../shared/styles/global.scss'

const App = () => {
	return (
		<TrpcProvider>
			<BrowserRouter>
				<Routes>

					<Route path={routes.getSignOutRoute()} element={<SignOutPage />} />

					<Route element={<Layout />}>
						<Route path={routes.getAllIdeasRoute()} element={<IdeasList />} />

						<Route path={routes.getNewIdeasRoute()} element={<IdeaNew />} />

						<Route
							path={routes.getViewIdeaRoute(routes.IdeaRouteParams)}
							element={<ViewIdea />}
						/>

						<Route path={routes.getSignUpRoute()} element={<SignUpPage />} />

						<Route path={routes.getSignInRoute()} element={<SignInPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</TrpcProvider>
	)
}

export default App
