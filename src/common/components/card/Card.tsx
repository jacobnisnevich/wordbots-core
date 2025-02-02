import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import { isEqual, noop } from 'lodash';
import * as React from 'react';
import Highlighter from 'react-highlight-words';
import Textfit from 'react-textfit';

import { TYPE_CORE, TYPE_EVENT, TYPE_ROBOT, TYPE_STRUCTURE, typeToString } from '../../constants';
import { isCardVisible } from '../../guards';
import * as w from '../../types';
import { inBrowser } from '../../util/browser';
import { compareCertainKeys } from '../../util/common';
import SpinningGears from '../SpinningGears';
import Tooltip from '../Tooltip';

import CardBack from './CardBack';
import CardCostBadge from './CardCostBadge';
import CardImage from './CardImage';
import CardStat from './CardStat';
import RaritySymbol from './RaritySymbol';
import Sentence from './Sentence';

export interface CardProps {
  children?: string | JSX.Element[]

  id?: string
  name: string
  spriteID?: string
  spriteV?: number
  type: w.CardType
  text: string | Array<JSX.Element | null>
  rawText: string
  highlightedTextBlocks?: string[]
  showSpinner?: boolean
  flavorText?: string
  img?: string
  cardStats: Partial<Record<w.Attribute, number | undefined>>
  stats: Partial<Record<w.Attribute, number | undefined>>
  cost: number
  baseCost?: number
  source: w.CardSource
  collection?: boolean
  rarityInSet?: w.CardInSetRarity  // (rarity exists only for cards in sets, and only if enabled by the set owner)

  visible: boolean
  status?: {
    message: string
    type: 'text' | 'error' | ''
  }
  selected?: boolean
  targetable?: boolean
  drafting?: boolean

  scale?: number
  margin?: number
  rotation?: number
  yTranslation?: number
  zIndex?: number
  overrideContainerStyles?: CSSProperties

  onCardClick?: (id: string) => void
  onCardHover?: (enterOrLeave: boolean) => void
  onSpriteClick?: () => void
}

interface CardState {
  shadow: number
  showingFlavorText: boolean
}

export class Card extends React.Component<CardProps & WithStyles, CardState> {
  public static styles: Record<string, CSSProperties> = {
    headerTitle: {
      lineHeight: 'normal'
    },
    headerSubtitle: {
      lineHeight: 1
    }
  }

  public static fromObj = (card: w.PossiblyObfuscatedCard & { rarity?: w.CardInSetRarity }, props: Partial<CardProps> = {}): JSX.Element => (
    isCardVisible(card)
      ? (
        <CardWithStyles
          visible
          id={card.id}
          name={card.name}
          spriteID={card.spriteID}
          spriteV={card.spriteV}
          img={card.img}
          type={card.type}
          text={Sentence.fromText(card.text)}
          rawText={card.text || ''}
          highlightedTextBlocks={card.highlightedTextBlocks}
          flavorText={card.flavorText}
          stats={card.stats || {}}
          cardStats={card.stats || {}}
          cost={card.cost}
          baseCost={card.cost}
          source={card.metadata.source}
          rarityInSet={card.rarity}
          {...props}
        />
      ) : <CardBack />
  )

  public state = {
    shadow: 2,
    showingFlavorText: false
  };

  public shouldComponentUpdate(nextProps: CardProps, nextState: CardState): boolean {
    const trackedProps = [
      'name', 'spriteID', 'type', 'rawText', 'showSpinner',
      'cardStats', 'stats', 'image', 'cost', 'baseCost',
      'status', 'visible', 'selected', 'targetable',
      'margin', 'zIndex'
    ];

    return !compareCertainKeys(nextProps, this.props, trackedProps) || !isEqual(nextState, this.state);
  }

  get numChars(): number {
    const { text, rawText } = this.props;
    return rawText ? rawText.length : text.length;
  }

