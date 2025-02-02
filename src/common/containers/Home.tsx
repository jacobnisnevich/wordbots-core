import { History } from 'history';
import { truncate } from 'lodash';
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Background from '../components/Background';
import RecentCardsCarousel from '../components/cards/RecentCardsCarousel';
import RouterDialog from '../components/RouterDialog';
import SplashSection from '../components/SplashSection';
import Tooltip from '../components/Tooltip';
import { FIREBASE_CONFIG, HEADER_HEIGHT, PARSER_URL } from '../constants';
import * as w from '../types';
import { isFlagSet, onLocalhost } from '../util/browser';
import TermsOfUseDialog from '../components/help/TermsOfUseDialog';

interface HomeStateProps {
  version: string
}

export function mapStateToProps(state: w.State): HomeStateProps {
  return {
    version: state.version
  };
}

type HomeProps = HomeStateProps & { history: History };

class Home extends React.Component<HomeProps> {
  public render(): JSX.Element {
    const { history, version: versionAndSha } = this.props;
    const [version, sha] = versionAndSha.split('+');
    const shaTruncated = truncate(sha, { length: 8, omission: '' });

    return (
      <div>
        <Helmet title="Home" />
        <Background asset="compressed/arena_draft.jpg" opacity={0.1} style={{ top: HEADER_HEIGHT, backgroundPositionY: '20%' }} />

        <div style={{ margin: '24px 72px 36px' }}>
          <div
            style={{
              margin: '20px auto',
              maxWidth: 700,
              textAlign: 'center',
              fontSize: 24,
              color: '#666'
            }}
          >
            <div>
              Welcome to
              <span
                style={{
                  fontFamily: '"Carter One", "Carter One-fallback"',
                  color: '#f44336',
                  WebkitTextStroke: '1px black',
                  fontSize: 28
                }}
              >&nbsp;Wordbots</span>
              , a tactical card game where you craft your own cards and use them to fight in fast-paced arena battles.
            </div>
            <div style={{ marginTop: 10, fontSize: '0.85em' }}>
              All<Tooltip inline text="OK, technically, there are some built-in cards provided to start with.">*</Tooltip>
              {' '}cards are player-made and no two games are the same!
            </div>
          </div>

          <div id="homePageSplash">
            <SplashSection
              title="Craft Cards!"
              imgPath="/static/splash-workshop.png"
              onClick={this.handleClickWorkshop}
            >
              Making cards in the Workshop is as easy as writing text. A magical algorithm will turn it into code for you.
            </SplashSection>
            <SplashSection
              title="Build Decks!"
              imgPath="/static/splash-decks.png"
              onClick={this.handleClickDecks}
            >
              Put together decks of 30 cards to bring to the Arena.<br />
              Or, assemble your deck on the spot in Draft mode.
            </SplashSection>
            <SplashSection
              title="Battle it Out!"
              imgPath="/static/splash-play.png"
              onClick={this.handleClickArena}
            >
              {"The cards take life in fast-paced positional battles in the Arena. Destroy your opponent's Kernel to win!"}
            </SplashSection>
          </div>

          <div>
            <div
              style={{
                marginTop: 20,
                color: '#999',
                fontSize: 20,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}
            >
              Most recently created cards
            </div>
            <RecentCardsCarousel numCards={30} history={history} />
          </div>

          <div style={{ width: '100%', textAlign: 'center', marginTop: '1em', paddingBottom: '2em', fontSize: '0.85em', color: '#666' }}>
            © 2015–2023 Wordbots team.{' '}
            <a className="underline" onClick={this.handleClickTermsOfUse}>Terms of use.</a>
          </div>

          {
            !isFlagSet('skipNewHere') &&
            <div className="new-here-robot" onClick={this.handleClickNewHere}>
              <div className="speech-bubble" style={{ fontFamily: '"Carter One", "Carter One-fallback"', fontSize: 20, color: '#f44336', WebkitTextStroke: '0.5px black' }}>New here?</div>
              <img src={require('../components/img/one_bot.png')} alt="New here?" style={{ transform: 'rotate(-45deg)' }} />
            </div>
          }

          <div
            style={{
              position: 'fixed',
              bottom: 10,
              right: 10,
              padding: 5,
              opacity: 0.8,
              backgroundColor: 'white',
              color: '#333',
              fontSize: '0.7em',
            }}
          >
            <a href="/about">v{version}+{shaTruncated}</a>
            {onLocalhost() && <span> [ <em>parser:</em> {PARSER_URL}, <em>db:</em> {FIREBASE_CONFIG.databaseURL} ]</span>}
          </div>

          <TermsOfUseDialog history={history} />
        </div>
      </div>
    );
  }

  private handleClickNewHere = () => {
    RouterDialog.openDialog(this.props.history, 'new-here');
  }

  private handleClickTermsOfUse = () => {
    RouterDialog.openDialog(this.props.history, 'terms-of-use');
  }

  private handleClickWorkshop = () => {
    this.props.history.push('card/new');
  }

  private handleClickDecks = () => {
    this.props.history.push('decks');
  }

  private handleClickArena = () => {
    this.props.history.push('play');
  }
}

export default withRouter(connect(mapStateToProps)(Home));
