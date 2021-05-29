import './css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './config/routes';
import Nav from './containers/nav';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Nav />
				</header>
				<Routes />
			</div>
		</Router>
	);
}

export default App;
