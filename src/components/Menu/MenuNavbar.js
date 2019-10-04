import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { links } from "constants/menu";

const MenuNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>


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


      </Container>
    </Navbar>
  )
}


export default MenuNavbar