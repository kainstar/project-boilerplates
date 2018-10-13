import React, { PureComponent } from 'react';
import Square from './Square';

export default class Board extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSquare(value, index) {
    return (
      <Square
        value={value}
        onClick={() => {
          this.props.changeSquareItem(index);
        }}
      />
    );
  }

  render() {
    return (
      <ul className="squareList">
        {this.props.squareList.map((value, index) => {
          return <li key={index}>{this.renderSquare(value, index)}</li>;
        })}
      </ul>
    );
  }
}
