import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import styles from './style.scss';

export default class HomePage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
