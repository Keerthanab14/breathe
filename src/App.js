import './css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './config/routes';
import Login from './containers/login';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Login />
				</header>
				<Routes />
			</div>
		</Router>
	);
}

export default App;
