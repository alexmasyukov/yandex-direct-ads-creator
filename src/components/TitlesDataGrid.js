import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "store/actions/action";
import DataGrid from "components/DataGrid/DataGrid";
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


class TitlesDataGrid extends Component {
  state = {
    titlesParams: {
      ...this.props.titlesParams
    },
    titlesDataGridCache: [
      ...this.props.titlesDataGridCache
    ]
  }

  static getDerivedStateFromProps(nextState, nextProps) {
    console.log('getDerivedStateFromProps');
    console.log('nextState', nextState);
    console.log('nextProps', nextProps);
    return nextState
  }



  get displayValueHandlers() {
    const { maxOneTitleLenght } = this.state.titlesParams
    return {
      c1: dataGridHandlers.highlightMaxLength(maxOneTitleLenght),
      c2: dataGridHandlers.highlightMaxLength(maxOneTitleLenght),
      c3: dataGridHandlers.highlightMaxLength(maxOneTitleLenght),
      // c4: dataGridHandlers.highlightMaxLength(this.state.maxOneTitleLenght),
    }
  }

  get valueHandlers() {
    const { maxOneTitleLenght, deleteNeedless, addNeedless } = this.state.titlesParams
    return {
      c2: dataGridHandlers.deleteNeedless(maxOneTitleLenght, deleteNeedless),
      c3: dataGridHandlers.addNeedless(maxOneTitleLenght, addNeedless)
      // c3: dataGridHandlers.addNeedless(this.state.maxOneTitleLenght, this.state.addNeedless)
    }
  }

  // updateTitles = (data) => {
  //   console.log('updateTitles')
  //   const titles = data.map(row => row.c3 + '|' + ('c4' in row ? row.c4 : ''))
  //   this.props.updateTitles(titles)
  // }


  render() {
    const { titlesDataGridCache } = this.state
    // console.log('DataGrid render', this.state);
    // console.log(this.state.titlesDataGridCache.length);
    if (!titlesDataGridCache.length) return <Loading/>
    // console.log('Table render');

    return (
      <DataGrid
        columns={columns}
        data={normalized(titlesDataGridCache)}
        valueHandlers={this.valueHandlers}
        displayValueHandlers={this.displayValueHandlers}
        onUnmountDataGrid={(data) => {
          console.log(data);
          console.log('onUnmountDataGrid');
          this.props.setTitlesDatagridCache(data)
        }}
        // onDataUpdate={this.updateTitles}
      />
    )
  }
}

function mapStateToProps(state) {
  console.log(state.titlesDataGridCache.length);
  return {
    titlesParams: state.titlesPageCache,
    titlesDataGridCache: state.titlesDataGridCache
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTitlesDatagridCache: cache => dispatch(actions.setTitlesDatagridCache(cache)),
    // updateTitles: (titles) => dispatch(actions.updateTitles(titles))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitlesDataGrid);