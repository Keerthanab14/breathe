import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Collapse,
	Container,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

const Login = (props) => {
	const { loggedIn, reduxLogin, reduxLogout } = props;

	const [ isOpen, setIsOpen ] = useState(false);
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	console.log('isauthenticated', isAuthenticated);
	console.log('isauthenticated', window.location.pathname);

	const toggle = () => setIsOpen(!isOpen);

	const logoutWithRedirect = () => {
		reduxLogout();
		logout({
			returnTo: window.location.origin
		});
	};
	return (
		<div id="login">
			<div className="">
				<Navbar color="light" light expand="md">
					<Container>
						<Collapse isOpen={isOpen} navbar>
							<Nav className="d-none d-md-block" navbar>
								{!isAuthenticated && (
									<NavItem>
										<Button
											id="qsLoginBtn"
											color="primary"
											className="btn-margin"
											onClick={() => loginWithRedirect()}
										>
											Log in
										</Button>
									</NavItem>
								)}
								{isAuthenticated && (
									<UncontrolledDropdown nav inNavbar>
										<DropdownToggle nav caret id="profileDropDown">
											<img
												src={user.picture}
												alt="Profile"
												className="nav-user-profile rounded-circle"
												width="50"
											/>
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem header>{user.name}</DropdownItem>
											<DropdownItem
												tag={RouterNavLink}
												to="/profile"
												className="dropdown-profile"
												activeClassName="router-link-exact-active"
											>
												<FontAwesomeIcon icon="user" className="mr-3" /> Profile
											</DropdownItem>
											<DropdownItem id="qsLogoutBtn" onClick={() => logoutWithRedirect()}>
												<FontAwesomeIcon icon="power-off" className="mr-3" /> Log out
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								)}
							</Nav>
							{!isAuthenticated && (
								<Nav className="d-md-none" navbar>
									<NavItem>
										<Button
											id="qsLoginBtn"
											color="primary"
											block
											onClick={() => loginWithRedirect({})}
										>
											Log in
										</Button>
									</NavItem>
								</Nav>
							)}
							{isAuthenticated && (
								<Nav className="d-md-none justify-content-between" navbar style={{ minHeight: 170 }}>
									<NavItem>
										<span className="user-info">
											<img
												src={user.picture}
												alt="Profile"
												className="nav-user-profile d-inline-block rounded-circle mr-3"
												width="50"
											/>
											<h6 className="d-inline-block">{user.name}</h6>
										</span>
									</NavItem>
									<NavItem>
										<FontAwesomeIcon icon="user" className="mr-3" />
										<RouterNavLink to="/profile" activeClassName="router-link-exact-active">
											Profile
										</RouterNavLink>
									</NavItem>
									<NavItem>
										<FontAwesomeIcon icon="power-off" className="mr-3" />
										<RouterNavLink to="#" id="qsLogoutBtn" onClick={() => logoutWithRedirect()}>
											Log out
										</RouterNavLink>
									</NavItem>
								</Nav>
							)}
						</Collapse>
					</Container>
				</Navbar>
			</div>
		</div>
	);
};

const sToP = (state) => ({
	loggedIn: state.login.loggedIn
});

const dToP = (dispatch) => ({
	reduxLogin: (userData) =>
		dispatch({
			type: 'LOGIN',
			payload: userData
		}),
	reduxLogout: () =>
		dispatch({
			type: 'LOGOUT'
		})
});

export default connect(sToP, dToP)(Login);
