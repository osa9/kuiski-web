import React, { Component } from 'react';
import {connect} from 'react-redux';

import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import * as Actions from './actions';

class ScoreBoard extends Component {
    constructor() {
        super();
        this.onDebt = this.onDebt.bind(this);
    }

    componentDidMount() {
        this.props.getUserList();
    }

    render() {
        const users = this.props.ScoreBoard.users;

        return (
            <Card>
                <CardHeader title="罰金" />
                <CardContent>
                    <List>
                        { this.renderUsers(users, this.onDebt) }
                    </List>
                </CardContent>
            </Card>
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
                <UserScore user={user} onDebt={onNotify} />
            )
        });
    }

    onDebt(user, currentDebt, newDebt) {
        this.props.updateDebt(user.id, currentDebt, newDebt);
        /*this.props.onNotify({
            level: 'success',
            children: (
                <CardHeader
                  avatar={
                    <Avatar src={user.icon} />
                  }
                  title="罰金"
                  subheader="+1000円" />
            )
        }); */
    }

    getNotification(message) {
        const data = JSON.parse(message);
        console.log(data);
        return 'hello';
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
                    secondary={ `${user.debt}円` }
                />
            
                <Button id={user} color="secondary" onClick={() => onDebt(user, user.debt, user.debt+1000) }>
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