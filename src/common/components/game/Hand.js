import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';

import { getCost } from '../../util';

import Card from './Card';


class Hand extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.availableWidth = ReactDOM.findDOMNode(this).offsetWidth;
  }

  render() {
    const widthPerCard = 175;
    const maxWidth = this.availableWidth;
    const numCards = this.props.cards.length;
    const baseWidth = numCards * widthPerCard;
    const cardMargin = (maxWidth && maxWidth < baseWidth) ? (maxWidth - baseWidth) / (numCards - 1) : 0;

    const cards = this.props.cards.map((card, index) => (
      <Card
        onCardClick={e => { this.props.onSelectCard(index); }}
        onCardHover={e => { this.props.onHoverCard(e.type === 'mouseenter' ? index : null); }}
        key={card.id}
        numCards={numCards}
        status={this.props.status}
        name={card.name}
        type={card.type}
        text={card.text || ''}
        img={card.img}
        cost={getCost(card)}
        baseCost={card.baseCost}
        cardStats={card.stats}
        stats={{}}
        scale={1}
        cardMargin={index < numCards - 1 ? cardMargin : 0}
        rotation={(index - (numCards - 1)/2) * 5}
        yTranslation={Math.abs((numCards - 1)/2 - index) * 10}
        selected={this.props.selectedCard === index && _.isEmpty(this.props.targetableCards)}
        hovered={this.props.hoveredCard === index}
        targetable={this.props.targetableCards.includes(card.id)}
        visible={this.props.isCurrentPlayer} />
    ));

    return (
      <ReactCSSTransitionGroup
        transitionName="hand"
        transitionEnterTimeout={500}
        transitionLeave={false}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
        {cards}
      </ReactCSSTransitionGroup>
    );
  }
}

Hand.propTypes = {
  cards: React.PropTypes.array,
  isCurrentPlayer: React.PropTypes.bool,
  onSelectCard: React.PropTypes.func,
  onHoverCard: React.PropTypes.func,
  selectedCard: React.PropTypes.number,
  hoveredCard: React.PropTypes.number,
  targetableCards: React.PropTypes.array,
  status: React.PropTypes.object
};

export default Hand;
