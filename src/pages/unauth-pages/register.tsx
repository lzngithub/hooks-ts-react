import { Button } from 'antd'
import { useNavigate } from 'react-router'
export const Register = () => {
    const navigate = useNavigate()
	return (
		<div>
			注册页
			<div>
				<Button onClick={() => navigate('/login')}>去登录</Button>
			</div>
		</div>
	)
}