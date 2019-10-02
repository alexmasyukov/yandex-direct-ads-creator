import React from 'react'
import { Form } from "react-bootstrap"
import { connect } from "react-redux";

const Titles = ({ titles }) => {
  return (
    <div>
      <Form.Control
        as="textarea"
        cols="30"
        rows="6"
        value={titles.join('\n')}
        onChange={e => e.preventDefault()}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    titles: state.titles
  }
}

export default connect(mapStateToProps)(Titles)