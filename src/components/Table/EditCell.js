import React from 'react'
import WithTableContext from 'containers/WithTableContext'
import Edit from "components/Table/UI/Edit"

const EditCell = ({ value, rowIndex, columnIndex, columnKey, onEditCellChange }) => {
  return (
    <td className="edit">
      <Edit
        value={value}
        onChange={onEditCellChange}
        rowIndex={rowIndex}
        columnKey={columnKey}
      />
    </td>
  )
}

export default WithTableContext(EditCell)