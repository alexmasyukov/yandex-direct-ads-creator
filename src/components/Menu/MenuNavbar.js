import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { links } from "consts/menu";

const MenuNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">
        Creator
      </Navbar.Brand>
      <Nav className="mr-auto">
        {
          links.map((link, i) =>
            <NavLink
              key={i}
              to={link.to}
              exact={link.exact}
              activeClassName={"active"}
            >
              <Nav.Link href={link.to}>{link.label}</Nav.Link>
            </NavLink>
          )
        }
      </Nav>
    </Navbar>
  )
}

export default MenuNavbar