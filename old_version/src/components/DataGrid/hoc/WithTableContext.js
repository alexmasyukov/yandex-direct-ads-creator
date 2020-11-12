import React from 'react';
import { TableContext } from '../context/TableContext'

const WithTableContext = Component => props => (
  <TableContext.Consumer>
    {consumer => <Component {...consumer} {...props}/>}
  </TableContext.Consumer>
);

export default WithTableContext;