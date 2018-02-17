import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ScoreBoard } from '../ScoreBoard';

import Grid from 'material-ui/Grid';

import PubNubReact from 'pubnub-react';

import NotificationSystem from 'react-notification-system';

import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import { Lightbox } from "react-modal-image";

import * as Actions from './actions';

import ReactPlayer from 'react-player';


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


class DashBoard extends Component {
    constructor() {
        super();
        this.initPubNub();
        this.onNotify = this.onNotify.bind(this);
        this.onClick = this.onClick.bind(this);
        this.eventId = 'dev';
        this.image = null;

        this.closeLightbox = this.closeLightbox.bind(this);
        this.clearAudio = this.clearAudio.bind(this);

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
        this.audio = new Audio('/sounds/out.mp3');
        console.log(this.audio);

        this.audioControl.play().then(() => {
            console.log('ok');

        }).catch(err => {
            console.log(err);
        });
        console.log(this);
    }

    onNotify(n) {
        switch (n.type) {
            case 'text':
                return this._notificationSystem.addNotification({ level: n.level, message: n.message });
            case 'debt':
                console.log(this.audio);
                this.props.dispatch(Actions.playAudio(this.audio));//('/sounds/out.mp3'));

                const data = JSON.parse(n.message);
                return this.scoreNotifyHandler(data);
            case 'image':
                //console.log(n);
                return this.props.imageNotification(n.message);
            default:
                console.log('Unknonwn message');
                break;
        }
    }

    closeLightbox() {
        this.props.closeImageNotification();
    }

    renderLightbox() {
        if (!this.props.notificationImage) return null;
        const image = this.props.notificationImage;

        return (
            <Lightbox
                medium={image}
                large={image}
                alt="思い出"
                onClose={this.closeLightbox}
            />
        )
    }

    renderReactAudio() {
        //console.log(this.props.playAudio);
        //if (!this.props.playAudio) return null;
        const audio = this.props.audio;

        return (
            <audio src={this.props.audio} ref={(ref) => { this.audioControl = ref }} autoplay controls />
        )

        return (
            <ReactPlayer url={audio} playing width='640' height='480' /*onEnded={this.clearAudio}*/ />
        )
    }

    clearAudio() {
        console.log('comp')
        this.props.dispatch(Actions.playAudioComplete());
    }

    render() {
        // {this.renderReactAudio()}
        return (
            <div className="App">
                <div style={styles.header}>
                    <img src='/images/kuiski.png' style={styles.logo} alt='くいすきー▲' />
                </div>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLightbox()}
                <audio src={this.props.audio} ref={(ref) => { this.audioControl = ref }} autoplay controls />
                <div onClick={() => this.onClick()}>Play</div>

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
    return state.DashBoard;
}

const mapDispatchToProps = (dispatch) => {
    return {
        imageNotification: (url, timeout) => dispatch(Actions.imageNotification(url, timeout)),
        closeImageNotification: () => dispatch(Actions.closeImageNotification()),
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
