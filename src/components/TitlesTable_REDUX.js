import React, { Component } from 'react'
import * as actions from "store/actions/action";
import DataGrid from "components/DataGrid/DataGrid";
import { connect } from "react-redux";
import * as dataGridHandlers from "utils/dataGridHandlers";
import Loading from "components/Loading"
import { normalized } from "utils/util"

const columns = [
  { key: "c1", name: "№", editable: true },
  { key: "c2", name: "Исходный ключ", editable: true },
  { key: "c3", name: "2. Обрезанный первый заголовок", editable: true },
  { key: "c4", name: "3. Дополненный заголовок и заглавные буквы", editable: true },
  // { key: "c4", name: "Второй заголовок", editable: true }
]


class TitlesTable extends Component {
  get displayValueHandlers() {
    const { maxOneTitleLenght } = this.props
    return {
      c1: dataGridHandlers.highlightMaxLength(maxOneTitleLenght),
      c2: dataGridHandlers.highlightMaxLength(maxOneTitleLenght),
      c3: dataGridHandlers.highlightMaxLength(maxOneTitleLenght),
      // c4: dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght),
    }
  }

  get valueHandlers() {
    const { maxOneTitleLenght, deleteNeedless, addNeedless } = this.props
    return {
      c2: dataGridHandlers.deleteNeedless(maxOneTitleLenght, deleteNeedless),
      c3: dataGridHandlers.addNeedless(maxOneTitleLenght, addNeedless)
      // c3: dataGridHandlers.addNeedless(this.state.maxOneTitleLenght, this.state.addNeedless)
    }
  }

  updateTitles = (data) => {
    console.log('updateTitles')
    const titles = data.map(row => row.c3 + '|' + ('c4' in row ? row.c4 : ''))
    this.props.updateTitles(titles)
  }


  render() {
    const { data } = this.props
    if (!data.length) return <Loading/>
    console.log('Table render');

    return (
      <DataGrid
        columns={columns}
        data={normalized(data)}
        valueHandlers={this.valueHandlers}
        displayValueHandlers={this.displayValueHandlers}
        onDataUpdate={this.updateTitles}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.titles.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateTitles: (titles) => dispatch(actions.updateTitles(titles))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitlesTable);