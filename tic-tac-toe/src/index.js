import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Represent a button view 
function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

// Represent a cluster of button view as a whole
class Board extends React.Component {
  renderSquare(i, j) {
    return <Square
      value={(this.props.squares)[i][j]}
      key={(i.toString()) + (j.toString())}
      onClick={() => this.props.onClick(i, j)}
    />;
  }

  // create one row view
  createRowGrid(row, column) {
    var grid = [];
    for (let j = 0; j < column; j++) {
      grid.push(this.renderSquare(row, j));
    }
    return (
      <div className="board-row" key={row}>
        {grid}
      </div>
    )
  }

  // return a matrix view
  render() {
    var grid = [];
    for (let i = 0; i < this.props.row; i++) {
      grid.push(this.createRowGrid(i, this.props.column));
    }

    return (
      <div>
        {grid}
      </div>
    );
  }
}

class Game extends React.Component {

  // handle update when user click the button
  handleClick(i, j) {
    const history = this.props.history.slice(0, this.props.step + 1)
    const currentS = (history[history.length - 1]);
    const squares = copyArrOfArr(currentS);
    if (calWin(this.props.row, this.props.column, squares) ||
      squares[i][j]) {
      return;
    }
    squares[i][j] = this.props.xIsNext ? 'X' : 'O';

    this.props.onClick(history.concat([squares]), !this.props.xIsNext, history.length);
  }

  jumpTo(index) {
    this.props.onClick(this.props.history, (index % 2) === 0, index);
  }

  render() {
    const history = this.props.history;
    const moves = history.map((_, index) => {
      const desc = index ? // if (0) is false
        'Go to move #' + index :
        'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    const currentS = history[this.props.step];
    const win = calWin(this.props.row, this.props.column, currentS);
    var status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O')
    if (win) {
      status = 'Winner: ' + win;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentS}
            row={this.props.row}
            column={this.props.column}
            onClick={(i, j) => this.handleClick(i, j)}
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

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 3,
      column: 3
    }

    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRowChange(event) {
    this.setState({ row: event.target.value });
  }

  handleColumnChange(event) {
    this.setState({ column: event.target.value });
  }

  handleSubmit(event) {
    this.props.onClick(this.state.row, this.state.column)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Choose m*n matrix for your tic tac toe games</label>
        <br />
        <br />
        <label>
          Row:
          <input type="number" name="row" value={this.state.row}
            onChange={this.handleRowChange} />
        </label>
        <label>
          Column:
          <input type="number" name="column" value={this.state.column}
            onChange={this.handleColumnChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 3,
      column: 3,
      history: [createMarix(3, 3)],
      xIsNext: true,
      step: 0,
    }
  }

  handleSubmit(i, j) {
    this.setState({
      row: i,
      column: j,
      history: [createMarix(i, j)],
      xIsNext: true,
      step: 0,
    });
  }

  handleClickOnGame(h, x, s) {
    this.setState({
      history: h,
      xIsNext: x,
      step: s,
    });
  }

  render() {
    return (
      [
        <Inputs
          key="1"
          onClick={(i, j) => this.handleSubmit(i, j)}
        />,
        <br
          key="2"
        />,
        <Game
          key="3"
          row={this.state.row}
          column={this.state.column}
          history={this.state.history}
          xIsNext={this.state.xIsNext}
          step={this.state.step}
          onClick={(h, x, s) => this.handleClickOnGame(h, x, s)}
        />
      ]
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
);

function createMarix(row, column) {
  var matrix = Array(row).fill(null);
  const aRow = Array(column).fill(null);

  for (let i = 0; i < row; i++) {
    matrix[i] = aRow.slice();
  }
  return matrix;
}

function winLines(row, column) {
  var lines = winLinesHon(row, column).concat(winLinesVer(row, column))

  if (row === column) {
    var diagnoal1 = Array(row).fill(null);
    var diagnoal2 = Array(row).fill(null);
    for (let i = 0; i < row; i++) {
      diagnoal1[i] = [i, i];
      diagnoal2[i] = [i, row - i - 1]
    }
    lines.push(diagnoal1);
    lines.push(diagnoal2);
  }

  return lines;
}

function winLinesHon(row, column) {
  var lines = Array(row).fill(null);
  var index = 0;

  for (let i = 0; i < row; i++) {
    var aRow = Array(column).fill(null);
    for (let j = 0; j < column; j++) {
      aRow[j] = [i, j]
    }
    lines[index] = aRow.slice();
    index += 1;
  }
  return lines;
}

function winLinesVer(row, column) {
  var lines = Array(column).fill(null);
  var index = 0;

  for (let i = 0; i < column; i++) {
    var aColumn = Array(row).fill(null);
    for (let j = 0; j < row; j++) {
      aColumn[j] = [j, i]
    }
    lines[index] = aColumn.slice();
    index += 1;
  }
  return lines;
}

function calWin(row, column, squares) {
  console.log(squares)

  const lines = winLines(row, column);
  var isSame = null;
  for (let i = 0; i < lines.length; i++) {
    let valueFirstEle = squares[(lines[i][0])[0]][(lines[i][0])[1]]
    if (valueFirstEle) {
      isSame = lines[i].every(ele => squares[ele[0]][ele[1]] === valueFirstEle);
      if (isSame) {
        return valueFirstEle;
      }
    }
  }
  return null;
}

function copyArrOfArr(arr) {
  var lines = Array(arr.length).fill(null);

  for (let i = 0; i < arr.length; i++) {
    lines[i] = arr[i].slice();
  }
  return lines;
}