import { message } from 'antd'
import { Token } from 'types'

const localStorageKey = '__auth_provider_token__'

const tokenObjKey = '__auth_provider_token_obj__'

const apiUrl = process.env.REACT_APP_API_URL

export interface UserType {
	userType: string
	uid: number
	username: string
}

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const getTokenObj = () => window.localStorage.getItem(tokenObjKey)

export const handleUserResponse = ({ data }: { data: Token }) => {
	window.localStorage.setItem(localStorageKey, data.token || '')
	window.localStorage.setItem(tokenObjKey, data.token ? JSON.stringify(data) : '')
	return Promise.resolve(data)
}

// 获取用户信息
export const getUserInfo = () => {
	return fetch(`${apiUrl}/auth/getUserInfo`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json'
		},
	}).then(async (response) => {
		if (response.ok) {
			const data = await response.json()
			if (data.code === 0) {
				return data?.data?.userInfo
			} else {
				message.error(data.message)
				return Promise.reject(data.message)
			}
		} else {
			return Promise.reject(await response.json())
		}
	})
}

// 获取token
export const accessToken = (userMessage: { usename: string; password: string }) => {
	return fetch(`${apiUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(userMessage)
	}).then(async (response) => {
		const data = await response.json()
		if (response.ok) {
			if (data.code === 0) return handleUserResponse(data)
			return Promise.reject(data.message)
		} else {
			return Promise.reject(await response.json())
		}
	})
}



export const logout = async () => {
	try {
	} catch (error) {
		console.error(error)
	} finally {
		window.localStorage.removeItem(localStorageKey)
		window.localStorage.removeItem(tokenObjKey)
	}
}

export const tokenFailLogout = () => {
	window.localStorage.removeItem(localStorageKey)
	window.localStorage.removeItem(tokenObjKey)
}



