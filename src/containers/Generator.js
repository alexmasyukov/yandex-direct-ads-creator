import React, { Component } from 'react';
import DataGrid from "containers/DataGrid"
import * as Util from 'utils/util'
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
    maxTitleLength: 33
  }

  handleInputChange = (e, stateKey) => {
    this.setState({
      [stateKey]: e.target.value
    })
  }

  componentDidMount() {
    // const test = generateSimpleRows(10);
    //
    //
    // console.log(Util.normalized(test));

  }

  render() {
    const valueHandlers = {
      // c1: Util.highlightMaxLength(this.state.maxTitleLength)
    }

    const displayValueHandlers = {
      c1: Util.highlightMaxLength(this.state.maxTitleLength)
    }

    return (
      <div>
        <p>{Util.highlightMaxLength(this.state.maxTitleLength)('посредники таобао дешевая доставка в россию')}</p>

        <input
          type="number"
          value={this.state.maxTitleLength}
          onChange={(e) => this.handleInputChange(e, 'maxTitleLength')}
        />

        <DataGrid
          columns={columns}
          rows={generateSimpleRows(1000)}
          valueHandlers={valueHandlers}
          displayValueHandlers={displayValueHandlers}
        />
      </div>
    );
  }
}

export default Generator;