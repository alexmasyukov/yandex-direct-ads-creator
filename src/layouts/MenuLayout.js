import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import MenuNavbar from "components/Menu/MenuNavbar"


class MenuLayout extends Component {
  render() {
    return (
      <Container fluid={true} className="p-0">
        <MenuNavbar/>
        {this.props.children}
      </Container>
    )
  }
}

export default MenuLayout