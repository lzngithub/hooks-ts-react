import { useCallback } from 'react'
import { useAsync } from 'hooks/useAsync'
import { useHttp } from 'utils/http'

// 登录参数
export type loginMessage = {
	username: string
	password: string
}

// 获取用户信息，方法名必须用use开头，不然会报错
export const useLogin = () => {
	const client = useHttp()
	const { run, ...rest } = useAsync<{ token: string }>()
	// 当执行starRun方法的时候，会先执行完client函数，client函数执行完会产生一个Promise
	// 这个Promise会传进run里面，接着run执行
	// run方法执行主要设置值，正确的值或者错误的值
	// 主要思想就是一层层不断往外抛出，中间加你需要的逻辑
	const startRun = useCallback(
		(parms: loginMessage) =>
			run(
				client('login', {
					method: 'post',
					data: {
						...parms
					}
				})
			),
		[run, client]
	)
	return {
		startRun,
		...rest
	}
}

// 定义返回的数据结构
export type userInfo = {
	name: string
	mobile: number
	gender: number
}

// 获取用户信息，方法名必须用use开头，不然会报错
export const useGetUserInfo = () => {
	const client = useHttp()
	const { run, ...rest } = useAsync<{ result: userInfo }>()
	// 当执行starRun方法的时候，会先执行完client函数，client函数执行完会产生一个Promise
	// 这个Promise会传进run里面，接着run执行
	// run方法执行主要设置值，正确的值或者错误的值
	// 主要思想就是一层层不断往外抛出，中间加你需要的逻辑
	const startRun = useCallback(
		() =>
			run(
				client('user/userInfo', {
					method: 'GET',
					data: {}
				})
			),
		[run, client]
	)
	return {
		startRun,
		...rest
	}
}
