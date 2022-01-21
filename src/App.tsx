import './App.css'
import { Emotion } from 'pages/emotion'
import { TestApi } from 'pages/testApi' // 测试api的写法

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Emotion name='liang' age={666}></Emotion>
        <TestApi></TestApi>
			</header>
		</div>
	)
}

export default App
