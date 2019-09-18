import React from 'react';
import { DataGridContext } from 'containers/DataGrid';

const WithTableContext = Component => props => (
  <DataGridContext.Consumer>
    {consumer => <Component {...consumer} {...props}/>}
  </DataGridContext.Consumer>
);

export default WithTableContext;