import qs from 'qs'
// import * as auth from 'auth-provider'
// import { useAuth } from 'context/auth-context'
// import { useCallback } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
	data?: object
	token?: string
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
	// 1.处理配置
	const config = {
		method: 'GET',
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': data ? 'application/json' : ''
		},
		...customConfig // 运算扩展符回增加新字段或覆盖前面一样的字段
	}
	// 2.处理数据，区分 get 方法和其他方法
	if (config.method.toUpperCase() === 'GET') {
		// 形式由 { c: 'b', a: 'd' } 变为 'c=b&a=d'
		endpoint += `?${qs.stringify(data)}`
	} else {
		// 转变为JSON字符串
		config.body = JSON.stringify(data || {})
	}
	// 3.处理 url
	const url = endpoint.startsWith('http') ? endpoint : `${apiUrl}/${endpoint}`
	// axios 和 fetch 的表现不一样, axios在返回状态不为2xx的时候抛出异常
	return window
		.fetch(url, config)
		.then(async (response) => {
			const res = await response.json() // 返回的是不是真的 JSON，必须通过json方法才能拿到真正的json数据
			if (response.ok) { // 状态码在200-299范围内为true
				if (res.code === 110000) {
					// token校验失败
					// await auth.tokenFailLogout()
					window.location.reload()
					return Promise.reject({ message: '请重新登录' })
				}
				if (res.code === 0) {
					return res.data
				} else {
					return Promise.reject(res.message)
				}
			} else {
				return Promise.reject({ message: '请求失败' })
			}
		})
		.catch((err) => {
            console.log('网络故障或服务端的 CORS 配置错误')
            return Promise.reject(err)
        })
}

// export const useHttp = () => {
// 	const { user } = useAuth()
// 	return useCallback(
// 		(...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token || '' }),
// 		[user?.token]
// 	)
// }

// export const tokenHttp = <T = any>(...[endpoint, config]: Parameters<typeof http>) => {
// 	const token = window.localStorage.getItem('__auth_provider_token__') || ''
// 	return http(endpoint, { ...config, token }) as Promise<T>
// }
