import React from 'react'
import TableContainer from "components/Table/TableContainer";
import Loading from "components/Loading"
import { normalized } from "utils/util"

/**
 *
 * Есть строки, есть столбцы
 * Некоторые нужно блокировать после автоматической генерации
 * Каждый столбец, отдельная кнопка генерации
 *
 */

const DataGrid = ({ columns, rows, valueHandlers, displayValueHandlers }) => {
  if (!rows.length) return <Loading/>

  return (
    <TableContainer
      columns={columns}
      data={normalized(rows)}
      valueHandlers={valueHandlers}
      displayValueHandlers={displayValueHandlers}
    />
  )
}

export default DataGrid