import * as React from 'react';
import { connect } from 'react-redux';
import { Prompt, RouteComponentProps, withRouter } from 'react-router';

import * as gameActions from '../actions/game';
import * as socketActions from '../actions/socket';
import GameArea, { GameProps } from '../components/game/GameArea';
import { AI_RESPONSE_TIME_MS, ANIMATION_TIME_MS } from '../constants';
import { isCardVisible } from '../guards';
import { defaultTarget } from '../store/defaultGameState';
import * as w from '../types';
import { shuffleCardsInDeck } from '../util/decks';
import { animate } from '../util/common';
import { currentPlayerHasNoValidActions, currentTutorialStep } from '../util/game';
import { inTest } from '../util/browser';
import { GameFormat } from '../util/formats';

import { baseGameUrl, urlForGameMode } from './Play';

type GameAreaStateProps = GameProps & {
  started: boolean
};

interface GameAreaDispatchProps {
  onMoveRobot: (fromHexId: w.HexId, toHexId: w.HexId) => void
  onAttackRobot: (sourceHexId: w.HexId, targetHexId: w.HexId) => void
  onMoveRobotAndAttack: (fromHexId: w.HexId, toHexId: w.HexId, targetHexId: w.HexId) => void
  onAttackRetract: () => void
  onAttackComplete: () => void
  onActivateObject: (abilityIdx: number) => void
  onPlaceRobot: (tileHexId: w.HexId, cardIdx: number) => void
  onSelectCard: (index: number, player: w.PlayerColor) => void
  onSelectCardInDiscardPile: (cardId: w.CardId, player: w.PlayerColor) => void
  onSelectTile: (hexId: w.HexId, player: w.PlayerColor) => void
  onDeselect: (player: w.PlayerColor) => void
  onPassTurn: (player: w.PlayerColor) => void
  onEndGame: () => void
  onForfeit: (winner: w.PlayerColor) => void
  onLeave: () => void
  onStartTutorial: () => void
  onStartSandbox: () => void
  onTutorialStep: (back?: boolean) => void
  onStartPractice: (format: w.BuiltInFormat, deck: w.CardInStore[]) => void
  onAIResponse: () => void
  onSendChatMessage: (msg: string) => void
  onAddCardToHand: (player: w.PlayerColor, card: w.Card) => void
  onDraftCards: (player: w.PlayerColor, cards: w.CardInGame[]) => void
  onSetVolume: (volume: number) => void
  onOfferDraw: (player: w.PlayerColor) => void
  onRetractDrawOffer: (player: w.PlayerColor) => void
}

export type GameAreaContainerProps = GameAreaStateProps & GameAreaDispatchProps & RouteComponentProps;

interface GameAreaContainerState {
  interval?: NodeJS.Timeout
  message: string | null
}

