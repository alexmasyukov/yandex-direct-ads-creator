import React from 'react';
import Row from "./Row"

const Table = ({ columns, rows, onDeleteRow }) => {
  return (
    <table className="table">
      <thead>
      <tr>
        {
          columns.map(column =>
            <th key={column.key}>{column.name}</th>
          )
        }
      </tr>
      </thead>
      <tbody>
      {
        rows && rows.map((row) =>
          <Row
            key={row.id}
            rowIndex={row.index}
            keys={row.keys}
            values={row.values}
            onDeleteRow={onDeleteRow}
          />
        )
      }
      </tbody>
    </table>
  );
};

export default Table;