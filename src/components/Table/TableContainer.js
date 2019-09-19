import React, { Component } from 'react'
import Table from 'components/Table/Table'

export const TableContext = React.createContext({})


class TableContainer extends Component {
  state = { ...this.props.data }

  handleRunHandler = (event, value, rowIndex, columnKey, prevCellValue) => {
    console.log('handleRunHandler:', value, rowIndex, columnKey, prevCellValue)

    const newValue = this.props.valueHandlers[columnKey](value, prevCellValue)
    this.setState(prevState => {
      const newState = prevState[columnKey]
      newState[rowIndex] = newValue

      return {
        [columnKey]: newState
      }
    })
    event.stopPropagation()
  }


  handleEditCellChange = (value, rowIndex, columnKey) => {
    // console.log('handleEditCellChange Table: ', value, rowIndex, columnKey)
    this.setState(prevState => {
      const newState = prevState[columnKey]
      newState[rowIndex] = value

      return {
        [columnKey]: newState
      }
    })
  }


  prepareRows = () => {
    // Normalization rows
    const keys = Object.keys(this.state)
    const firsKey = keys[0]

    return this.state[firsKey].map((value, index) => {
      const values = []
      keys.map(key =>
        values.push(this.state[key][index])
      )

      return {
        id: values[0],
        index,
        keys,
        values
      }
    })
  }


  render() {
    return (
      <TableContext.Provider value={{
        valueHandlers: this.props.valueHandlers,
        displayValueHandlers: this.props.displayValueHandlers,
        onEditCellChange: this.handleEditCellChange,
        onRunHandlerClick: this.handleRunHandler
      }}>
        <Table
          columns={this.props.columns}
          rows={this.prepareRows()}
        />
      </TableContext.Provider>
    )
  }
}

export default TableContainer