import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import * as Actions from './actions';

class ScoreBoard extends Component {
    constructor() {
        super();
        this.onDebt = this.onDebt.bind(this);
        this.onNotify = this.onNotify.bind(this);
    }

    componentDidMount() {
        this.props.getUserList();
        this.props.setNotifyHandler(this.onNotify);
    }

    render() {
        const users = this.props.ScoreBoard.users;

        return (
            <div>
                <List>
                    {this.renderUsers(users, this.onDebt)}
                </List>
            </div>
        );
    }

    renderUsers(users, onNotify) {
        // Chromeだとソートが安定じゃないので、罰金が同額の時は元の順序を維持する
        const ranking = users.sort((a, b) => {
            if (b.debt === a.debt) {
                return b.no - a.no;
            }

            return b.debt - a.debt;
        });

        return ranking.map(user => {
            return (
                <UserScore key={user.id} user={user} onDebt={onNotify} />
            )
        });
    }

    onDebt(user, currentDebt, newDebt) {
        this.props.updateDebt(user.id, currentDebt, newDebt);
    }

    getUserById(userId) {
        for (let user of this.props.ScoreBoard.users) {
            if (user.id === userId) return user;
        }

        console.log(`Failed to find user: ${userId}`);
    }

    onNotify(message) {
        const user = this.getUserById(message.userId);
        const amount = message.newDebt - message.currentDebt;
        this.props.notificationManager.iconTextMessage(user.icon, `${user.name}アウト〜`, `${user.name} +${amount}円`);
    }
}

class UserScore extends Component {
    render() {
        const user = this.props.user;
        const onDebt = this.props.onDebt;

        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={user.icon} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={`${user.debt}円`}
                />

                <Button id={user} color="secondary" onClick={() => onDebt(user, user.debt, user.debt + 1000)}>
                    罰金
                </Button>
            </ListItem>
        );
    }
}


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: () => dispatch(Actions.getUserList()),
        updateDebt: (name, currentDebt, newDebt) => dispatch(Actions.updateDebt(name, currentDebt, newDebt))
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ScoreBoard);