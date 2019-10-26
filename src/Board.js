import React from 'react';
import './index.css';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    getBoard() {
        const boardSize = 3;
        let board = [];
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let y = 0; y < boardSize; y++) {
                row.push(this.renderSquare(i + y * boardSize));
            }
            board.push(<div className="board-row">{row}</div>)
        }
        return board;
    }

    render() {
        return (
            <div>
                {this.getBoard()}
            </div>
        );
    }
}

export default Board;