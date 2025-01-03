import { Link, Outlet } from 'react-router'

import { getAllIdeasRoute } from '../routes/Routes'

import styles from './Layout.module.scss'

const Layout = () => {
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
				</ul>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
