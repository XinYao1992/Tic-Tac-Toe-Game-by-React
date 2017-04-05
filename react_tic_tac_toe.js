// https://facebook.github.io/react/tutorial/tutorial.html
// class Square extends React.Component {
//   render() {
//     return (
//         <button className="square" onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//     );
//   }
// }


// it has the same functionality as above
function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history : [{squares : Array(9).fill(null)}], 
      stepNumber : 0,
      xIsNext : true,
    }
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = (this.state.xIsNext) ? 'X' : 'O';
    this.setState({
      history : history.concat([{squares : squares}]),
      xIsNext : !this.state.xIsNext,
      stepNumber : this.state.stepNumber+1
    });
  }

  jumpTo(step){
    var editHistory = this.state.history.slice();// copy history
    editHistory.splice(step+1, (editHistory.length-step-1));// （staring_index(included), number_of_elements_to_remove）

    this.setState({
      stepNumber : step,
      xIsNext : (step % 2 == 0) ? true : false,
      history : editHistory,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; // the most recently board
    const winner = calculateWinner(current.squares);

    let status;
    if(winner){
      status = "Winner is: " + winner + " !!!";
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((move, step) => {
      const descp = step ? 'Move #' + step : 'Game start';
      return (
        <li key={step}>
          <a href="#" onClick={() => this.jumpTo(step)}>{descp}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} onClick={(i) => this.handleClick(i)}
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

// =========================================================================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
