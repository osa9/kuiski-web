import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';

import Header from './components/Header';
import {ScoreBoard} from './components/ScoreBoard';

import Grid from 'material-ui/Grid';

import PubNubReact from 'pubnub-react';

import NotificationSystem from 'react-notification-system';


class App extends Component {
  constructor() {
    super();
    this.initPubNub();
    this.onNotify = this.onNotify.bind(this);
  }

  initPubNub() {
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-ce0c67c2-ebed-4b63-a04d-bae8f872e669',
      subscribeKey: 'sub-c-8f1bb4c4-0cc2-11e8-afa0-d615f40beee2'
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: ['dev'], withPresence: true });
    this.pubnub.getMessage('dev', (payload) => {
      console.log(payload);
      const data = payload.message;
      this.onNotify({level: 'success', message: data.message});
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;

    this.pubnub.getStatus((st) => {
      console.log(st);
      this.pubnub.publish({ message: {message: 'hello world from react'}, channel: 'dev' });
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['dev'] });
  }

  onClick(obj) {
    console.log(this);
  }

  onNotify(n) {
    console.log(n);
    this._notificationSystem.addNotification(n);
  }

  render() {
    return (
      <div className="App">
        <Header title="KUISki" />
        <NotificationSystem ref="notificationSystem" />

        <div className="App-intro">
          <Grid container>
            <Grid item>
              <ScoreBoard onNotify={ (n) => this.onNotify(n) } />
            </Grid>
            <Grid item>
              Right content
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(App);
