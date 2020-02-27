import React from 'react';
import Board from './Board'
import { connect } from 'react-redux'
import calculateWinner from './calculateWinner'


class Game extends React.Component {

  handleClick(i) {
    this.props.dispatch({type: 'TAKE_TURN', location: i})
  }

  jumpTo(step) {
    this.props.dispatch({type: 'TIME_TRAVEL', step: step})
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      console.log(step);
      console.log('move ' + move);
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }



    return (
      <div className="game">
      <div className="game-board">
      <Board
      squares={current.squares}
      onClick={(i) => this.handleClick(i)}
      />
      </div>
      <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
      history: state.history,
      stepNumber: state.stepNumber,
      xIsNext: state.xIsNext
});

export default connect(mapStateToProps)(Game);
