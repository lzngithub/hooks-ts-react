import { useAuth } from "context/auth-context";
import { AuthPages } from 'pages/auth-pages'
import { UnAuthPages } from 'pages/unauth-pages' // 测试api的写法
import './App.css'

function App() {
	const { user } = useAuth()
	return (
		<div className='App'>
			<header className='App-header'>
				{ user?.token ? <AuthPages /> : <UnAuthPages /> }
			</header>
		</div>
	)
}

export default App
