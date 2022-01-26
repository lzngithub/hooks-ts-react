import { useAuth } from "context/auth-context";
import { AuthPages } from 'pages/auth-pages'
import { UnAuthPages } from 'pages/unauth-pages'
import './App.css'

function App() {
	const { token } = useAuth()
	return (
		<div className='App'>
			<header className='App-header'>
				{ token ? <AuthPages /> : <UnAuthPages /> }
			</header>
		</div>
	)
}

export default App
