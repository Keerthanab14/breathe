import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import Count from './count';

const Home = (props) => {
	const toAnalyze = () => {
		return;
	};

	return (
		<div id="home viewer">
			<div className="custom-container">
				{/* <Count /> */}
				<Link to="/analysis">
					<button> Analysis </button>
				</Link>
			</div>
		</div>
	);
};

const sToP = (state) => ({
	loggedIn: state.login.loggedIn
});

const dToP = (dispatch) => ({
	login: (userData) =>
		dispatch({
			type: 'LOGIN',
			payload: userData
		})
});

export default connect(sToP, dToP)(Home);
