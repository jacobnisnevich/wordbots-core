import React, { Component } from 'react';
import { array, element, func } from 'prop-types';

import { inBrowser } from '../../util/common';
import { splitSentences } from '../../util/cards';
import Card from '../card/Card';
import Sentence from '../card/Sentence';

export default class CardGrid extends Component {
  static propTypes = {
    children: element,
    cards: array,
    selectedCardIds: array,

    onCardClick: func
  };

  renderCard(card) {
    return (
      <div
        key={card.id}
        style={{
          marginRight: 15
      }}>
        <Card
          collection
          id={card.id}
          name={card.name}
          spriteID={card.spriteID}
          type={card.type}
          text={splitSentences(card.text).map(Sentence)}
          rawText={card.text || ''}
          stats={card.stats}
          cardStats={card.stats}
          cost={card.cost}
          baseCost={card.cost}
          source={card.source}
          selected={(this.props.selectedCardIds || []).includes(card.id)}
          onCardClick={this.props.onCardClick} />
      </div>
    );
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
        margin: 10
      }}>
        {this.props.children}
        {!inBrowser() ? null : this.props.cards.map(this.renderCard.bind(this))}
      </div>
    );
  }
}

