import React, { useState } from 'react'
import WithTableContext from 'containers/WithTableContext'

const Cell = ({
                value,
                displayValue,
                rowIndex,
                columnIndex,
                columnKey,
                onCellClick,
                onRunHandlerClick
}) => {
  const [visible, setVisible] = useState('')
  return (
    <td
      onClick={(e) => onCellClick(e, rowIndex, columnIndex)}
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

export default WithTableContext(Cell)