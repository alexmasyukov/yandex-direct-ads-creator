import React, { Component } from 'react'
import Cell from "components/Table/Cell"
import WithTableContext from 'containers/WithTableContext'
import EditCell from "components/Table/EditCell"


class Row extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // TODO check it
    return true

    if (this.props.rowIndex === nextProps.editCell.rowIndex) {

      // Если эта строки сейчас редактируется, обновляем ее
      // в какой то из ее ячеек появится edit
      // console.log('render row', this.props.rowIndex)
      return true

    } else if (this.props.rowIndex === nextProps.editCell.enterEventRowIndex) {

      // Если в этой строке, в какой из ячеек был edit (она редактировалась)
      // и в нем нажали Enter для сохранения результата, обновляем ее
      // console.log('render row', this.props.rowIndex)
      return true

    } else if (this.props.rowIndex === nextProps.editCell.prevRowIndex) {

      // Если в этой строке раньше была нажата ячейка для редактирования,
      // но небыл нажат Enter для сохранения результата (небыл обновлен
      // enterEventRowIndex в стейте) обновляем ее, чтобы убрать edit в
      // какой то из ячеек
      // console.log('render row', this.props.rowIndex)
      return true

    } else {
      return false
    }

    // Глубокая проверка
    // let isIdentical = trues
    // Object.keys(this.props.values).map((key) => {
    //   isIdentical = this.props.values[key] === nextProps.values[key] && isIdentical
    // })
    // console.log(!isIdentical)
    // return !isIdentical
  }

  render() {
    // console.log('RENDER ROWS')
    const { rowIndex, values, editCell, displayValueHandlers } = this.props
    return (
      <tr>
        {
          Object.keys(values).map((key, columnIndex) => {
              if (key === 'id') return null

              const value = values[key]

              if (editCell.rowIndex === rowIndex && editCell.columnIndex === columnIndex) {
                return (
                  <EditCell
                    key={rowIndex + key}
                    value={value}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    columnKey={key}
                  />
                )
              }


              let displayValue = value
              if (displayValueHandlers[key]) {
                const displayValueFunc = displayValueHandlers[key]
                displayValue = displayValueFunc(value)
              }

              return (
                <Cell
                  key={rowIndex + key}
                  value={value}
                  displayValue={displayValue}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  columnKey={key}
                />
              )
            }
          )
        }
      </tr>
    )
  }
}

export default WithTableContext(Row)