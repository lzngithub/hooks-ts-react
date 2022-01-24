import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { useLogin } from 'server/login'
export const Login = () => {
	const navigate = useNavigate()
	const { startRun, data: token } = useLogin()
	const login = () => {
		console.log('login')
		startRun({
			username: 'lijianhua',
			password: 'love'
		})
	}
	return (
		<div>
			登录页
			<div>
				<Button onClick={login}>登录</Button>
			</div>
			<div>
				<Button onClick={() => navigate('/register')}>去注册</Button>
			</div>
		</div>
	)
}
