import React, { Component } from 'react';
import DataGrid from "containers/DataGrid"
import * as dataGridHandlers from 'utils/dataGridHandlers'
import { generateSimpleRows } from 'data/simpleData'
import { highlightMaxLength } from "utils/dataGridHandlers";

const columns = [
  { key: "c1", name: "One", editable: true },
  { key: "c2", name: "Two", editable: true },
  { key: "c3", name: "Three", editable: true }
]


// let value = values[key]
// if (valueHandlers[key]) {
//   const handler = valueHandlers[key];
//   value = handler(value)
// }
//

// const rows = [
//   { id: 0, c1: "Task 1", c2: 20, c3: '' },
//   { id: 1, c1: "Task 2", c2: 30, c3: '' },
//   { id: 2, c1: "Task 3", c2: 40, c3: 'f' }
// ]

class Generator extends Component {
  state = {
    maxTitleLength: 33,
    endWordsToDelete: ['производитель']
  }

  get displayValueHandlers() {
    return {
      c1: dataGridHandlers.highlightMaxLength(this.state.maxTitleLength)
    }
  }

  get valueHandlers() {
    return {
      c2: dataGridHandlers.deleteNeedless(this.state.maxTitleLength, this.state.endWordsToDelete)
    }
  }


  handleInputChange = (e, stateKey) => {
    this.setState({
      [stateKey]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <p>{dataGridHandlers.highlightMaxLength(this.state.maxTitleLength)('посредники таобао дешевая доставка в россию')}</p>

        <input
          type="number"
          value={this.state.maxTitleLength}
          onChange={(e) => this.handleInputChange(e, 'maxTitleLength')}
        />

        <DataGrid
          columns={columns}
          rows={generateSimpleRows(20)}
          valueHandlers={this.valueHandlers}
          displayValueHandlers={this.displayValueHandlers}
        />
      </div>
    );
  }
}

export default Generator;