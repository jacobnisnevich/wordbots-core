import React, { Component } from 'react';
import { number, string } from 'prop-types';
import Paper from 'material-ui/Paper';
import ReactTooltip from 'react-tooltip';

import { id, toProperCase, isHeadless } from '../../util/common';

export default class CardStat extends Component {
  static propTypes = {
    type: string,
    base: number,
    current: number,
    scale: number
  };

  get backgroundColor() {
    switch (this.props.type) {
      case 'attack':
        return '#E57373';
      case 'speed':
        return '#03A9F4';
      case 'health':
        return '#81C784';
    }
  }

  get textStyle() {
    if (this.props.current && this.props.current > this.props.base) {
      return {
        textColor: '#81C784',
        webkitTextStroke: '1px white'
      };
    } else if (this.props.current && this.props.current < this.props.base) {
      return {
        textColor: '#E57373',
        webkitTextStroke: '1px white'
      };
    } else {
      return {
        textColor: 'white',
        webkitTextStroke: 'none'
      };
    }
  }

  render() {
    const tooltipId = id();
    const { textColor, webkitTextStroke } = this.textStyle;

    const baseStyle = {
      width: 32 * (this.props.scale || 1),
      height: 32 * (this.props.scale || 1),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: this.backgroundColor,
      color: '#fff',
      fontFamily: 'Carter One',
      fontSize: 22 * (this.props.scale || 1)
    };

    const headlessStyle = {
      paddingTop: 10,
      textAlign: 'center',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontSize: 18
    };

    // Workaround for virtual DOM without flexbox support.
    const headlessContainerStyle = {
      float: 'left',
      marginRight: 6
    };

    return (
      <div style={isHeadless() ? headlessContainerStyle : {}}>
        <Paper circle
          zDepth={1}
          data-for={tooltipId}
          data-tip={toProperCase(this.props.type)}
          style={isHeadless() ? Object.assign(baseStyle, headlessStyle) : baseStyle}>
          <ReactTooltip id={tooltipId} />
          <div style={{
            lineHeight: '14px',
            WebkitTextStroke: webkitTextStroke,
            color: textColor
          }}>{this.props.current || this.props.base}</div>
        </Paper>
      </div>
    );
  }
}
