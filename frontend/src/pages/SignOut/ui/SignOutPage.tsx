import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSignInRoute } from '../../../app/routes/Routes'

import { trpc } from '../../../shared/api/trpc/index'

const SignOutPage = () => {
	const navigate = useNavigate()
	const trpcUtils = trpc.useContext()
	useEffect(() => {
		
		Cookies.remove('token')
		void trpcUtils.invalidate().then(() => { 
			navigate(getSignInRoute())
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <p>Loading...</p>
}
export default SignOutPage
