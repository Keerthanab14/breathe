import './css/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './config/routes';
import Nav from './containers/nav';

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<div className="viewer">
					<Routes />
				</div>
			</div>
		</Router>
	);
}

export default App;
