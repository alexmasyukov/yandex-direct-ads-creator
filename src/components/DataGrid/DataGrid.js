import React, { Component } from 'react'
import Table from './Table'
import { TableContext } from "./context/TableContext"


class DataGrid extends Component {
  state = {}

  prepareRows = () => {
    // console.log('prepareRows', Object.keys(this.state));
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.onDataUpdate) return
    console.log('componentDidUpdate');

    const keys = Object.keys(prevState)
    const length = prevState.c1.length
    const result = new Array(length)

    for (let idx = 0; idx < length; idx++) {
      result[idx] = {}

      keys.forEach(key => {
        result[idx][key] = prevState[key][idx]
      })
    }

    this.props.onDataUpdate(result)
  }

  componentWillUnmount() {
    console.log('componentDidUpdate');

    const keys = Object.keys(this.state)
    const length = this.state.c1.length
    const result = new Array(length)

    for (let idx = 0; idx < length; idx++) {
      result[idx] = {}

      keys.forEach(key => {
        result[idx][key] = this.state[key][idx]
      })
    }

    this.props.onUnmountDataGrid(result)
  }

  handleRunHandler = (event, value, rowIndex, columnKey, prevCellValue) => {
    // console.log('handleRunHandler:', value, rowIndex, columnKey, prevCellValue)

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

  componentDidMount() {
    // console.log('componentDidMount ...this.props.data', this.props.data);
    this.setState({
      ...this.props.data
    })
  }


  static getDerivedStateFromProps(nextProps, prevState) {

    return {
      ...nextProps.data
    }
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

  handleDeleteRow = (rowIndex) => {
    console.log(rowIndex);
    console.log(this.state);

    this.setState(prevState => {
      const newState = {...prevState}
      newState.c1.splice(rowIndex, 1)
      newState.c2.splice(rowIndex, 1)
      newState.c3.splice(rowIndex, 1)
      newState.id.splice(rowIndex, 1)

      return newState
    })
  }


  render() {
    if (!('c1' in this.state)) return <p>processed...</p>
    console.log('Render DataGrid');

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
          onDeleteRow={this.handleDeleteRow}
        />
      </TableContext.Provider>
    )
  }
}

export default DataGrid