import React from 'react'
import Cell from "./Cell"

const Row = ({ rowIndex, keys, values, onDeleteRow }) => (
  <tr>
    <td onClick={() => onDeleteRow(rowIndex)}>
      Del
    </td>
    {
      keys.map((key, index) => {
          const prevCellValue = index > 0 ? values[index - 1] : ''
          return (
            <Cell
              key={rowIndex + key}
              value={values[index]}
              prevCellValue={prevCellValue}
              rowIndex={rowIndex}
              columnKey={key}
            />
          )
        }
      )
    }
  </tr>
)

export default Row