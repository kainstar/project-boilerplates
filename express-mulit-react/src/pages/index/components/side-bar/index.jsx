import React, {Component} from 'react';
import { Menu, Icon } from 'zent';
import './style.scss';

const { MenuItem, SubMenu } = Menu;

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  onClickMenuItem = (ev) => {
    console.log(ev);
  }

  renderTitle = (menuItem) => {
    if (menuItem.icon && menuItem.icon.length > 0) {
      return <span><Icon type={menuItem.icon} />{menuItem.title}</span>;
    }
    return <span>{menuItem.title}</span>;
  }

  renderMenuItem = (menuItem, key) => {
    if (menuItem.children) {
      return <SubMenu key={key} title={this.renderTitle(menuItem)}>{menuItem.children.map((subMenuItem, subKey) => this.renderMenuItem(subMenuItem, `${key}-${subKey}`))}</SubMenu>;
    }
    return <MenuItem key={key}>{this.renderTitle(menuItem)}</MenuItem>;
  }

  render() {
    return (
      <div className="side-bar">
        <div className="side-bar-toggle-wrapper">
          <div className="side-bar-toggle">
            <span className="side-bar-toggle-line"></span>
            <span className="side-bar-toggle-line"></span>
            <span className="side-bar-toggle-line"></span>
          </div>
        </div>
        <Menu mode="inline" onClick={this.onClickMenuItem}>
          {this.props.menuItems.map(this.renderMenuItem)}
        </Menu>
      </div>
    );
  }
}
