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
    constructor(props){
        super(props);
        this.state = {
            history: [createMarix(props.row,props.column)],
            xIsNext: true,
            step: 0,
        }
    }
    
    // handle update when user click the button
    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.step + 1)
        const currentS = (history[history.length -1]);
        const squares = copyArrOfArr(currentS);
        if(calWin(this.props.row, this.props.column, squares) || 
           squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([squares]),
            xIsNext: !this.state.xIsNext,
            step: history.length,
        });
    }

    jumpTo(index){
        this.setState({  
            step: index,
            xIsNext: (index % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const moves = history.map((step, index) => {
            const desc = index ? // if (0) is false
                'Go to move #' + index :
                'Go to game start';
            return (
                <li key={index}>
                <button onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
            );
        });

        const currentS = history[this.state.step];
        const win = calWin(this.props.row, this.props.column, currentS);
        var status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game 
                row={3} 
                column={3}
            />);

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

function copyArrOfArr(arr){
    var lines = Array(arr.length).fill(null);

    for (let i = 0; i < arr.length; i++) {
        lines[i] = arr[i].slice();
    }
    return lines;
}