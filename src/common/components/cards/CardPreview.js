import React, { Component } from 'react';

import Card from '../game/Card';

class CardPreview extends Component {
  renderSentence(s) {
    function id() {
      return Math.random().toString(36).slice(2, 16);
    }

    if (/\S/.test(s.sentence)) {
      const color = s.result.js ? 'green' : (s.result.error ? 'red' : 'black');
      return (
        <span key={id()} style={{color: color}}>
          {s.sentence.split(' ').map(word => {
            if ((s.result.unrecognizedTokens || []).includes(word.toLowerCase())) {
              return (
                <span key={id()}>
                  {' '}<u>{word}</u>
                </span>
              );
            } else {
              return (
                <span key={id()}>
                  {' '}{word}
                </span>
              );
            }
          })}.
        </span>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 64}}>
        <Card
          name={this.props.name}
          spriteID={this.props.spriteID}
          onSpriteClick={this.props.onSpriteClick}
          type={this.props.type}
          img={'char'}
          cost={1}
          stats={{
            attack: 1,
            speed: 1,
            health: 1
          }}
          cardStats={{
            attack: 1,
            speed: 1,
            health: 1
          }}
          text={this.props.sentences.map(this.renderSentence)}
          visible
          scale={3} />
      </div>
    );
  }
}

CardPreview.propTypes = {
  name: React.PropTypes.string,
  spriteID: React.PropTypes.string,
  type: React.PropTypes.number,
  sentences: React.PropTypes.array,

  onSpriteClick: React.PropTypes.func
};

export default CardPreview;
