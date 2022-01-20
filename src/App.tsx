import './App.css'
import { Emotion } from 'pages/emotion'

function App() {
	console.log('env', process.env.REACT_APP_API_URL)
	return (
		<div className='App'>
			<header className='App-header'>
				<Emotion name='liang' age={666}></Emotion>
			</header>
		</div>
	)
}

export default App
