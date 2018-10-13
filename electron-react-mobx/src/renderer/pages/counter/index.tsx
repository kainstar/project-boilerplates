import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Stores, CounterStore } from '../../store';

import styles from './style.scss';

export interface ICounterProps extends RouteComponentProps<{}> {
  counter: CounterStore;
}

@inject<Stores, {}, {}, {}>((store) => {
  return {
    counter: store.counter,
  };
})
@observer
export default class Counter extends Component<ICounterProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props.counter;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment} data-tclass="btn">
            <i className="fa fa-plus" />
          </button>
          <button className={styles.btn} onClick={decrement} data-tclass="btn">
            <i className="fa fa-minus" />
          </button>
          <button className={styles.btn} onClick={incrementIfOdd} data-tclass="btn">odd</button>
          <button className={styles.btn} onClick={incrementAsync} data-tclass="btn">async</button>
        </div>
      </div>
    );
  }
}
