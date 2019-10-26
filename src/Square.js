import React from 'react';
import './index.css';

function Square(props) {
    return (
        <button className="square"
                style={{backgroundColor: props.color }}
                onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;