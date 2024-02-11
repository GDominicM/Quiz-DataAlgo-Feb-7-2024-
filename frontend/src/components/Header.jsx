import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">Jabolster</Navbar.Brand> {/* Returns back to Homescreen */}
        <Navbar.Toggle aria-controls="navbarColor02" />
        <Navbar.Collapse id="navbarColor02">
          <Nav className="ms-auto"> {/* Use "ms-auto" to push items to the right */}
            <Nav.Link as={Link} to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i> Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
