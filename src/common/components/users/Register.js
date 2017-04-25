import React, { Component } from 'react';
import { bool } from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Paper from 'material-ui/Paper';

import { register } from '../../util/firebase';

export function mapStateToProps(state) {
  return {
    sidebarOpen: state.layout.present.sidebarOpen
  };
}

class Register extends Component {
  static propTypes = {
    sidebarOpen: bool
  };

  constructor() {
    super();

    this.state = {
      error: null
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    register(this.email.value, this.pw.value)
      .catch(e => { console.log(e); this.setState({error: e.message}); });
  }

  render() {
    return (
      <div style={{
        paddingLeft: this.props.sidebarOpen ? 256 : 0,
        margin: '48px 72px'
      }}>
        <Helmet title="Register"/>

        <Paper>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
            </div>
            {
              this.state.error &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.error}
              </div>
            }
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Register));
