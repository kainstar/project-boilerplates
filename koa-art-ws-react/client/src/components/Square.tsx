import React, { PureComponent } from 'react';
import classnames from 'classnames';

export default class Square extends PureComponent<any> {
  setSquareValue() {
    this.props.onClick();
  }

  render() {
    const buttonClass = classnames('square', {
      'square-o': this.props.value === 'O',
      'square-x': this.props.value === 'X',
    });
    return (
      <button
        className={buttonClass}
        onClick={() => {
          this.setSquareValue();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}
