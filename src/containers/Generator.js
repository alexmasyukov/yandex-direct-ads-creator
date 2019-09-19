import React, { Component } from 'react';
import DataGrid from "containers/DataGrid"
import * as dataGridHandlers from 'utils/dataGridHandlers'
import { generateSimpleRows } from 'data/simpleData'

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
    maxTitleLength: 20,
    endWordsToDelete: [
      'в',
      'на',
      'из',
      'в интернет',
      'для',
      'ru',
      'ру',
      'с',
      'по',
      'и',
      'м',
      'интернет',
      'в интернете',
      'интернете',
      'от',
      'россия'
    ]
  }

  get displayValueHandlers() {
    return {
      c1: dataGridHandlers.highlightMaxLength(this.state.maxTitleLength),
      c2: dataGridHandlers.deleteNeedless(this.state.maxTitleLength, this.state.endWordsToDelete)
    }
  }

  get valueHandlers() {
    return {
      c2: dataGridHandlers.deleteNeedless(this.state.maxTitleLength, this.state.endWordsToDelete)
    }
  }


  handleInputChange = (stateKey, value) => {
    this.setState({
      [stateKey]: value
    })
  }

  render() {
    return (
      <div>
        <p>{dataGridHandlers.highlightMaxLength(this.state.maxTitleLength)('посредники таобао дешевая доставка в россию')}</p>

        <textarea
          cols="30"
          rows="10"
          value={this.state.endWordsToDelete.join('\n')}
          onChange={e =>
            this.handleInputChange('endWordsToDelete', e.target.value.split('\n'))}
        />

        <input
          type="number"
          value={this.state.maxTitleLength}
          onChange={e =>
            this.handleInputChange('maxTitleLength', e.target.value)}
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