import React, { Component } from 'react'
import Table from "components/Table/Table"
import Loading from "components/Loading"
import { normalized } from "utils/util"

/**
 *
 * Есть строки, есть столбцы
 * Некоторые нужно блокировать после автоматической генерации
 * Каждый столбец, отдельная кнопка генерации
 *
 */

export const DataGridContext = React.createContext({})


class DataGrid extends Component {
  state = {
    columns: [],
    rows: [],
    editCell: {
      prevRowIndex: null,
      enterEventRowIndex: null,
      rowIndex: null,
      columnIndex: null
    }
  }

  componentDidMount() {
    console.log(normalized(this.props.rows));
    this.setState({
      columns: this.props.columns,
      rows: this.props.rows
    })
  }

  handleCellClick = (event, rowIndex, columnIndex) => {
    event.preventDefault();
    // console.log('handleCellClick', rowIndex, columnIndex);
    this.setState(prevState => ({
      editCell: {
        prevRowIndex: prevState.editCell.rowIndex,
        enterEventRowIndex: null,
        rowIndex,
        columnIndex
      }
    }))
  }


  handleEditCellEnter = (updated, rowIndex, columnIndex) => {
    // console.log('handleEditCellEnter', updated, rowIndex, columnIndex);
    this.setState(prevState => {
        const rows = [...prevState.rows]
        rows[rowIndex] = { ...rows[rowIndex], ...updated }

        return {
          rows,
          editCell: {
            enterEventRowIndex: rowIndex,
            rowIndex: null,
            columnIndex: null
          }
        }
      }
    )
  }

  handleRunHandler = (event, value, rowIndex, columnKey) => {
    const { valueHandlers } = this.props
    // console.log(rowIndex, columnKey)
    // console.log('handleRunHandler')
    // console.log(valueHandlers);

    if (columnKey in valueHandlers) {
      this.setState(prevState => {
        console.log(prevState.rows[rowIndex][columnKey]);
        prevState.rows[rowIndex][columnKey] = valueHandlers[columnKey](value)

        console.log(prevState.rows);
        return {
          rows: prevState.rows,
          prevRowIndex: rowIndex,
          enterEventRowIndex: rowIndex
        }
      })
    }
    event.stopPropagation();
  }


  render() {
    // console.log('render DataGrid')
    if (!this.state.rows.length) return <Loading/>

    return (
      <DataGridContext.Provider value={{
        onCellClick: this.handleCellClick,
        onEditCellEnter: this.handleEditCellEnter,
        editCell: this.state.editCell,
        onRunHandlerClick: this.handleRunHandler,
        displayValueHandlers: this.props.displayValueHandlers
      }}>
        <Table
          columns={this.state.columns}
          rows={this.state.rows}
        />
      </DataGridContext.Provider>
    )
  }
}

export default DataGrid