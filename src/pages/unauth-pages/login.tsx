import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { useAuth } from 'context/auth-context'
export const Login = () => {
	const navigate = useNavigate()
	const { login } = useAuth()
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
