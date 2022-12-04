import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
} from 'reactstrap';

export const Header : React.FC=()=>{
    return (
        <div>
  <Navbar
    color="light"
    expand="md"
    light
  >
    <Link className='navbar-brand' to='/' >
      reactstrap
    </Link>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
      </Nav>
    </Collapse>
  </Navbar>
</div>
    )
}