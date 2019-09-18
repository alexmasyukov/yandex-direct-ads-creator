import React from 'react'
import Cell from "components/Table/Cell"
import WithTableContext from 'containers/WithTableContext'

const Row = ({ rowIndex, keys, values, onEditCellChange, onRunHandlerClick }) => {
  return (
    <tr>
      {
        keys.map((key, index) =>
          <Cell
            key={rowIndex + key}
            // onRunHandlerClick={onRunHandlerClick}
            onEditCellChange={onEditCellChange}
            value={values[index]}
            displayValue={values[index]}
            rowIndex={rowIndex}
            columnKey={key}
          />
        )
      }
    </tr>
  );
};

export default WithTableContext(Row)