import React from 'react'
import { Container } from "react-bootstrap"
import TitleSettingForm from "components/TitleSettingForm"
import TitlesDataGrid from "components/TitlesDataGrid"


const Titles = () => {
  return (
    <Container className="pt-4">
      <h4>Шаг 1. Формируем заголовки</h4>
      <TitleSettingForm className="pb-2"/>
      <TitlesDataGrid/>
    </Container>
  )
}

export default Titles