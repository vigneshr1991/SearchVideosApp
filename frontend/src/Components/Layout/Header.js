import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    height: 63px;
    .navbar { 
        position: fixed;
        width: 100%;
        left: 0px;
        top: 0px;
        right: 0px;
        background-color: #222; 
        z-index: 999999;
    }
    a, .navbar-nav, .navbar-light .nav-link {
        color: #9FFFCB;
        &:hover { color: white; }
    }
    .navbar-brand {
        margin: 0 auto;
        font-size: 1.6em;
        color: #9FFFCB;
        &:hover { color: white; }
    }
    .form-center {
        position: absolute !important;
        left: 25%;
        right: 25%;
    }
`;

const Header = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Search Videos App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  </Styles>
);

export default Header;

