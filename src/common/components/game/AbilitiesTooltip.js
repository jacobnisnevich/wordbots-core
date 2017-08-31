import React, { Component } from 'react';
import { array, func, object, oneOfType } from 'prop-types';
import Popover from 'react-popover';
import RaisedButton from 'material-ui/RaisedButton';

export default class AbilitiesTooltip extends Component {
  static propTypes = {
    children: oneOfType([array, object]),
    activatedAbilities: array,

    onActivateAbility: func
  };

  get styles() {
    return {
      container: {
        zIndex: 99999
      },
      tooltip: {
        width: 330,
        borderRadius: '3px',
        padding: 10,
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px'
      }
    };
  }

  get tooltipBody() {
    return (
      <div style={this.styles.tooltip}>
        {
          this.props.activatedAbilities.map((ability, idx) =>
            <div key={idx}>
              <RaisedButton
                label={`Activate: ${ability.text}.`}
                onClick={() => { this.props.onActivateAbility(idx); }} />
            </div>
          )
        }
      </div>
    );
  }

  render() {
    return (
      <Popover
        isOpen
        style={this.styles.container}
        tipSize={15}
        body={this.tooltipBody}
        refreshIntervalMs={50}
        preferPlace="right"
      >
        {this.props.children}
      </Popover>
    );
  }
}
