import './App.css';
import { User } from './User'

function App() {
  console.log('env', process.env.REACT_APP_API_URL)
  return (
    <div className="App">
      <header className="App-header">
        <User name='liang' age={666}></User>
      </header>
    </div>
  );
}

export default App;
