import React, { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { connect } from 'react-redux';
import { request } from 'graphql-request';

import Loading from '../components/Loading';
// import Data from '../config/testData.json';
import NoAccess from '../containers/noAccess';
import { graphCMS as api } from '../config/config';

export const Analysis = (props) => {
	const { user } = useAuth0();
	const [ data, setData ] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { products } = await request(
				'https://api-eu-central-1.graphcms.com/v2/ckp9dhs06n1et01xpbrd37gd4/master?query=%7B%0A%20%20products%7B%0A%20%20%20%20name%0A%20%20%20%20breath%0A%20%20%7D%0A%7D',
				`
      { 
        products {
          name
          breath
        }
      }
    `
			);

			setData(products);
		};

		fetchData();
	}, []);

	return (
		<div className="mb-5 viewer" id="analysis">
			<div className="custom-container">
				<h1>Breathing Trend for {user.given_name}</h1>
				<AreaChart
					width={730}
					height={250}
					data={data}
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
