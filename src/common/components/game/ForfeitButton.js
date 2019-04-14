import * as React from 'react';
import { string, bool, object, func } from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import { MAX_Z_INDEX } from '../../constants.ts';
import { opponent } from '../../util/game.ts';
import Tooltip from '../Tooltip.tsx';

export default class ForfeitButton extends React.Component {
  static propTypes = {
    player: string,
    gameOver: bool,
    history: object,
    isSpectator: bool,
    isTutorial: bool,

    onForfeit: func
  };

  handleClick = () => {
    this.props.onForfeit(opponent(this.props.player));

    if (this.props.isTutorial) {
      this.props.history.push('/play');
    }
  }

  render() {
    return (
      <Tooltip text="Forfeit" place="top" style={{ zIndex: MAX_Z_INDEX }}>
        <RaisedButton
          backgroundColor="#CCC"
          buttonStyle={{
            height: '64px',
            lineHeight: '64px'
          }}
          style={{
            borderRadius: 5,
            border: '2px solid #AAA',
            minWidth: 48,
            marginLeft: 10
          }}
          overlayStyle={{
            height: '64px'
          }}
          onClick={this.handleClick}
          icon={
            <FontIcon
              className="material-icons"
              style={{
                lineHeight: '64px',
                verticalAlign: 'none'
            }}>
              flag
            </FontIcon>
          }
          disabled={this.props.isSpectator || this.props.gameOver} />
      </Tooltip>
    );
  }
}
