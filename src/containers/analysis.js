import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Data from '../config/testData.json';
import NoAccess from '../containers/noAccess';

export const Analysis = (props) => {
	const { user } = useAuth0();
  console.log("user", user);

	const rangeData = Data.data;

	return (
		<div className="mb-5 viewer" id="analysis">
			<div className="custom-container">
        <h1>Breathing Trend for {user.given_name}</h1>
				<AreaChart
					width={730}
					height={250}
					data={rangeData}
					margin={{
						top: 20,
						right: 20,
						bottom: 20,
						left: 20
					}}
				>
					<defs>
						<linearGradient id="colorBreath" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Area type="monotone" dataKey="breath" stroke="#1c9b10" fillOpacity={1} fill="url(#colorBreath)" />
				</AreaChart>
			</div>
		</div>
	);
};

const sToP = (state) => ({
	loggedIn: state.login.loggedIn
});

// const dToP = (dispatch) => ({
// 	: () =>
// 		dispatch({
// 			type: '',
// 			payload:
// 		})
// });

export default withAuthenticationRequired(connect(sToP)(Analysis), {
	onRedirecting: () => (
		<div>
			<NoAccess /> <Loading />
		</div>
	)
});
