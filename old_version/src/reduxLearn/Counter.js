import React from 'react';
import { connect } from 'react-redux'
import { add, addAsync, addNumber } from "reduxLearn/redux/actions/actions";

const Counter = ({
                   counter1,
                   counter2,
                   onAddCounter1,
                   onAddNumberCounter1,
                   onChangeCounter2,
                   onAsyncAction
                 }) => {
  return (
    <div>
      <div>
        Counter1 {counter1}
        <button onClick={onAddCounter1}>+1</button>
        <button onClick={() => onAddNumberCounter1(1)}>+</button>
        <button onClick={() => onAddNumberCounter1(-1)}>-</button>
      </div>
      <br/>
      <div>
        Counter2 {counter2}
        <button onClick={() => onChangeCounter2(+1)}>+</button>
        <button onClick={() => onChangeCounter2(-1)}>-</button>
      </div>

      <button onClick={() => onAsyncAction(100)}>+100 Async</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    counter1: state.counter1.counter,
    counter2: state.counter2.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddCounter1: () => dispatch(add()),
    onAddNumberCounter1: (number) => dispatch(addNumber(number)),
    onChangeCounter2: (number) => dispatch({
      type: 'CHANGE2',
      payload: number
    }),
    onAsyncAction: number => dispatch(addAsync(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);