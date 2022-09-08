import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  render() {
    return (
    <div>
      <div>
        <Navbar inverse staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">DDEX Validator</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem><Link to="/help">Help</Link></NavItem>
            <NavItem><Link to="/about">About</Link></NavItem>
          </Nav>
        </Navbar>
      </div>

       <div>
          {this.props.children}
       </div>
    </div>
    );
  }
}

export default Header;
