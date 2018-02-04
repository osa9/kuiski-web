import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const users = {
  osa9: {name: 'おさ', icon: 'icons/osa9.jpg', debt: 0},
  alka_line: {name: '蒼', icon: 'icons/alka_line.jpg', debt: 0},
  daisuke_k: {name: '小谷', icon: 'icons/daisuke_k.jpg', debt: 0},
  hans_doi: {name: 'どいこん', icon: 'icons/hans_doi.jpg', debt: 0},
  iame_bucher: {name: 'ぶっひゃあ', icon: 'icons/iame_bucher.jpg', debt: 0},
  y_f_: {name: 'わいえふ', icon: 'icons/y_f_.jpg', debt: 0},
  tom: {name: 'とむ', icon: 'icons/ototomosama.jpg', debt: 0},
  totoro: {name: 'ととろ', icon: 'icons/ototorosama.jpg', debt: 0},
  rgn_k_: {name: 'みき', icon: 'icons/rgn_k_.jpg', debt: 0},
  yamato: {name: 'やまと', icon: 'icons/roadroller_da.jpg', debt: 0},
  sasa: {name: 'ささ', icon: 'icons/sasa_buttyo.jpg', debt: 0},
  uestu: {name: 'よっしー', icon: 'icons/xjuka.jpg', debt: 0},
  xjuka: {name: 'うえつ', icon: 'icons/uetsu.png', debt: 0},
}

const initialState = {
  users: users
}

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
    this.onClick = this.onClick.bind(this);
    this.updateDebt = this.updateDebt.bind(this);
  }

  updateDebt(username, amount = 1000) {
    var newUsers = {}

    for (let key in this.state.users) {
      const user = this.state.users[key];

      var debt = user.debt;
      if (key === username) {
        debt += amount;
      }

      newUsers[key] = Object.assign({}, user, {
        debt: debt
      });
    }

    this.setState({
      users: newUsers
    })
  }

  onClick(obj) {
    console.log(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to KUISki</h1>
        </header>
        <p className="App-intro">
          <List>
            { this.renderUsers() }
          </List>
        </p>
      </div>
    );
  }

  renderUsers() {
    var result = [];

    for (let key in this.state.users) {
      const user = this.state.users[key];
      result.push((
        <ListItem
          disabled={true}
          leftAvatar={
            <Avatar src={user.icon} />
          }
        >
          {user.name}
          <FlatButton id={user} label="罰金" secondary={true} onClick={() => this.updateDebt(key) } />

          {user.debt}円
        </ListItem>
      ));
    }

    return result;
  }
}

export default App;