  get textAreaStyle(): React.CSSProperties {
    const { scale, type } = this.props;
    const baseStyle = {
      position: 'relative',
      height: 106 * (scale || 1)
    } as React.CSSProperties;

    const compactStyle = {
      height: 96 * (scale || 1),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (type === TYPE_EVENT && this.numChars < 30) {
      return { ...baseStyle, ...compactStyle };
    } else {
      return baseStyle;
    }
  }

  get textFitStyle(): React.CSSProperties {
    const { type, scale } = this.props;
    const { showingFlavorText } = this.state;

    const baseStyle: React.CSSProperties = {
      padding: Math.floor(6 * (scale || 1)),
      paddingBottom: 0,
      height: Math.floor((type !== TYPE_EVENT ? 70 : 90) * (scale || 1)),
      width: '100%',
      boxSizing: 'border-box'
    };

    const compactStyle: React.CSSProperties = {
      paddingBottom: 6 * (scale || 1),
      height: '50%',
      textAlign: 'center'
    };

    if (type === TYPE_EVENT && this.numChars < 30 && !showingFlavorText) {
      return { ...baseStyle, ...compactStyle };
    } else {
      return baseStyle;
    }
  }

  public render(): JSX.Element {
    const {
      name, spriteID, spriteV, type, img, cost, baseCost, source, collection, flavorText,
      showSpinner, status, visible, selected, targetable, rarityInSet, drafting,
      scale, margin, rotation, yTranslation, overrideContainerStyles,
      onSpriteClick, classes
    } = this.props;
    const blueShadow = 'rgba(0, 120, 135, 0.45)';
    const redShadow = 'rgba(255, 35, 35, 0.45)';
    const greenShadow = 'rgba(27, 134, 27, 0.95)';
    const selectedStyle = {
      boxShadow: `${collection ? blueShadow : ((status?.type === 'error') ? redShadow : greenShadow)} 0px 0px 5px 5px`
    };
    // In drafting mode, draw a border and shadow around the card if rarity > common
    const rarityBorderColor: string | undefined = drafting && ((rarityInSet === 'rare' && '#d4af37') || (rarityInSet === 'uncommon' && '#aaa9ad')) || undefined;
    const transform = `rotate(${rotation || 0}deg) translate(0px, ${yTranslation || 0}px)`;

    if (!visible) {
      return (
        <div
          style={{
            padding: '24px 0 12px 0',
            marginRight: margin,
            transform
          }}
        >
          <CardBack />
        </div>
      );
    } else {
      return (
        <div
          style={{
            padding: '24px 0 12px 0',
            marginRight: margin,
            transform,
            ...(overrideContainerStyles || {})
          }}
        >
          <CardCostBadge
            cost={cost}
            baseCost={baseCost || cost}
            scale={scale || 1}
          >
            <div
              onClick={this.handleClick}
              onMouseOver={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <Paper
                elevation={this.state.shadow}
                style={{
                  width: 140 * (scale || 1),
                  height: 211 * (scale || 1),
                  marginRight: 10 * (scale || 1),
                  borderRadius: 5 * (scale || 1),
                  userSelect: 'none',
                  cursor: 'pointer',
                  border: rarityBorderColor ? `3px solid ${rarityBorderColor}` : (source?.type === 'builtin' ? '3px solid #aaa' : '3px solid #007887'),
                  position: 'relative',
                  boxShadow: rarityBorderColor ? `${rarityBorderColor} 0px 0px 10px 0px` : undefined,
                  ...(selected || targetable ? selectedStyle : {})
                } as React.CSSProperties}
              >
                <CardHeader
                  key={`${name}_${type}_${flavorText}`}
                  style={{ padding: 8 * (scale || 1), height: 'auto' }}
                  title={this.renderTitle()}
                  subheader={
                    <span style={{ fontSize: 14 * (scale || 1) }}>
                      {typeToString(type)}
                      {rarityInSet && (
                        <div style={{
                          position: 'absolute',
                          right: 6 * (scale || 1),
                          top: 28 * (scale || 1)
                        }}>
                          <RaritySymbol rarity={rarityInSet} scale={(scale || 1) * 1.2} />
                        </div>
                      )}
                      {flavorText && <Tooltip inline text="Show/hide flavor text" place="left" className="card-part-tooltip">
                        <Icon
                          className="material-icons"
                          onClick={this.handleToggleFlavorText}
                          style={{
                            marginTop: 4 * (scale || 1),
                            marginRight: rarityInSet ? 22 * (scale || 1) : undefined,
                            fontSize: 16 * (scale || 1),
                            color: '#999',
                            float: 'right'
                          }}
                        >
                          menu_book
                        </Icon>
                      </Tooltip>}
                    </span>
                  }
                  classes={{
                    title: classes.headerTitle,
                    subheader: classes.headerSubtitle
                  }}
                />


                <Divider style={{ margin: '-1px 0px 0px' }} />

                <CardImage
                  type={type}
                  spriteID={spriteID || name}
                  spriteV={spriteV}
                  img={img}
                  source={source}
                  scale={scale || 1}
                  onSpriteClick={onSpriteClick || noop}
                />

                <Divider style={{ margin: '-1px 0px 0px' }} />

                <div style={this.textAreaStyle}>
                  {showSpinner && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 0,
                      opacity: 0.5
                    }}>
                      <div style={{ margin: 'auto', marginTop: 10 * (scale || 1), width: 150, height: 150 }}>
                        <SpinningGears />
                      </div>
                    </div>
                  )}
                  {this.renderText()}
                  {this.renderStatsArea()}
                </div>
              </Paper>
            </div>
          </CardCostBadge>
        </div>
      );
    }
  }

  private handleClick = () => {
    const { id, onCardClick } = this.props;
    if (id && onCardClick) {
      onCardClick(id);
    }
  }

  private handleToggleFlavorText = (evt: React.MouseEvent<Element>) => {
    evt.stopPropagation();
    evt.preventDefault();

    // Toggle flavor text; make sure that it's back to real text in 20 sec.
    this.setState((state) => ({ showingFlavorText: !state.showingFlavorText }));
    setTimeout(() => {
      this.setState({ showingFlavorText: false });
    }, 20 * 1000);
  }

  private handleMouseEnter = () => {
    const { onCardHover } = this.props;
    this.setState({ shadow: 3 });
    if (onCardHover) {
      onCardHover(true);
    }
  }

  private handleMouseLeave = () => {
    const { onCardHover } = this.props;
    this.setState({ shadow: 2 });
    if (onCardHover) {
      onCardHover(false);
    }
  }

  private renderTitle(): React.ReactNode {
    const { name, scale } = this.props;

    if (!inBrowser()) {
      return name;
    }

    return (
      <Textfit
        mode="multi"
        autoResize={false}
        max={16 * (scale || 1)}
        style={{
          width: 105 * (scale || 1),
          height: 23 * (scale || 1)
        }}
      >
        {name}
      </Textfit>
    );
  }

  private renderText(): React.ReactNode {
    const { highlightedTextBlocks, flavorText, rawText, text, scale } = this.props;
    const { showingFlavorText } = this.state;

    if (!inBrowser()) {
      return text;
    } else if (showingFlavorText) {
      return (
        <Textfit
          autoResize={false}
          mode="multi"
          max={14 * (scale || 1)}
          // Reduce height of this Textfit slightly to be on the safe side,
          // because the Carter One font behaves a little badly
          style={{ ...this.textFitStyle, height: (this.textFitStyle.height as number) - 5 }}
        >
          <span style={{ fontFamily: 'Carter One, Carter One-fallback' }}>{flavorText}</span>
        </Textfit>
      );
    } else {
      return (
        <Textfit
          autoResize={false}
          mode="multi"
          max={14 * (scale || 1)}
          style={this.textFitStyle}
        >
          {
            highlightedTextBlocks
              ? <Highlighter
                autoEscape
                textToHighlight={rawText}
                searchWords={highlightedTextBlocks}
                highlightStyle={{ color: 'green', fontWeight: 'bold', backgroundColor: 'inherit' }}
                unhighlightStyle={{ color: 'black' }}
              />
              : text
          }
        </Textfit>
      );
    }
  }

  private renderStat(type: w.Attribute): JSX.Element {
    const { cardStats, stats, scale } = this.props;
    return (
      <CardStat type={type} base={(cardStats || {})[type]} current={(stats || {})[type]} scale={scale} />
    );
  }

  private renderStatsArea(): JSX.Element | undefined {
    const { scale, stats, type } = this.props;
    const style: React.CSSProperties = {
      position: 'absolute',
      bottom: 4 * (scale || 1),
      width: '100%',
      padding: 0
    };

    // Render all stats for robots or for other objects that have attack and/or speed set
    // Render just health for other objects
    if (type === TYPE_ROBOT || (stats.attack || stats.speed)) {
      return (
        <CardContent style={style}>
          {this.renderStat('attack')}
          {this.renderStat('health')}
          {this.renderStat('speed')}
        </CardContent>
      );
    } else if (type === TYPE_CORE || type === TYPE_STRUCTURE) {
      return (
        <CardContent style={{ ...style, marginLeft: '31%' }}>
          {this.renderStat('health')}
        </CardContent>
      );
    }
  }
}

const CardWithStyles = withStyles(Card.styles)(Card);

export default CardWithStyles;
