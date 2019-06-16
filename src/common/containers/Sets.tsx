import { Button, Paper } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as fb from 'firebase';
import { History } from 'history';
import { groupBy, mapValues, orderBy } from 'lodash';
import { FontIcon } from 'material-ui';
import * as qs from 'qs';
import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnyAction, compose, Dispatch } from 'redux';

import * as collectionActions from '../actions/collection';
import SetSummary from '../components/cards/SetSummary';
import Title from '../components/Title';
import MustBeLoggedIn from '../components/users/MustBeLoggedIn';
import * as w from '../types';
import { listenToDecks } from '../util/firebase';

interface SetsStateProps {
  sets: w.Set[]
  user: fb.User | null
}

interface SetsDispatchProps {
  onDeleteSet: (setId: string) => void
  onDuplicateSet: (setId: string) => void
  onEditSet: (setId: string) => void
  onPublishSet: (setId: string) => void
}

type SetsProps = SetsStateProps & SetsDispatchProps & { history: History } & WithStyles;

interface SetsState {
  numDecksBySet?: Record<string, number>,
  showHelpText: boolean
}

function mapStateToProps(state: w.State): SetsStateProps {
  return {
    sets: state.collection.sets,
    user: state.global.user
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): SetsDispatchProps {
  return {
    onDeleteSet: (setId: string) => {
      dispatch(collectionActions.deleteSet(setId));
    },
    onDuplicateSet: (setId: string) => {
      dispatch(collectionActions.duplicateSet(setId));
    },
    onEditSet: (setId: string) => {
      dispatch(collectionActions.editSet(setId));
    },
    onPublishSet: (setId: string) => {
      dispatch(collectionActions.publishSet(setId));
    }
  };
}

class Sets extends React.Component<SetsProps, SetsState> {
  public static styles: Record<string, CSSProperties> = {
    buttonLabel: {
      fontFamily: 'Carter One'
    },
    helpPaper: {
      display: 'inline-block',
      marginLeft: 20,
      marginTop: 15,
      padding: 10,
      '& button': {
        float: 'right',
        padding: 2,
      },
      '& p': {
        marginTop: 0
      },
      '& p:last-child': {
        marginBottom: 0
      }
    },
    singleSetContainer: {
      margin: '20px 0'
    }
  };

  public state: SetsState = {
    showHelpText: true
  };

  /**
   * Returns either the single set to focus on (if there is a set=[setId] URL query parameter),
   * or null to display all published and user sets.
   */
  get singleSet(): w.Set | null {
    const { history: { location: { search }}, sets } = this.props;
    const setId: string | undefined = qs.parse(search.replace('?', '')).set;
    if (setId) {
      return sets.find((set) => set.id === setId) || null;
    }
    return null;
  }

  get publishedSets(): w.Set[] {
    const { sets } = this.props;
    const { numDecksBySet } = this.state;
    const unorderedPublishedSets = sets.filter((set) => set.metadata.isPublished);

    if (numDecksBySet) {
      return orderBy(unorderedPublishedSets, (set) => numDecksBySet[set.id] || 0, 'desc');
    } else {
      return unorderedPublishedSets;
    }
  }

  get userSets(): w.Set[] {
    const { sets, user } = this.props;
    return user ? orderBy(sets.filter((set) => set.metadata.authorId === user.uid), 'metadata.lastModified', 'desc') : [];
  }

  public componentDidMount(): void {
    listenToDecks((decks: w.DeckInStore[]) => {
      this.setState({
        numDecksBySet: mapValues(groupBy(decks, 'setId'), (group) => group.length)
      });
    });
  }

  public render(): JSX.Element {
    const { user, classes } = this.props;
    const { showHelpText } = this.state;

    return (
      <div>
        <Helmet title="Sets" />
        <Title text="Sets" />

        {showHelpText && <div>
          <Paper className={classes.helpPaper}>
            <Button variant="flat" color="secondary" onClick={this.handleHideHelpText}>
              <FontIcon className="material-icons">
                close
              </FontIcon>
            </Button>
            <p><b>Sets</b> offer a way for you to play games of Wordbots in which both players use the same pool of cards.</p>
            <p>You can take a popular set, make a deck from it, and play against other players who've made decks using that set.</p>
            <p>If you're feeling creative, create your own set (using your own cards and/or cards you've found),<br />share it with your friends to challenge them, or publish it for the world to see!</p>
          </Paper>
        </div>}

        <div style={{ margin: 20 }}>
          <MustBeLoggedIn loggedIn={!!user}>
            <Button
              variant="contained"
              color="secondary"
              classes={{ label: classes.buttonLabel }}
              onClick={this.handleCreateSet}
            >
              New Set
            </Button>
          </MustBeLoggedIn>
          {this.renderSets()}
        </div>
      </div>
    );
  }

  private renderSets = (): JSX.Element => {
    const { classes } = this.props;
    if (this.singleSet) {
      return (
        <div>
          <div className={classes.singleSetContainer}>
            {this.renderSetSummary(this.singleSet)}
          </div>
          <Button
            variant="outlined"
            color="primary"
            classes={{ label: classes.buttonLabel }}
            onClick={this.handleShowAllSets}
          >
            Show all sets
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          {
            this.publishedSets.length > 0 &&
              <div>
                <h2>Top published sets <i>({this.publishedSets.length})</i></h2>
                {this.publishedSets.map((set) => this.renderSetSummary(set, { inPublishedSetsList: true }))}
              </div>
          }
          {
            this.userSets.length > 0 &&
              <div>
                <h2>Your sets <i>({this.userSets.length})</i></h2>
                {this.userSets.map((set) => this.renderSetSummary(set))}
              </div>
          }
        </div>
      );
    }
  }

  private renderSetSummary = (set: w.Set, extraProps: Record<string, any> = {}): JSX.Element => {
    const { numDecksBySet } = this.state;
    return (
      <SetSummary
        key={set.id}
        set={set}
        user={this.props.user}
        numDecksCreated={numDecksBySet ? numDecksBySet[set.id] || 0 : undefined}
        isSingleSet={!!this.singleSet}
        onCreateDeckFromSet={this.handleCreateDeckFromSet(set.id)}
        onDeleteSet={this.handleDeleteSet(set.id)}
        onDuplicateSet={this.handleDuplicateSet(set.id)}
        onEditSet={this.handleEditSet(set.id)}
        onPublishSet={this.handlePublishSet(set.id)}
        {...extraProps}
      />
    );
  }

  private handleCreateSet = () => {
    this.props.history.push('/sets/new');
  }

  private handleEditSet = (setId: string) => () => {
    this.props.onEditSet(setId);
    this.props.history.push(`/sets/${setId}`);
  }

  private handleCreateDeckFromSet = (setId: string) => () => {
    this.props.history.push(`/deck/for/set/${setId}`);
  }

  private handleDeleteSet = (setId: string) => () => {
    this.props.onDeleteSet(setId);
  }

  private handleDuplicateSet = (setId: string) => () => {
    this.props.onDuplicateSet(setId);
  }

  private handlePublishSet = (setId: string) => () => {
    this.props.onPublishSet(setId);
  }

  private handleShowAllSets = () => {
    this.props.history.push('/sets');
  }

  private handleHideHelpText = () => {
    this.setState({ showHelpText: false });
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Sets.styles)
)(Sets);
