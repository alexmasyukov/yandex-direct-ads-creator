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

class TitleGenerator extends Component {
  state = {
    maxTitleLength: 20,
    deleteNeedless: [
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
    ],
    addNeedless: [
      '! Недорого!',
      '! Дешево!',
      '!'
    ]
  }

  get displayValueHandlers() {
    return {
      c1: dataGridHandlers.highlightMaxLength(this.state.maxTitleLength),
      c2: dataGridHandlers.deleteNeedless(this.state.maxTitleLength, this.state.deleteNeedless),
      c3: dataGridHandlers.addNeedless(this.state.maxTitleLength, this.state.addNeedless)
    }
  }

  get valueHandlers() {
    return {
      c2: dataGridHandlers.deleteNeedless(this.state.maxTitleLength, this.state.deleteNeedless)
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

        <input
          type="number"
          value={this.state.maxTitleLength}
          onChange={e =>
            this.handleInputChange('maxTitleLength', e.target.value)}
        />

        <textarea
          cols="30"
          rows="10"
          value={this.state.deleteNeedless.join('\n')}
          onChange={e =>
            this.handleInputChange('deleteNeedless', e.target.value.split('\n'))}
        />

        <textarea
          cols="30"
          rows="10"
          value={this.state.addNeedless.join('\n')}
          onChange={e =>
            this.handleInputChange('addNeedless', e.target.value.split('\n'))}
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

export default TitleGenerator;