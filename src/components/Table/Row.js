import React from 'react'
import Cell from "components/Table/Cell"

const Row = ({ rowIndex, keys, values }) => (
  <tr>
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