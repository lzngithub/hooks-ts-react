// 测试api的写法
import { useState, useEffect } from 'react'
import { useGetUserInfo, useLogin } from 'server/login'
import { Button } from 'antd'

export const TestApi = () => {
	// 执行这个方法会把发起请求的方法和请求回来的参数状态等一些东西返回回来，而且是响应式的
	const { startRun, data } = useGetUserInfo()
	const { startRun: login, data: token } = useLogin()
	const [count, setCount] = useState(0)

	useEffect(() => {
		login({
			username: 'lijianhua',
			password: 'love'
		})
	}, [login])

	useEffect(() => {
		// startRun()
	}, [startRun])

	console.log(token)
	console.log(data)
	return (
		<div>
			<Button type='primary' onClick={() => setCount(count + 1)}>
				chagne
			</Button>
			：{count}
		</div>
	)
}
