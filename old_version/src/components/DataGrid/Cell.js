import React, { Component } from 'react'
import Edit from "./UI/Edit"
import WithTableContext from './hoc/WithTableContext'


class Cell extends Component {
  state = {
    isEdit: false
  }

  handleCellClick = (event) => {
    console.log('handleCellClick', event)
    event.preventDefault()
    this.setState({
      isEdit: true
    })
  }

  handleEnter = (value, rowIndex, columnKey) => {
    console.log('handleEnter:', value, rowIndex, columnKey);
    this.setState({
      isEdit: false
    })

    // Обновляем ячейку только тогда, когда данные в ней изменились
    if (this.props.value !== value) {
      const { onEditCellChange } = this.props
      onEditCellChange(value, rowIndex, columnKey)
    }
  }

  render() {
    const {
      value,
      prevCellValue,
      rowIndex,
      columnKey,
      onRunHandlerClick,
      valueHandlers,
      displayValueHandlers
    } = this.props

    const cls = []
    this.state.isEdit && cls.push('edit')

    // display value handler run
    let displayValue = value
    if (displayValueHandlers[columnKey]) {
      const handler = displayValueHandlers[columnKey]
      displayValue = handler(value, prevCellValue)
    }

    return (
       <td
          className={cls.join(' ')}
          onClick={this.handleCellClick}
       >
         {
           this.state.isEdit ?
              <Edit
                 value={value}
                 onEnter={this.handleEnter}
                 rowIndex={rowIndex}
                 columnKey={columnKey}
              />
              :
              <>
                {displayValue}
                {
                  valueHandlers[columnKey] && <div
                     onClick={(event) => onRunHandlerClick(event, value, rowIndex, columnKey, prevCellValue)}
                  >&nbsp;</div>
                }
              </>
         }
       </td>
    )
  }
}

export default WithTableContext(Cell)