export function mapStateToProps(state: w.State): GameAreaStateProps {
  const { game } = state;

  const currentPlayer = game.players[game.currentTurn];
  const activePlayer: w.PlayerInGameState | null =
    game.player === 'neither' ? null : (game.sandbox ? currentPlayer : game.players[game.player]);
  const currentPlayerSelectedCard: w.PossiblyObfuscatedCard | null =
    currentPlayer.selectedCard !== null ? currentPlayer.hand[currentPlayer.selectedCard] : null;

  return {
    started: game.started,
    player: game.player,
    currentTurn: game.currentTurn,
    usernames: game.usernames,
    disconnectedPlayers: game.disconnectedPlayers,
    winner: game.winner,
    gameOptions: game.options,
    draft: game.draft,
    format: GameFormat.decode(game.gameFormat),
    joinedInProgressGame: game.joinedInProgressGame,

    selectedTile: activePlayer?.selectedTile || null,
    selectedCard: activePlayer ? activePlayer.selectedCard : null,
    playingCardType: currentPlayerSelectedCard && isCardVisible(currentPlayerSelectedCard) ? currentPlayerSelectedCard.type : null,

    status: activePlayer?.status || { message: '', type: '' },
    target: activePlayer?.target || defaultTarget(),
    attack: game.attack,

    blueHand: game.players.blue.hand,
    orangeHand: game.players.orange.hand,

    bluePieces: game.players.blue.objectsOnBoard,
    orangePieces: game.players.orange.objectsOnBoard,

    blueEnergy: game.players.blue.energy,
    orangeEnergy: game.players.orange.energy,

    blueDeck: game.players.blue.deck,
    orangeDeck: game.players.orange.deck,

    blueDiscardPile: game.players.blue.discardPile,
    orangeDiscardPile: game.players.orange.discardPile,

    eventQueue: game.eventQueue,
    sfxQueue: game.sfxQueue,
    tutorialStep: currentTutorialStep(game),
    isPractice: game.practice,
    volume: game.volume,

    gameOver: game.winner !== null,
    isPaused: game.disconnectedPlayers.length > 0,
    isTutorial: game.tutorial,
    isSandbox: game.sandbox,
    isMyTurn: game.currentTurn === game.player,
    isMyTurnAndNoActionsLeft: game.currentTurn === game.player && currentPlayerHasNoValidActions(game),
    isSpectator: game.player === 'neither',
    isAttackHappening: !!game.attack?.from && !!game.attack?.to,
    isWaitingForParse: game.numParsesInFlight > 0,
    drawOffers: game.drawOffers,

    actionLog: game.actionLog,
    collection: state.collection,
    socket: state.socket
  };
}

export function mapDispatchToProps(dispatch: w.MultiDispatch): GameAreaDispatchProps {
  return {
    onMoveRobot: (fromHexId: w.HexId, toHexId: w.HexId) => {
      dispatch(gameActions.moveRobot(fromHexId, toHexId));
    },
    onAttackRobot: (sourceHexId: w.HexId, targetHexId: w.HexId) => {
      animate([
        () => dispatch(gameActions.attack(sourceHexId, targetHexId)),
        () => dispatch(gameActions.attackRetract()),
        () => dispatch(gameActions.attackComplete())
      ], ANIMATION_TIME_MS);
    },
    onMoveRobotAndAttack: (fromHexId: w.HexId, toHexId: w.HexId, targetHexId: w.HexId) => {
      animate([
        () => dispatch(gameActions.moveRobot(fromHexId, toHexId)),
        () => dispatch(gameActions.attack(toHexId, targetHexId)),
        () => dispatch(gameActions.attackRetract()),
        () => dispatch(gameActions.attackComplete())
      ], ANIMATION_TIME_MS);
    },
    onAttackRetract: () => {
      dispatch(gameActions.attackRetract());
    },
    onAttackComplete: () => {
      dispatch(gameActions.attackComplete());
    },
    onActivateObject: (abilityIdx: number) => {
      dispatch(gameActions.activateObject(abilityIdx));
    },
    onPlaceRobot: (tileHexId: w.HexId, cardIdx: number) => {
      dispatch(gameActions.placeCard(tileHexId, cardIdx));
    },
    onSelectCard: (index: number, player: w.PlayerColor) => {
      dispatch(gameActions.setSelectedCard(index, player));
    },
    onSelectCardInDiscardPile: (cardId: w.CardId, player: w.PlayerColor) => {
      dispatch(gameActions.setSelectedCardInDiscardPile(cardId, player));
    },
    onSelectTile: (hexId: w.HexId, player: w.PlayerColor) => {
      dispatch(gameActions.setSelectedTile(hexId, player));
    },
    onDeselect: (player: w.PlayerColor) => {
      dispatch(gameActions.deselect(player));
    },
    onPassTurn: (player: w.PlayerColor) => {
      dispatch(gameActions.passTurn(player));
    },
    onEndGame: () => {
      dispatch(gameActions.endGame());
    },
    onForfeit: (winner: w.PlayerColor) => {
      dispatch([
        socketActions.forfeit(winner),
        socketActions.leave()
      ]);
    },
    onLeave: () => {
      dispatch(socketActions.leave());
    },
    onStartTutorial: () => {
      dispatch(gameActions.startTutorial());
    },
    onStartSandbox: () => {
      dispatch(gameActions.startSandbox());
    },
    onTutorialStep: (back?: boolean) => {
      dispatch(gameActions.tutorialStep(back));
    },
    onStartPractice: (format: w.BuiltInFormat, deck: w.CardInStore[]) => {
      dispatch(gameActions.startPractice(format, deck));
    },
    onAIResponse: () => {
      dispatch(gameActions.aiResponse());
    },
    onSendChatMessage: (msg: string) => {
      dispatch(socketActions.chat(msg));
    },
    onAddCardToHand: (player: w.PlayerColor, card: w.Card) => {
      dispatch(gameActions.addCardToHand(player, card));
    },
    onDraftCards: (player: w.PlayerColor, cards: w.CardInGame[]) => {
      dispatch(gameActions.draftCards(player, cards));
    },
    onSetVolume: (volume: number) => {
      dispatch(gameActions.setVolume(volume));
    },
    onOfferDraw: (player: w.PlayerColor) => {
      dispatch(gameActions.offerDraw(player));
    },
    onRetractDrawOffer: (player: w.PlayerColor) => {
      dispatch(gameActions.retractDrawOffer(player));
    }
  };
}

