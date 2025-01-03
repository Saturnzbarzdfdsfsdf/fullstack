import { BrowserRouter, Route, Routes } from 'react-router'

import Layout from './Layout/Layout'
import {
	getAllIdeasRoute,
	getViewIdeaRoute,
	IdeaRouteParams,
} from './routes/Routes'

import { TrpcProvider } from '../shared/api/trpc'

import IdeasList from '../pages/IdeasList/IdeasList'
import ViewIdea from '../widget/IdeaView/IdeaView'

import '../shared/styles/global.scss'

const App = () => {
	return (
		<TrpcProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path={getAllIdeasRoute()} element={<IdeasList />} />
						<Route
							path={getViewIdeaRoute(IdeaRouteParams)}
							element={<ViewIdea />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</TrpcProvider>
	)
}

export default App
