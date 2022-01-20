import React from 'react'

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，反之返回true
 */
export const useMountedRef = () => {
	const mountedRef = React.useRef(false)
	React.useEffect(() => {
		mountedRef.current = true
		return () => {
			mountedRef.current = false
		}
	})
	return mountedRef
}

export const useMount = (callback: () => void) => {
	React.useEffect(() => {
		callback()
		// todo 依赖项里加上callback会造成无限循环， 这个和useCallback以及useMemo有关
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