// GameAreaContainer handles all dispatch and routing logic for the GameArea component.
export class GameAreaContainer extends React.Component<GameAreaContainerProps, GameAreaContainerState> {
  constructor(props: GameAreaContainerProps) {
    super(props);
    this.state = {
      interval: setInterval(this.performAIResponse, AI_RESPONSE_TIME_MS),
      message: null
    };
  }

  public componentDidMount(): void {
    window.addEventListener('beforeunload', this.handleWindowBeforeUnload);

    this.tryToStartGame();
  }

  public componentWillUnmount(): void {
    const { isTutorial, isPractice, isSandbox, isSpectator } = this.props;
    const { interval } = this.state;

    window.removeEventListener('beforeunload', this.handleWindowBeforeUnload);

    if (interval) {
      clearInterval(interval);
    }

    // Leaving the page leaves the game in single-player modes or as a spectator
    if (isTutorial || isPractice || isSandbox || isSpectator) {
      this.handleLeaveGame();
    }
  }

  public render(): JSX.Element {
    return (
      <>
        {!inTest && <Prompt
          when={this.shouldWarnBeforeLeavingPage}
          message="Are you sure you want to leave the game?"
        />}
        <GameArea
          {...this.props}
          message={this.state.message}
          onClickGameArea={this.handleClickGameArea}
          onClickEndGame={this.handleClickEndGame}
          onNextTutorialStep={this.handleNextTutorialStep}
          onPrevTutorialStep={this.handlePrevTutorialStep}
          onSelectTile={this.onSelectTile}
        />
      </>
    );
  }

  private get shouldWarnBeforeLeavingPage(): boolean {
    const { gameOver, isPractice, isSandbox, isSpectator, isTutorial } = this.props;
    return !gameOver && !isSpectator && !isPractice && !isTutorial && !isSandbox;
  }

  private urlMatchesGameMode = (mode: string) => this.props.location.pathname.startsWith(urlForGameMode(mode));

  private handleWindowBeforeUnload = (event: Event) => {
    if (this.shouldWarnBeforeLeavingPage) {
      // https://stackoverflow.com/a/25763325
      event = event || window.event;
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      (event as { returnValue: unknown }).returnValue = '';
      return '';
    }
  }

  // Try to start a game (based on the URL) if it hasn't started yet.
  private tryToStartGame = () => {
    const {
      started,
      onStartTutorial,
      onStartSandbox,
      history,
      match
    } = this.props;
    const params = (match ? match.params : {}) as Record<string, string | undefined>;

    // If the game hasn't started yet*, that means that the player got here
    // by messing with the URL (rather than by clicking a button in the lobby).
    // If the URL is '/play/tutorial' or `/play/practice/:deck`,
    // start the corresponding game mode.
    // Otherwise, just return to the lobby.
    if (!started) {
      if (this.urlMatchesGameMode('tutorial')) {
        onStartTutorial();
      } else {
        // Wait until we retrieve data from Firebase so we can get
        // username and deck list.
        this.setState({ message: null });
        if (this.urlMatchesGameMode('practice') && params.format && params.deck) {
          this.tryToStartPracticeGame(params.format as w.BuiltInFormat, params.deck);
        } else if (this.urlMatchesGameMode('sandbox')) {
          onStartSandbox();
        } else {
          history.push(baseGameUrl);
        }
      }
    }
  }

