import React  from 'react'
import { Container } from "react-bootstrap"
import SettingForm from "pages/Ads/SettingForm"
import Table from "pages/Titles/Table";

// import TitlesText from 'pages/Titles/TitlesText'

const Titles = () => {
  return (
    <Container className="pt-4">
      <SettingForm/>
      <Table/>

      {/*<Container>*/}
      {/*<TitlesText/>*/}
      {/*</Container>*/}
    </Container>
  )
}

export default Titles