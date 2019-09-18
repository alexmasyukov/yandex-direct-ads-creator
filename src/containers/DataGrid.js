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


  // handleCellClick = (rowIndex, columnKey) => {
  //   // event.preventDefault();
  //   console.log('handleCellClick', rowIndex, columnKey);
  //   // this.setState(prevState => ({
  //   //   editCell: {
  //   //     prevRowIndex: prevState.editCell.rowIndex,
  //   //     enterEventRowIndex: null,
  //   //     rowIndex,
  //   //     columnKey
  //   //   }
  //   // }))
  // }


  handleEditCellEnter = (value, rowIndex, columnKey) => {
    console.log('handleEditCellEnter DataGrid', value, rowIndex, columnKey);

    this.setState(prevState => {
      return {

      }
    })
    // this.setState(prevState => {
    //     const rows = [...prevState.rows]
    //     rows[rowIndex] = { ...rows[rowIndex], ...updated }
    //
    //     return {
    //       rows,
    //       editCell: {
    //         enterEventRowIndex: rowIndex,
    //         rowIndex: null,
    //         columnIndex: null
    //       }
    //     }
    //   }
    // )
  }

  handleRunHandler = (event, value, rowIndex, columnKey) => {
    console.log('handleRunHandler');
    // const { valueHandlers } = this.props
    // // console.log(rowIndex, columnKey)
    // // console.log('handleRunHandler')
    // // console.log(valueHandlers);
    //
    // if (columnKey in valueHandlers) {
    //   this.setState(prevState => {
    //     console.log(prevState.rows[rowIndex][columnKey]);
    //     prevState.rows[rowIndex][columnKey] = valueHandlers[columnKey](value)
    //
    //     console.log(prevState.rows);
    //     return {
    //       rows: prevState.rows,
    //       prevRowIndex: rowIndex,
    //       enterEventRowIndex: rowIndex
    //     }
    //   })
    // }
    event.stopPropagation();
  }


  render() {
    console.log('render DataGrid')
    if (!this.props.rows.length) return <Loading/>

    return (
      <DataGridContext.Provider value={{
        onRunHandlerClick: this.handleRunHandler,
        displayValueHandlers: this.props.displayValueHandlers
      }}>
        <Table
          columns={this.props.columns}
          data={normalized(this.props.rows)}
        />
      </DataGridContext.Provider>
    )
  }
}

export default DataGrid