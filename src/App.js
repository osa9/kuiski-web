import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';

import Grid from 'material-ui/Grid';

import PubNubReact from 'pubnub-react';

import NotificationSystem from 'react-notification-system';

import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';


class NotificationManager {
  constructor(notificationSystem) {
    this.notificationSystem = notificationSystem;
  }

  textMessage(text) {
    this.notificationSystem.addNotification({
      level: 'success',
      message: text
    });
  }

  iconTextMessage(icon, title, text) {
    this.notificationSystem.addNotification({
      level: 'success',
      children: (
        <CardHeader
          avatar={
            <Avatar src={icon} />
          }
          title={title}
          subheader={text} />
      )
    });
  }
}

const styles = {
  header: {
    //textAlign: 'center'
  },
  logo: {
    width: 250,
    margin: 15,
  },
  debtBox: {
    width: 300
  }
}


class App extends Component {
  constructor() {
    super();
    this.initPubNub();
    this.onNotify = this.onNotify.bind(this);
    this.eventId = 'dev';
    this.image = null;
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
      this.onNotify({ level: 'success', type: data.type, message: data.message });
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.notificationManager = new NotificationManager(this._notificationSystem);
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
    switch (n.type) {
      case 'text':
        return this._notificationSystem.addNotification({ level: n.level, message: n.message });
      case 'debt':
        const data = JSON.parse(n.message);
        return this.scoreNotifyHandler(data);
      case 'image':
        this.setImage(n.url);
      default:
        console.log('Unknonwn message');
        break;
    }
  }

  closeLightbox() {
    this.image = null;
  }

  renderLightbox() {
    if (!this.image) return null;

    return (
      <Lightbox
        medium={this.image}
        large={this.image}
        alt="Hello World!"
        onClose={this.closeLightbox}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <div style={styles.header}>
          <img src='/images/kuiski.png' style={styles.logo} />
        </div>
        <NotificationSystem ref="notificationSystem" />
        {renderLightBox()}

        <div className="App-intro">
          <Grid container>
            <Grid item>
              <ScoreBoard
                setNotifyHandler={(handler) => this.scoreNotifyHandler = handler}
                notificationManager={this.notificationManager}
              />
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
  return state.App;
}

const mapDispatchToProps = (dispatch) => {
  return dispatch;/*
  return {
      getUserList: () => dispatch(Actions.getUserList()),
      updateDebt: (name, currentDebt, newDebt) => dispatch(Actions.updateDebt(name, currentDebt, newDebt))
  } */
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
