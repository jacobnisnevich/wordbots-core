import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { NavLink } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import { logout } from '../util/firebase';

export default class NavMenu extends Component {
  static propTypes = {
    open: bool,
    user: object
  };

  renderLink(path, text, icon) {
    return (
      <NavLink exact to={path} activeClassName="activeNavLink">
        <MenuItem primaryText={text} leftIcon={
          <FontIcon className="material-icons">{icon}</FontIcon>
        }/>
      </NavLink>
    );
  }

  render() {
    const containerStyle = {top: 54, paddingTop: 10};

    if (this.props.user) {
      return (
        <Drawer open={this.props.open} containerStyle={containerStyle}>
          {this.renderLink('/', 'Home', 'home')}
          {this.renderLink('/collection', 'Collection', 'recent_actors')}
          {this.renderLink('/creator', 'Creator', 'add_circle_outline')}
          {this.renderLink('/decks', 'Decks', 'view_list')}
          {this.renderLink('/play', 'Play', 'videogame_asset')}
          <MenuItem
            primaryText={`Logout ${this.props.user.displayName}`}
            onClick={logout}
            leftIcon={<FontIcon className="material-icons">person</FontIcon>}/>
        </Drawer>
      );
    } else {
      return (
        <Drawer open={this.props.open} containerStyle={containerStyle}>
          {this.renderLink('/', 'Home', 'home')}
          {this.renderLink('/login', 'Login', 'person')}
          {this.renderLink('/collection', 'Collection', 'recent_actors')}
          {this.renderLink('/creator', 'Creator', 'add_circle_outline')}
          {this.renderLink('/decks', 'Decks', 'view_list')}
          {this.renderLink('/play', 'Play', 'videogame_asset')}
        </Drawer>
      );
    }
  }
}
