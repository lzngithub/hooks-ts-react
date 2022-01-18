import './App.css';
import { User } from './User'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User name='liang' age={666}></User>
      </header>
    </div>
  );
}

export default App;
