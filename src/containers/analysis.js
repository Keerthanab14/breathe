import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { connect } from 'react-redux';
import { Container, Row, Col } from "reactstrap";x

import Loading from "../components/Loading";

export const Analysis = (props) => {
  const { loggedIn } = props;
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
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
  onRedirecting: () => <Loading />,
});
