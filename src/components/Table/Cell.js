import React, { PureComponent, useState } from 'react';
import Edit from "components/Table/UI/Edit";

class Cell extends PureComponent {
  state = {
    isEdit: false
  }

  handleCellClick = () => {
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
      this.props.onEditCellChange(value, rowIndex, columnKey)
    }
  }

  render() {
    const {
      value,
      displayValue,
      rowIndex,
      columnKey
    } = this.props


    return (
      <td
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
            : displayValue
        }
      </td>
    );
  }
}


const Cell2 = ({
                 value,
                 displayValue,
                 rowIndex,
                 columnKey,
                 onCellClick,
                 onRunHandlerClick
               }) => {
  const [visible, setVisible] = useState('')
  return (
    <td
      onClick={onCellClick.bind(null, rowIndex, columnKey)}
      onMouseOver={() => {
        setVisible('show')
      }}
      onMouseOut={() => {
        setVisible('')
      }}
    >
      {displayValue}
      <div
        className={`runHandler ${visible}`}
        onClick={(e) => onRunHandlerClick(e, value, rowIndex, columnKey)}
      >&nbsp;</div>
    </td>
  )
}

export default Cell