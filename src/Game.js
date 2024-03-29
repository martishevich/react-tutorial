import React from 'react';
import './index.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                columnId: null,
                rowId: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            isAsc: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                rowId: this.getRow(i),
                columnId: this.getColumn(i),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    getBoardSize() {
        return 3;
    }

    getStatusOfGame(winner) {
        const isGameFinished = this.state.stepNumber === 9;
        if (isGameFinished) {
            return 'Draw';
        }
        return winner ? `Winner: ${winner}` : `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    getRow(i) {
        return Math.floor(i / this.getBoardSize());
    }

    getColumn(i) {
        return i % this.getBoardSize();
    }

    changeOrder() {
        this.setState({
            isAsc: !this.state.isAsc
    });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const winnerSquares = winner ? getHighlight(current.squares) : [];

        let moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            const isCurrentMoveSelected = move === this.state.stepNumber;
            const buttonStyle = { fontWeight: isCurrentMoveSelected ? 'bold' : 'normal' };
            const position = step.columnId !== null && step.rowId !== null
                ? `column: ${step.columnId} row: ${step.rowId}`
                : '';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} style={ buttonStyle }>
                        {desc} {position}
                    </button>
                </li>
            );
        });
        const orderDesc = this.state.isAsc ? 'Asc' : 'Desc';
        if (!this.state.isAsc) {
            moves = moves.reverse();
        }
        const status = this.getStatusOfGame(winner);
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerSquares={winnerSquares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        <button onClick={() => this.changeOrder()}>sort order</button>
                        {orderDesc}
                    </div>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;

function getLines() {
    return [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
}

function getHighlight(squares) {
    const lines = getLines();
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a]
            && squares[a] === squares[b]
            && squares[a] === squares[c]
        ) {
            return lines[i];
        }
    }
}

function calculateWinner(squares) {
    const lines = getLines();
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a]
            && squares[a] === squares[b]
            && squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}