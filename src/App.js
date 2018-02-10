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
    this.eventId = 'dev';
  }

  initPubNub() {
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-ce0c67c2-ebed-4b63-a04d-bae8f872e669',
      subscribeKey: 'sub-c-8f1bb4c4-0cc2-11e8-afa0-d615f40beee2'
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({ channels: [this.eventId], withPresence: true });
    this.pubnub.getMessage(this.eventId, (payload) => {
      const data = payload.message;
      this.onNotify({level: 'success', type: data.type, message: data.message});
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this._scoreBoard = this.refs.scoreBoard;
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: [this.eventId] });
  }

  onClick(obj) {
    console.log(this);
  }

  onNotify(n) {
    console.log(n);
    switch(n.type) {
      case 'text':
        return this._notificationSystem.addNotification({level: n.level, message: n.message});
      case 'debt':
        const data = JSON.parse(n.message);
        this._notificationSystem.addNotification({
          level: n.level,
          message: `${data.userId} 罰金+${data.newDebt - data.currentDebt}`
        });
      default:
        console.log('Unknonwn message');
        return;
    }
  }

  render() {
    return (
      <div className="App">
        <Header title="KUISki" />
        <NotificationSystem ref="notificationSystem" />

        <div className="App-intro">
          <Grid container>
            <Grid item>
              <ScoreBoard onNotify={ (n) => this.onNotify(n) } ref="scoreBoard" />
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
