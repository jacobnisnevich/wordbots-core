import React, { Component } from 'react';
import { array, bool, object, oneOfType, string } from 'prop-types';
import ReactTooltip from 'react-tooltip';

import { id } from '../util/common';

export default class Tooltip extends Component {
  static propTypes = {
    inline: bool,
    style: object,
    text: string.isRequired,
    children: oneOfType([array, object])
  };

  static defaultProps = {
    inline: false,
    style: {}
  }

  render() {
    const tooltipId = id();
    const SpanOrDiv = this.props.inline ? 'span' : 'div';

    return (
      <SpanOrDiv>
        <SpanOrDiv data-tip={this.props.text} data-for={tooltipId}>
          {this.props.children}
        </SpanOrDiv>
        <SpanOrDiv style={this.props.style}>
          <ReactTooltip id={tooltipId} />
        </SpanOrDiv>
      </SpanOrDiv>
    );
  }
}
