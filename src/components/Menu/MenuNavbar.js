import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { links } from "constants/menu";

const MenuNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">
        Creator
      </Navbar.Brand>
      <Nav
        className="mr-auto">
        {
          links.map((link, i) =>
            <Link
              key={i}
              to={link.to}
              // exact={link.exact}
              // activeClassName={"active"}
            >

              {/*<Nav.Link href={link.to}>*/}
                {link.label}
              {/*</Nav.Link>*/}
            </Link>
          )
        }
      </Nav>
    </Navbar>
  )
}


export default MenuNavbar