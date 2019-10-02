import React from 'react';
import { TableContext } from 'components/Table/TableContainer';

const WithTableContext = Component => props => (
  <TableContext.Consumer>
    {consumer => <Component {...consumer} {...props}/>}
  </TableContext.Consumer>
);

export default WithTableContext;