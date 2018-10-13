import React, { Component } from 'react';
import Board from './Board';

function calcWinner(board) {
  const winRules = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let rule of winRules) {
    const [a, b, c] = rule;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return false;
}

const startState = {
  currentSign: 'O',
  playRecord: [],
  playHistory: [Array(9).fill('')],
  winner: null
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '井字棋游戏DEMO',
      ...startState
    };
  }

  resetGame = () => {
    this.setState(startState);
  };

  /**
   * 回退一步
   *
   * @memberof Game
   */
  historyBack = () => {
    let history = this.state.playHistory.slice(),
      records = this.state.playRecord.slice();
    history.pop();
    records.pop();
    this.setState({
      currentSign: this.state.currentSign === 'X' ? 'O' : 'X',
      playHistory: history,
      playRecord: records
    });
  };

  /**
   * 下一步
   *
   * @param {Number} i
   * @memberof Game
   */
  changeSquareItem = i => {
    if (this.state.winner || this.state.playHistory[this.state.playHistory.length - 1][i]) {
      return;
    }

    let records = this.state.playRecord.slice(),
      history = this.state.playHistory.slice(),
      list = history[history.length - 1].slice();

    list[i] = this.state.currentSign;
    records.push({
      player: this.state.currentSign,
      pos: [(i / 3) >> 0, i % 3]
    });
    history.push(list);
    const winner = calcWinner(list);

    this.setState({
      currentSign: this.state.currentSign === 'X' ? 'O' : 'X',
      playRecord: records,
      playHistory: history,
      winner: winner
    });
  };

  render() {
    const squareList = this.state.playHistory[this.state.playHistory.length - 1];
    return (
      <div>
        <h1 className="game-title">{this.state.title}</h1>
        <div className="game-main">
          <Board
            squareList={squareList}
            currentSign={this.state.currentSign}
            changeSquareItem={this.changeSquareItem}
          />
          <ol className="game-detail">
            {this.state.playRecord.map((record, index) => (
              <li key={'record-' + index}>
                payer {record.player} put sign on [{record.pos.join(',')}]
              </li>
            ))}
            {this.state.winner ? (
              <p>
                <a href="javascript:;" onClick={this.resetGame}>
                  重新开始
                </a>
                <br />游戏结束，胜者是玩家{this.state.winner}
              </p>
            ) : (
              <p>
                <a href="javascript:;" onClick={this.historyBack}>
                  回退一步
                </a>
                <br />玩家 {this.state.currentSign} 正在思考中...
              </p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
