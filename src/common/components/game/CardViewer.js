import React, { Component, PropTypes } from 'react';

import Card from './Card';

class CardViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let card = null;

    if (this.props.card) {
      card = (
        <Card
          onCardClick={() => {}}
          name={this.props.card.name}
          cost={this.props.card.cost}
          cardStats={this.props.card.stats}
          selected={false}
          visible />
      );
    }

    return (
      <div style={{
        position: 'absolute',
        left: 10,
        top: 0,
        bottom: 0,
        margin: 'auto',
        height: 236
      }}>
        {card}
      </div>
    );
  }
}

CardViewer.propTypes = {
  card: React.PropTypes.object
}

export default CardViewer;
