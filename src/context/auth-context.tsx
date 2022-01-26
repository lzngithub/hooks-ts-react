// 控制用户信息和权限全局变量，通过useContext和useState配合
import React, { ReactNode, useCallback, useEffect } from 'react'
import * as auth from 'auth-provider'
import { UserInfo } from 'types'
import { useState } from 'react'

type InitContext = {
	userInfo: Partial<UserInfo> | null
	token:  string | null
	login: () => void;
}

const AuthContext = React.createContext<InitContext | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userInfo, setUserInfo] = useState <Partial<UserInfo> | null>(null)
	const [token, setToken] = useState<string | null>('')

	// 刷新的时候从localstorage拿token值
	useEffect(() => {
		setToken(auth.getToken)
	}, [])

	const login = useCallback(() => {
		auth.accessToken({ usename: 'li', password: 'love' }).then(res => {
			setToken(res.token)
			auth.getUserInfo().then(message => {
				setUserInfo(message)
			})
		})
	}, [])

	return (
		<AuthContext.Provider
			children={children}
			value={{
				token,
				userInfo,
				login
			}}
		/>
	)
}

// 把获取全局变量的方法抛出，方便外界获取
export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth必须在AuthProvider中使用')
	}
	return context
}
