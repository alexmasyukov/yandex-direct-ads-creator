import React, { Component } from 'react'
import Row from "components/Table/Row"

class Table extends Component {
  state = { ...this.props.data }

  handleEditCellChange = (value, rowIndex, columnKey) => {
    console.log('handleEditCellChange Table: ', value, rowIndex, columnKey);

    this.setState(prevState => {
      const newState = prevState[columnKey];
      newState[rowIndex] = value

      return {
        [columnKey]: newState
      }
    })
  }

  renderRows = () => {
    const keys = Object.keys(this.state);
    const firsKey = keys[0];

    return this.state[firsKey].map((value, index) => {
      const values = [];
      keys.map(key =>
        values.push(this.state[key][index])
      )

      return (
        <Row
          key={values[0]}
          rowIndex={index}
          keys={keys}
          values={values}
          onEditCellChange={this.handleEditCellChange}
        />
      )
    })
  }

  render() {
    return (
      <table className="table">
        <thead>
        <tr>
          {
            this.props.columns.map(column =>
              <th key={column.key}>{column.name}</th>
            )
          }
        </tr>
        </thead>
        <tbody>
        {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

// onEditCellEnter: this.handleEditCellEnter,

export default Table