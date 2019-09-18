import React, { Component } from 'react'
import Table from "components/Table/Table"
import * as Util from 'utils/util'
import { simpleKeywords } from 'data/data'

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
    titles: Util.generateTableTitles(),
    keywords: [],
    gridData: []
  }


  generateGridData = ({ keywords, column }) => {
    const gridData = keywords
      .split('\n')
      .filter(element => element.trim() !== '')
      .map((keyword, i) => (
        {
            id: i,
            columns: {
              [column]: {
                value: keyword,
              }
            }
          }
      ))

    this.setState({
      keywords: keywords,
      gridData
    })
  }


  componentDidMount() {
    const fetch = simpleKeywords;

    this.generateGridData({
      keywords: fetch.join('\n'),
      column: 'c1'
    })
  }


  cellClickHandler = (event, rowId, column, value) => {
    // console.log(event)
    console.log(rowId)
    console.log(column)
    console.log(value)
  }

  handleKeywordsChange = (event) => {
    this.setState({
      keywords: event.target.value
    }, () => {

      this.generateGridData({
        keywords: this.state.keywords,
        column: 'c1'
      })

    })
  }


  render() {
    // console.log('render gridData', this.state.gridData)

    return (
      <>
        <textarea
          rows="10"
          cols="70"
          value={this.state.keywords}
          onChange={this.handleKeywordsChange}
        />


        <DataGridContext.Provider value={{
          onCellClick: this.cellClickHandler
        }}>
          <Table
            titles={this.state.titles}
            gridData={this.state.gridData}
          />
        </DataGridContext.Provider>
      </>
    )
  }
}

export default DataGrid