// 控制用户信息和权限全局变量，通过useContext和useState配合
import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { Token, UserInfo } from 'types'
import { useState } from 'react'
import { useMount } from 'hooks'

type InitContext = {
	user: Partial<Token & UserInfo> | null
	setUser: () => void,
	login: (userMessage: { usename: string; password: string }) => Promise<Token>;
	getUserInfo: () => any
}

const AuthContext = React.createContext<InitContext | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { user, setUser } = useLogin()
	const [userData, setUserData] = useState<Partial<Token & UserInfo> | null>(user)

	const getUserInfo = useCallback(() => {
		const useInfo = auth.getUserInfo()
	}, [])

	return (
		<AuthContext.Provider
			children={children}
			value={{
				user: userData,
				setUser,
				login: auth.accessToken,
				getUserInfo
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

const useLogin = () => {
	const [isLogin, setIsLogin] = useState(false)
	const [user, _setUser] = useState<User | null>(null)

	const setUser = useCallback(() => {
		const tokenObjStr = auth.getTokenObj() || '{}'
		const { token, expiredAt, type } = JSON.parse(tokenObjStr) as User
		if (token && expiredAt && Number(expiredAt) * 1000 > Date.now()) {
			_setUser({ token, expiredAt, type })
			setIsLogin(true)
		} else {
			_setUser(null)
			setIsLogin(false)
		}
	}, [])

	useMount(() => {
		setUser()
	})

	return {
		isLogin,
		setIsLogin,
		user,
		setUser
	}
}
