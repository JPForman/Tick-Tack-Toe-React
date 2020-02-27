import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game'
import { createStore } from "redux";
import { Provider } from "react-redux";
import calculateWinner from './components/calculateWinner'

const initialState = {
  history: [{ squares: Array(9).fill(null)}],
  stepNumber: 0,
  xIsNext: true
}

function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case 'TAKE_TURN':
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[action.location]) {
      return state;
    }
    squares[action.location] = state.xIsNext ? 'X' : 'O';
    newState = {
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    };
      return newState;
    case 'TIME_TRAVEL':
      newState = Object.assign({}, state, { stepNumber: action.step, xIsNext: (action.step % 2) === 0,})

      return newState;
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
