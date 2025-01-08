import { Link, Outlet } from 'react-router-dom'

import { useMe } from '../Context/ctx'

import {
	getAllIdeasRoute,
	getNewIdeasRoute,
	getSignInRoute,
	getSignOutRoute,
	getSignUpRoute,
} from '../routes/Routes'


import styles from './Layout.module.scss'

const Layout = () => {
	const me = useMe()

	return (
		<div className={styles.layout}>
			<div className={styles.navigation}>
				<div className={styles.logo}>IdeaNick</div>
				<ul className={styles.menu}>
					<li className={styles.item}>
						<Link className={styles.link} to={getAllIdeasRoute()}>
							All Ideas
						</Link>
					</li>

					{me ? (
						<>
							<li className={styles.item}>
								<Link className={styles.link} to={getNewIdeasRoute()}>
									Add Idea
								</Link>
							</li>

							<li className={styles.item}>
								<Link className={styles.link} to={getSignOutRoute()}>
									Log Out ({me.nick})
								</Link>
							</li>
						</>
					) : (
						<>
							<li className={styles.item}>
								<Link className={styles.link} to={getSignUpRoute()}>
									Sign Up
								</Link>
							</li>

							<li className={styles.item}>
								<Link className={styles.link} to={getSignInRoute()}>
									Sign In
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>

			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