  // Try to start a practice game from the URL.
  private tryToStartPracticeGame = (formatName: w.BuiltInFormat, deckId: w.DeckId) => {
    const { history, onStartPractice, collection: { cards, decks, sets } } = this.props;
    const deck = decks.find((d) => d.id === deckId);

    if (deck) {
      onStartPractice(formatName, shuffleCardsInDeck(deck, cards, sets));
    } else {
      history.push(baseGameUrl);
    }
  }

  private handleLeaveGame = () => {
    const { isSandbox, isTutorial, onEndGame, onLeave, winner } = this.props;

    onEndGame();
    if (!winner && !isSandbox && !isTutorial) {
      onLeave();
    }
  }

  private performAIResponse = () => {
    const { currentTurn, isPractice, winner, onAIResponse, onAttackRetract, onAttackComplete } = this.props;
    if (isPractice && !winner && currentTurn === 'blue') {
      animate([
        onAIResponse,
        onAttackRetract,
        onAttackComplete
      ], ANIMATION_TIME_MS);
    }
  }

  private movePiece = (hexId: w.HexId) => {
    const { selectedTile, onMoveRobot } = this.props;
    if (selectedTile) {
      onMoveRobot(selectedTile, hexId);
    }
  }

  private attackPiece = (hexId: w.HexId, intermediateMoveHexId: w.HexId | null) => {
    const { selectedTile, onAttackRobot, onMoveRobotAndAttack } = this.props;

    if (!selectedTile) {
      return;
    }

    if (intermediateMoveHexId) {
      onMoveRobotAndAttack(selectedTile, intermediateMoveHexId, hexId);
    } else {
      onAttackRobot(selectedTile, hexId);
    }
  }

  private placePiece = (hexId: w.HexId) => {
    const { selectedCard, onPlaceRobot } = this.props;
    if (selectedCard !== null) {
      onPlaceRobot(hexId, selectedCard);
    }
  }

  private onSelectTile = (hexId: w.HexId, action: 'move' | 'attack' | 'place' | null = null, intermediateMoveHexId: w.HexId | null = null) => {
    const { attack, currentTurn, isSandbox, player, onSelectTile } = this.props;

    if (player === 'neither') {
      return;  // Spectators can't select tiles.
    } else if (attack) {
      return;  // Can't move/attack while an attack is in progress.
    } else if (action === 'move') {
      this.movePiece(hexId);
    } else if (action === 'attack') {
      this.attackPiece(hexId, intermediateMoveHexId);
    } else if (action === 'place') {
      this.placePiece(hexId);
    } else {
      onSelectTile(hexId, isSandbox ? currentTurn : player);
    }
  }

  private handleClickGameArea = (evt: React.MouseEvent<HTMLElement | SVGElement>) => {
    const { player, onDeselect } = this.props;
    const { className } = evt.target as HTMLElement | SVGElement;

    // Not sure why this is necessary... (maybe SVG elts have className.baseVal and HTML elts don't? -AN)
    const { baseVal } = className;
    const actualClassName = baseVal !== undefined ? baseVal : className;

    if (player !== 'neither' && actualClassName.includes('background')) {
      onDeselect(player);
    }
  }

  private handleClickEndGame = () => {
    const { history } = this.props;
    this.handleLeaveGame();
    // We can't just do history.goBack() because we may have gotten here
    // from outside of Wordbots and we don't want to leave the site.
    if (history.location.state?.previous) {
      history.push(history.location.state.previous.pathname);
    } else {
      history.push('/play');
    }
  }

  private handleNextTutorialStep = () => {
    this.props.onTutorialStep();
  }

  private handlePrevTutorialStep = () => {
    this.props.onTutorialStep(true);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameAreaContainer));
