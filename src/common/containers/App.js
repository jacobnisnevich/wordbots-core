import React, { Component } from 'react';
import { bool, func, string, object } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import { inBrowser } from '../util/common';
import { listenToUserData, onLogin, onLogout } from '../util/firebase';
import * as actions from '../actions/global';
import NavMenu from '../components/NavMenu';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import GameMenu from '../containers/GameMenu';
import Creator from '../containers/Creator';
import Collection from '../containers/Collection';
import Deck from '../containers/Deck';
import Decks from '../containers/Decks';
import Play from '../containers/Play';
import Home from '../containers/Home';
import PersonalTheme from '../themes/personal';

// Hacky analytics implementation.
let ReactGA, currentLocation;
if (inBrowser()) {
  ReactGA = require('react-ga');
  ReactGA.initialize('UA-345959-18');
}

function mapStateToProps(state) {
  return {
    version: state.version,
    user: state.global.user,
    sidebarOpen: state.global.sidebarOpen,
    inGame: state.game.started
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({
    onLoggedIn(user) {
      dispatch(actions.loggedIn(user));
    },
    onLoggedOut() {
      dispatch(actions.loggedOut());
    },
    onReceiveFirebaseData(data) {
      dispatch(actions.firebaseData(data));
    },
    onToggleSidebar(value) {
      dispatch(actions.toggleSidebar(value));
    }
  });
}

class App extends Component {
  static childContextTypes = {
    muiTheme: object
  };

  static propTypes = {
    onLoggedIn: func,
    onLoggedOut: func,
    onReceiveFirebaseData: func,
    onToggleSidebar: func,

    children: object,

    version: string,
    user: object,
    sidebarOpen: bool,
    inGame: bool
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentLocation: null
    };
  }

  componentWillMount() {
    this.logAnalytics();
  }

  componentDidMount() {
    onLogin((user) => {
      this.setState({loading: false});
      this.props.onLoggedIn(user.toJSON());
      listenToUserData(this.props.onReceiveFirebaseData);
    });

    onLogout(() => {
      this.setState({loading: false});
      this.props.onLoggedOut();
      this.props.onReceiveFirebaseData(null);
    });
  }

  componentWillUpdate() {
    this.logAnalytics();
  }

  logAnalytics() {
    if (inBrowser() && window.location.pathname !== currentLocation) {
      currentLocation = window.location.pathname;
      ReactGA.set({ page: currentLocation });
      ReactGA.pageview(currentLocation);
    }
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(PersonalTheme)
    };
  }

  get title() {
    return (
      <div style={{height: 66}}>
        <AppBar
          zDepth={1}
          title={
            <Link style={{
              color: '#fff', fontFamily: 'Carter One', fontSize: 32
            }} to="/">WORDBOTS</Link>
          }
          style={{
            position: 'fixed',
            top: 0
          }}
          iconElementLeft={
            <IconButton onClick={() => { this.props.onToggleSidebar(!this.props.sidebarOpen); }}>
              <FontIcon className="material-icons">menu</FontIcon>
            </IconButton>
          }
        />
      </div>
    );
  }

  get sidebar() {
    if (this.state.loading) {
      return null;
    } else if (this.props.inGame) {
      return <GameMenu open={this.props.sidebarOpen} />;
    } else {
      return <NavMenu open={this.props.sidebarOpen} user={this.props.user} />;
    }
  }

  get content() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          {!this.props.user && <Route path="/login" component={Login} />}
          {!this.props.user && <Route path="/register" component={Register} />}
          <Route path="/collection" component={Collection} />
          <Route path="/creator" component={Creator} />
          <Route path="/decks" component={Decks} />
          <Route path="/deck" component={Deck} />
          <Route path="/play" component={Play} />
          <Route render={() => <Redirect to="/"/>} />
        </Switch>
      );
    }
  }

  render() {
    return (
      <div>
        {this.title}
        <div>
          {this.sidebar}
          {this.content}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
