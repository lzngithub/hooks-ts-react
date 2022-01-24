import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Login } from './login'
import { Register } from './register'

export const UnAuthPages = () => {
	return (
		<div>
			没有权限也可以访问的页面
			<Router>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<Navigate to='/login' />} />
				</Routes>
			</Router>
		</div>
	)
}
