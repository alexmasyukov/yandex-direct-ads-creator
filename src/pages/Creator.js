import React from 'react'
import { connect } from "react-redux"
import { Container } from "react-bootstrap"
import TitlesDataGrid from "components/TitlesDataGrid"
import TitleSettingForm from "components/TitleSettingForm"
import Ads from "pages/Ads"
import Expander from "components/Expander"

const Creator = ({titleCount = 0}) => {
  return (
    <Container className="pt-4">
      <Expander title="Шаг 1. Настройка заголовков" expand={true}>
        <TitleSettingForm className="pb-2"/>
      </Expander>

      <Expander title={`Заголовки (${titleCount})`} expand={false}>
        <br/>
        <TitlesDataGrid/>
      </Expander>

      <Expander title="Шаг 2. Генерация объеявлений" expand={true}>
        <Ads/>
      </Expander>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    titleCount: state.titlesPageCache.keywords.length
  }
}

export default connect(mapStateToProps)(Creator)