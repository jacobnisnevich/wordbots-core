import React, { Component } from 'react';
import { func, number } from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

export default class LayoutControls extends Component {
  static propTypes = {
    layout: number,
    onSetLayout: func
  };

  shouldComponentUpdate(newProps) {
    return (newProps.layout !== this.props.layout);
  }

  get baseIconStyle() {
    return {
      fontSize: 36,
      padding: 10,
      borderRadius: 3,
      boxShadow: '1px 1px 3px #CCC',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      marginRight: 10
    };
  }

  renderButton(layout, iconName) {
    const selected = (this.props.layout === layout);
    return (
      <FontIcon
        className="material-icons"
        style={{
          ...this.baseIconStyle,
          color: selected ? 'white' : 'black',
          backgroundColor: selected ? '#F44336' : '#EEEEEE'
        }}
        onClick={() => { this.props.onSetLayout(layout); }}
      >
        {iconName}
      </FontIcon>
    );
  }

  render() {


    return (
      <div>
        <div style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 20
        }}>Layout</div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 20
        }}>
          {this.renderButton(0, 'view_module')}
          {this.renderButton(1, 'view_list')}
        </div>
      </div>
    );
  }
}
