import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Count from './count';


const Home = ( props ) => {

    
    const toAnalyze = () => {
        return <Redirect to="/analyze" />
    }
    
    return (
        <div id="home">
            <div className="container">
                {/* <Count /> */}
                <button onClick={toAnalyze}> Analysis </button>
            </div>
        </div>
    )
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