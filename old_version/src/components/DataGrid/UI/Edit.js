import React, { Component } from 'react'
import WithTableContext from '../hoc/WithTableContext'

class Edit extends Component {
  state = {
    value: this.props.value
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
     this.updateCell(event.target.value)
    }
  }

  handleBlur = (event) => {
    this.updateCell(event.target.value)
  }


  updateCell = (value) => {
    const { onEnter, rowIndex, columnKey } = this.props
    onEnter(value, rowIndex, columnKey)
  }

  render() {
    return (
      <input
        autoFocus={true}
        type="text"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        value={this.state.value}
      />
    )
  }
}

export default WithTableContext(Edit)