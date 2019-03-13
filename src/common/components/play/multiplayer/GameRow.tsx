import * as React from 'react';
import * as fb from 'firebase';
import Button from '@material-ui/core/Button';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';

import * as w from '../../../types';
import * as m from '../../../../server/multiplayer/multiplayer';
import { guestUID } from '../../../util/multiplayer';
import { GameFormat } from '../../../util/formats';

import { DisplayedGame } from './GameBrowser';

interface GameRowProps {
  game: DisplayedGame
  user: fb.User | null
  clientId: m.ClientID
  userDataByClientId: Record<m.ClientID, m.UserData>
  onCancelHostGame: () => void
  onJoinGame: (id: string, name: string, format: GameFormat, options: w.GameOptions) => void
  onSpectateGame: (id: m.ClientID, name: string) => void
}

export default class GameRow extends React.Component<GameRowProps> {
  get myUID(): string {
    const { clientId, user } = this.props;
    if (user) {
      return user.uid;
    } else {
      return guestUID(clientId);
    }
  }

  get isMyGame(): boolean {
    const { game, userDataByClientId } = this.props;
    return game.players.some((clientId) =>
      userDataByClientId[clientId] && userDataByClientId[clientId].uid === this.myUID
    );
  }

  public render(): JSX.Element {
    const { game } = this.props;
    return (
      <TableRow key={game.id} selected={this.isMyGame}>
        <TableRowColumn>{game.name}</TableRowColumn>
        <TableRowColumn>{GameFormat.decode(game.format).displayName}</TableRowColumn>
        <TableRowColumn>{game.players.map(this.renderPlayerName).join(', ')}</TableRowColumn>
        <TableRowColumn>{(game.spectators || []).map(this.renderPlayerName).join(', ')}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right'}}>
          {this.renderButtons()}
        </TableRowColumn>
      </TableRow>
    );
  }

  private handleJoinGame = () => {
    const { game: { id, name, format, options }, onJoinGame } = this.props;

    onJoinGame(id, name, GameFormat.decode(format), options);
  }

  private handleSpectateGame = () => {
    const { game, onSpectateGame } = this.props;
    onSpectateGame(game.id, game.name);
  }

  private renderPlayerName = (clientId: m.ClientID) => {
    const { userDataByClientId } = this.props;
    const userData = userDataByClientId[clientId];
    if (userData) {
      return (userData.uid === this.myUID) ? 'Me' : userData.displayName;
    } else {
      return clientId;
    }
  }

  private renderButtons = () => {
    const { game } = this.props;
    if (!this.isMyGame) {
      return (game.players.length === 1) ?
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleJoinGame}
          title={game.options.passwordToJoin ? 'This game requires a password to join.' : ''}
        >
          Join Game
          {game.options.passwordToJoin &&
            <FontIcon
              className="material-icons"
              color="white"
              style={{ marginLeft: 5 }}
            >
              vpn_key
            </FontIcon>
          }
        </Button> :
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSpectateGame}
        >
          Spectate Game
        </Button>;
    } else {
      return (
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.props.onCancelHostGame}
        >
          Cancel Game
        </Button>
      );
    }
  }
}
