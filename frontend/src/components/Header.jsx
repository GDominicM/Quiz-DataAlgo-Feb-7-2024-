import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar className="navbar-expand-lg bg-dark" expand="lg" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">Jabolster</Navbar.Brand> {/* Returns back to Homescreen */}
        <Navbar.Toggle aria-controls="navbarColor02" />
        <Navbar.Collapse id="navbarColor02">
          <Nav className="me-auto">
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>
                Cart
              <span className="visually-hidden">(current)</span>
            </Nav.Link>
            <Nav.Link href="/user"><i className='fas fa-user'></i>
                User
            </Nav.Link>
            <NavDropdown title="Options" id="basic-nav-dropdown" className="nav-item dropdown">
              <NavDropdown.Item href="#" className="dropdown-item">
                Jabol
              </NavDropdown.Item>
              <NavDropdown.Item href="#" className="dropdown-item">
                Jakol
              </NavDropdown.Item>
              <NavDropdown.Item href="#" className="dropdown-item">
                Jajabol
              </NavDropdown.Item>
              <NavDropdown.Divider className="dropdown-divider" />
              <NavDropdown.Item href="#" className="dropdown-item">
                ~Ahh~
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
