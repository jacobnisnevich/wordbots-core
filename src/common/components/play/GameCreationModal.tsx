import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { History } from 'history';
import * as React from 'react';

import * as w from '../../types';

import PreGameModal from './PreGameModal';

interface GameCreationModalProps {
  availableDecks: w.DeckInStore[]
  cards: w.CardInStore[]
  sets: w.Set[]
  allCards: w.CardInStore[]
  title: string
  onCreateGame: (gameName: string, formatName: w.Format, deck: w.DeckInGame, options: w.GameOptions) => void
  history: History
}

interface GameCreationModalState {
  gameName: string
  options: w.GameOptions
}

export default class GameCreationModal extends React.Component<GameCreationModalProps, GameCreationModalState> {
  public state = {
    gameName: '',
    options: {
      disableTurnTimer: false,
      passwordToJoin: undefined
    }
  };

  public render(): JSX.Element {
    const { availableDecks, cards, sets, allCards, history, title } = this.props;
    const { gameName } = this.state;

    return (
      <PreGameModal
        mode="host"
        title={title}
        availableDecks={availableDecks}
        cards={cards}
        sets={sets}
        allCards={allCards}
        history={history}
        onStartGame={this.handleCreateGame}
        gameName={gameName}
      >
        {this.renderForm()}
      </PreGameModal>
    );
  }

  private handleSetGameName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gameName: e.currentTarget.value });
  }

  private handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordToJoin = e.currentTarget.value || undefined;
    this.setState((state) => ({
      options: { ...state.options, passwordToJoin }
    }));
  }

  private handleSetDisableTurnTimer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const disableTurnTimer = e.currentTarget.checked;
    this.setState((state) => ({
      options: { ...state.options, disableTurnTimer }
    }));
  }

  private handleCreateGame = (format: w.Format, deck: w.DeckInGame) => {
    const { gameName, options } = this.state;
    this.props.onCreateGame(gameName, format, deck, options);
    this.setState({ gameName: '' });
  }

  private renderForm = () => {
    const { gameName, options: { disableTurnTimer, passwordToJoin } } = this.state;
    return [
      (
        <TextField
          key="gameName"
          error={gameName === ''}
          helperText={gameName === '' ? 'The game name cannot be empty!' : ''}
          style={{ width: '100%' }}
          value={gameName}
          label="Game Name"
          onChange={this.handleSetGameName}
        />
      ),
      (
        <TextField
          key="passwordToJoin"
          style={{ width: '100%', marginBottom: 10 }}
          value={passwordToJoin || ''}
          label="Password to join (empty = no password)"
          onChange={this.handleSetPassword}
        />
      ),
      (
        <FormControlLabel
          key="disableTurnTimer"
          control={
            <Checkbox
              checked={disableTurnTimer}
              onChange={this.handleSetDisableTurnTimer}
            />
          }
          label="Disable Turn Timer?"
        />
      )
    ];
  }
}
