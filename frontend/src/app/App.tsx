import { BrowserRouter, Route, Routes } from 'react-router'


import * as routes from './routes/Routes'

import { TrpcProvider } from '../shared/api/trpc'

import Layout from './Layout/Layout'

import { IdeasList } from '../pages/IdeasList'
import { IdeaNew } from '../pages/new-idea'

import ViewIdea from '../widget/IdeaView/IdeaView'

import '../shared/styles/global.scss'

const App = () => {
	return (
		<TrpcProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>

						<Route path={
							routes.getAllIdeasRoute()} 
							element={<IdeasList />} />
							
						<Route path={
							routes.getNewIdeasRoute()} 
							element={<IdeaNew />} />

						<Route
							path={routes.getViewIdeaRoute(routes.IdeaRouteParams)}
							element={<ViewIdea />}
						/>

					</Route>
				</Routes>
			</BrowserRouter>
		</TrpcProvider>
	)
}

export default App
