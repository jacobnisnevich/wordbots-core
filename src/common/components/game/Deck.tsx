import * as React from 'react';

import * as w from '../../types';
import CardBack from '../card/CardBack';
import Tooltip from '../Tooltip';

interface DeckProps {
  deck: w.PossiblyObfuscatedCard[]
}

export default class Deck extends React.Component<DeckProps> {
  public render(): JSX.Element {
    const { deck } = this.props;

    if (deck.length > 0) {
      return (
        <Tooltip
          text={`${deck.length} ${deck.length === 1 ? 'card' : 'cards'}`}
          style={{ fontFamily: '"Carter One", "Carter One-fallback"' }}
        >
          <CardBack deckLength={deck.length} />
        </Tooltip>
      );
    } else {
      return (
        <div
          style={{
            width: 140,
            height: 200,
            borderRadius: 5,
            border: '2px dashed #DDD',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              margin: 'auto',
              fontFamily: '"Carter One", "Carter One-fallback"',
              fontSize: 32,
              textAlign: 'center',
              color: '#CCC'
            }}
          >
            NO CARDS LEFT
          </div>
        </div>
      );
    }
  }
}
