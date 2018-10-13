import React, { Component } from 'react';
// import * as api from './api';
import SideBar from './component/side-bar';

const menuItems = [
  {
    title: '食品分类',
    icon: 'youzan',
    children: [
      {
        title: '鸡肉',
        href: '/food/chicken'
      },
      {
        title: '鸭肉',
        href: '/food/duck'
      }
    ]
  }
];

export default class App extends Component {
  componentDidMount() {
    // api.success();
    // api.failed();
    // api.error();
  }

  render() {
    return (
      <div>
        <SideBar menuItems={menuItems} />
      </div>
    );
  }
}
