import React, { Component } from 'react';
import { array, bool, func, object } from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { sortBy } from 'lodash';

import { TYPE_ROBOT, TYPE_EVENT, TYPE_STRUCTURE } from '../constants';
import { groupCards } from '../util/cards';
import CardViewer from '../components/card/CardViewer';
import * as collectionActions from '../actions/collection';

function mapStateToProps(state) {
  return {
    decks: state.collection.decks,
    sidebarOpen: state.global.sidebarOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateDeck: () => {
      dispatch(collectionActions.editDeck(null));
    },
    onDeleteDeck: (deckId) => {
      dispatch(collectionActions.deleteDeck(deckId));
    },
    onEditDeck: (deckId) => {
      dispatch(collectionActions.editDeck(deckId));
    }
  };
}

class Decks extends Component {
  static propTypes = {
    decks: array,
    sidebarOpen: bool,

    history: object,

    onCreateDeck: func,
    onDeleteDeck: func,
    onEditDeck: func
  };

  constructor(props) {
    super(props);

    this.state = {
      hoveredCard: null
    };
  }

  onHover(card) {
    this.setState({hoveredCard: {card: card, stats: card.stats}});
  }

  renderCard(card, idx) {
    const isHovered = this.state.hoveredCard && this.state.hoveredCard.card.id === card.id;

    return (
      <div
        key={idx}
        onMouseOver={e => this.onHover(card)}
        style={{
          backgroundColor: isHovered ? '#eee' : '#fff',
          marginBottom: 7,
          display: 'flex',
          alignItems: 'stretch',
          height: 24,
          minWidth: 200
      }}>
        <Badge
          badgeContent={card.cost}
          badgeStyle={{backgroundColor: '#00bcd4', fontFamily: 'Carter One', color: 'white', marginRight: 10}}
          style={{padding: 0, width: 24, height: 24 }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: 'calc(100% - 24px)'
        }}>{card.name}</div>
        <div style={{
          width: 20,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold'
        }}>{card.count > 1 ? `${card.count}x` : ''}</div>
      </div>
    );
  }

  renderCards(cards) {
    return sortBy(groupCards(cards), ['cost', 'name']).map(this.renderCard.bind(this));
  }

  renderDeck(deck) {
    const robots = deck.cards.filter(c => c.type === TYPE_ROBOT);
    const structures = deck.cards.filter(c => c.type === TYPE_STRUCTURE);
    const events = deck.cards.filter(c => c.type === TYPE_EVENT);

    return (
      <Paper key={deck.name} style={{marginRight: 20, marginBottom: 20, padding: 10}}>
        <div style={{
          marginBottom: 15,
          fontSize: 32,
          fontWeight: 100
        }}>{deck.name}</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <RaisedButton
            label="Edit"
            primary
            onClick={() => {
              this.props.onEditDeck(deck.id);
              this.props.history.push('/deck');
            }}
            style={{marginRight: 10, width: '100%'}} />
          <RaisedButton
            label="Delete"
            disabled={deck.id === '[default]'}
            onClick={e => { this.props.onDeleteDeck(deck.id); }}
            primary
            style={{width: '100%'}}/>
        </div>

        <div style={{padding: '0 10px 10px 10px'}}>
          <div style={{float: 'left', marginRight: 30}}>
            <h4 style={{
              margin: '20px 0 20px -10px'
            }}>Robots ({robots.length})</h4>
            {this.renderCards(robots)}
          </div>

          <div style={{float: 'left'}}>
            <h4 style={{
              margin: '20px 0 20px -10px'
            }}>Structures ({structures.length})</h4>
            {this.renderCards(structures)}

            <h4 style={{
              margin: '20px 0 20px -10px'
            }}>Events ({events.length})</h4>
            {this.renderCards(events)}
          </div>
        </div>
      </Paper>
    );
  }

  render() {
    return (
      <div style={{height: '100%', paddingLeft: this.props.sidebarOpen ? 256 : 0}}>
        <Helmet title="Decks" />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{marginTop: 50, marginLeft: 40}}>
            <RaisedButton
              label="New Deck"
              secondary
              style={{margin: 10}}
              labelStyle={{fontFamily: 'Carter One'}}
              onClick={() => {
                this.props.onCreateDeck();
                this.props.history.push('/deck');
              }} />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              width: '100%',
              margin: 10
            }}>
              {
                this.props.decks.map(this.renderDeck.bind(this))
              }
            </div>
          </div>

          <div style={{
            margin: 50,
            marginLeft: 0,
            width: 220,
            height: 300,
            position: 'relative'
          }}>
            <CardViewer hoveredCard={this.state.hoveredCard} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Decks));
