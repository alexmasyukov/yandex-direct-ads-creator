import React from 'react';
import Row from "components/Table/Row"

const Table = ({ columns, rows }) => {
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
          />
        )
      }
      </tbody>
    </table>
  );
};

export default Table;