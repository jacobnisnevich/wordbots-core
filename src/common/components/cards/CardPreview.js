import React, { Component } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import ReactTooltip from 'react-tooltip';

import { id } from '../../util';
import Card from '../game/Card';

class CardPreview extends Component {
  renderSentence(s) {
    function renderWord(word) {
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
    }

    function renderStatusIcon() {
      const treeUrl = `https://wordbots.herokuapp.com/parse?input=${encodeURIComponent(s.sentence)}&format=svg`;
      if (s.result.js) {
        return (
          <a href={treeUrl} target="_blank">
            <FontIcon
              className="material-icons"
              style={{verticalAlign: 'top', color: 'green'}}
              data-for="error-tooltip"
              data-tip="Click to view parse tree">
                code
            </FontIcon>
            <ReactTooltip
              id="error-tooltip"
              place="top"
              type="dark"
              effect="float" />
          </a>
        );
      } else if (s.result.error) {
        return (
          <span>
            <FontIcon
              className="material-icons"
              style={{verticalAlign: 'top', color: 'red'}}
              data-for="error-tooltip"
              data-tip={s.result.error}>
                error_outline
            </FontIcon>
            <ReactTooltip
              id="error-tooltip"
              place="top"
              type="dark"
              effect="float" />
          </span>
        );
      }
    }

    if (/\S/.test(s.sentence)) {
      const color = s.result.js ? 'green' : (s.result.error ? 'red' : 'black');
      return (
        <span key={id()} style={{color: color}}>
          {s.sentence.split(' ').map(renderWord)}.
          { renderStatusIcon() }
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
          name={this.props.name || '[Unnamed]'}
          spriteID={this.props.spriteID}
          onSpriteClick={this.props.onSpriteClick}
          type={this.props.type}
          img={'char'}
          cost={this.props.energy}
          stats={{
            attack: this.props.attack,
            speed: this.props.speed,
            health: this.props.health
          }}
          cardStats={{
            attack: this.props.attack,
            speed: this.props.speed,
            health: this.props.health
          }}
          text={this.props.sentences.map(this.renderSentence)}
          rawText={this.props.sentences.map(s => s.sentence).join('. ')}
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
  attack: React.PropTypes.number,
  speed: React.PropTypes.number,
  health: React.PropTypes.number,
  energy: React.PropTypes.number,

  onSpriteClick: React.PropTypes.func
};

export default CardPreview;
