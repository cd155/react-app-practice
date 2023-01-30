import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
      <button 
        className="square"
        onClick = {() => props.onClick()}
        >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        row: props.row,
        column: props.column,
        squares: createMarix(props.row,props.column),
        xIsNext: true,
      };
    }
    
    handleClick(i,j){
      const squares = this.state.squares.slice();
      if(calWin(this.state.row,this.state.column,squares) || squares[i][j]){
        return;
      }
      
      squares[i][j] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    
    renderSquare(i,j) {
      return <Square 
               value={this.state.squares[i][j]}
               key ={(i.toString()) + (j.toString())}
               onClick={() => this.handleClick(i,j)}
             />;
    }
    
    createRowGrid(row,column){
      var grid = [];
      for(let j = 0; j < column; j++){
        grid.push(this.renderSquare(row,j));
      }
      return(
        <div className="board-row" key={row}>
          {grid}
        </div> 
      )
    }
  
    render() {
      var grid = [];
      for(let i = 0; i < this.state.row; i++){
        grid.push(this.createRowGrid(i, this.state.column));
      }
  
      const win = calWin(this.state.row,this.state.column,this.state.squares);
      var status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      if(win){
        status = 'Winner: ' + win;
      }
      return (
        <div>
          <div className="status">{status}</div>
            {grid}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board row={9} column={6}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */"test"}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function createMarix(row, colum){
    var matrix = Array(row).fill(null);
    const aRow = Array(colum).fill(null);
    
    for (let i = 0; i < row; i++) {
      matrix[i] = aRow.slice();
    }
    return matrix;
  }
  
  function winLines(row, column){
    var lines = winLinesHon(row,column).concat(winLinesVer(row,column))
    
    if (row === column){
      var diagnoal1 = Array(row).fill(null);
      var diagnoal2 = Array(row).fill(null);
      for (let i = 0; i < row; i++) {
        diagnoal1[i] = [i,i];
        diagnoal2[i] = [i,row-i-1]
      }
      lines.push(diagnoal1);
      lines.push(diagnoal2);
    }
  
    return lines;
  }
  
  function winLinesHon(row, column){
    var lines = Array(row).fill(null);
    var index = 0;
    
    for (let i = 0; i < row; i++) {
      var aRow = Array(column).fill(null);
      for (let j = 0; j < column; j++) {
        aRow[j] = [i,j] 
      }
      lines[index] = aRow.slice();
      index += 1;
    }
    return lines;
  }
  
  function winLinesVer(row, column){
    var lines = Array(column).fill(null);
    var index = 0;
  
    for (let i = 0; i < column; i++) {
      var aColumn = Array(row).fill(null);
      for (let j = 0; j < row; j++) {
        aColumn[j] = [j,i] 
      }
      lines[index] = aColumn.slice();
      index += 1;
    }
    return lines;
  }
  
  function calWin(row, column, squares){
    const lines = winLines(row, column);
    var isSame = null;
    for (let i = 0; i < lines.length; i++) {
      var firstEle = lines[i][0];
      var valueFirstEle = squares[firstEle[0]][firstEle[1]]
      if(valueFirstEle){
        isSame = lines[i].every(ele => squares[ele[0]][ele[1]] === valueFirstEle);
        if(isSame){
          return valueFirstEle;
        }
      }
    }
    return null;
  }
  