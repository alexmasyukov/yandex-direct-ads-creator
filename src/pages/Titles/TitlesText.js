import React from 'react'
import { Form } from "react-bootstrap"
import { connect } from "react-redux";

const TitlesText = ({ titles }) => {
  return (
    <div>
      <Form.Control
        as="textarea"
        cols="30"
        rows="6"
        value={titles}
        onChange={e => e.preventDefault()}
      />
    </div>
  )
}

function extractTitles(data) {
  return data.map(row => row.c3 + '|' + ('c4' in row ? row.c4 : ''))
    .join('\n')
}

function mapStateToProps(state) {
  return {
    titles: extractTitles(state.data)
  }
}

export default connect(mapStateToProps)(TitlesText)