import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { links } from "constants/menu"

const MenuNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
            <Navbar.Brand href="#" className="pl-3">
              Creator
            </Navbar.Brand>
      </Container>
    </Navbar>
  )
}


export default MenuNavbar