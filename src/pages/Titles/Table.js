import React from 'react';
import { setTitles } from "store/actions/TitlePageActions";
import DataGrid from "containers/DataGrid";
import { connect } from "react-redux";

const columns = [
  { key: "c1", name: "№", editable: true },
  { key: "c2", name: "Исходный ключ", editable: true },
  { key: "c3", name: "Обрезанный первый заголовок", editable: true },
  { key: "c4", name: "Дополненный заголовок и заглавные буквы", editable: true },
  // { key: "c4", name: "Второй заголовок", editable: true }
]

const extractTitles = titles =>
  titles.map(row => row.c3 + '|' + ('c4' in row ? row.c4 : ''))

const Table = ({ data, displayValueHandlers, valueHandlers, dataUpdateAction }) => {
  return (
    <DataGrid
      columns={columns}
      rows={data}
      valueHandlers={valueHandlers}
      displayValueHandlers={displayValueHandlers}
      onDataUpdate={titles => dataUpdateAction(extractTitles(titles))}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    dataUpdateAction: titles => dispatch(setTitles(titles))
  }
}

export default connect(null, mapDispatchToProps)(Table);