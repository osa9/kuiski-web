import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ScoreBoard } from '../ScoreBoard';
import PubNubReact from 'pubnub-react';
import NotificationSystem from 'react-notification-system';
import Avatar from 'material-ui/Avatar';
import Lightbox from "react-image-lightbox";
import * as Actions from './actions';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import MoneyIcon from 'material-ui-icons/AttachMoney';
import PhotoIcon from 'material-ui-icons/InsertPhoto';
import LocationIcon from 'material-ui-icons/LocationOn';
import Card, { CardHeader } from 'material-ui/Card';
import GoogleMap from 'google-map-react';
import { Image, Transformation } from 'cloudinary-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


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
    app: {
        witdh: '100%',
    },
    header: {
        textAlign: 'center'
    },
    logo: {
        width: 250,
        margin: 15,
    },
    contentTitle: {
        width: 300,
        margin: '5px auto',
        fontSize: 'large',
        borderBottom: '1px solid #aaa'
    },
    debt: {
        margin: 'auto',
        width: 300
    },
    debtBox: {
        width: 300
    },
    bottom: {
        marginBottom: 75
    },
    bottomRight: {
        float: 'right'
    },
    navigation: {
        position: "fixed",
        bottom: "0",
        width: "100%"
    },
    map: {
        width: '100%',
        height: '80vh',
        border: '1px solid #aaa'
    }
}

class MapTogether extends Component {
    static defaultProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11
    };

    renderMyPosition(myPos) {
        return (
            <AnyReactComponent
                lat={this.state.pos.lat}
                lng={this.state.pos.lng}
                text={'You'}
            />
        );
    }

    constructor() {
        super();
        this.state = {
            pos: {
                lat: 36.5781474,
                lng: 136.6135526
            }
        }
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    pos: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
            }, err => {
                console.log(err);
            })
        }
    }

    render() {
        if (!this.props.mapKey) {
            return 'Loading...';
        }

        return (
            <div style={styles.map}>
                <GoogleMap
                    bootstrapURLKeys={{ key: this.props.mapKey }}
                    defaultCenter={{ lat: 36.5781474, lng: 136.6135526 }}
                    defaultZoom={this.props.zoom}
                    position={this.state.pos}
                >
                    {this.renderMyPosition(this.props.myPos)}
                </GoogleMap>
            </div>
        );
    }
}

class Galley extends Component {
    constructor() {
        super();

        this.state = {
            lightBox: null,
            photoIndex: 0
        }

        this.openLightBox = this.openLightBox.bind(this);
        this.closeLightBox = this.closeLightBox.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.moveLightBox = this.moveLightBox.bind(this);
    }

    render() {
        const resources = this.props.images.resources;
        return (
            <div>
                {this.renderLightBox()}
                {resources.map(this.renderImage)}
            </div>
        )
    }

    renderLightBox() {
        if (!this.state.isOpen) return null;
        const images = this.props.images.resources.map(res => res.secure_url);
        const photoIndex = this.state.photoIndex;

        return (
            <Lightbox
                mainSrc={images[photoIndex]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                onMovePrevRequest={() => this.moveLightBox(images.length, -1)}
                onMoveNextRequest={() => this.moveLightBox(images.length, 1)}
                alt="思い出"
                onCloseRequest={this.closeLightBox}
            />
        )
    }

    closeLightBox() {
        this.setState({ isOpen: false });
    }

    openLightBox(index) {
        this.setState({ isOpen: true, photoIndex: index });
    }

    moveLightBox(modulo, amount) {
        this.setState({ photoIndex: (this.state.photoIndex + amount) % modulo })
    }

    renderImage(image, index) {
        return (
            <Image key={image.public_id} cloud_name='dke5tzfyy' publicId={image.public_id} onClick={() => this.openLightBox(index)}>
                <Transformation width="150" height="150" gravity="face" crop="thumb" />
            </Image>
        );
    }
}

class MobileBoard extends Component {
    constructor() {
        super();
        this.initPubNub();
        this.onNotify = this.onNotify.bind(this);
        this.eventId = 'dev';
        this.image = null;

        this.closeLightbox = this.closeLightbox.bind(this);
        this.onViewChange = this.onViewChange.bind(this);

        this.views = [this.renderDebt]
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
        this.props.dispatch(Actions.getKey());
        this.props.dispatch(Actions.getImageList());

        //setInterval(this.mapRefresh, 1000);
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({ channels: [this.eventId] });
    }

    onNotify(n) {
        switch (n.type) {
            case 'text':
                return this._notificationSystem.addNotification({ level: n.level, message: n.message });
            case 'debt':
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

    mapRefresh() {
        if (!navigator.geolocation || this.props.view !== 2) return;

        /*navigator.geolocation.getCurrentPosition(position => {

        }, err => {
            console.log(err);
        }) ;*/
    }

    renderMap() {
        return (
            <div>
                <div style={styles.contentTitle}>迷子</div>
                <MapTogether
                    mapKey={this.props.keys.googleMapKey}
                    center={{ lat: 36.5781474, lng: 136.6135526 }} />
            </div>
        )
    }

    renderDebt() {
        return (
            <div>
                <div style={styles.contentTitle}>罰金</div>
                <div style={styles.debt}>
                    <ScoreBoard
                        setNotifyHandler={(handler) => this.scoreNotifyHandler = handler}
                        notificationManager={this.notificationManager}
                    />
                </div>
            </div>
        );
    }

    renderGalley() {
        return (
            <div>
                <div style={styles.contentTitle}>思い出</div>
                <div style={styles.debt}>
                    <Galley
                        images={this.props.images}
                    />
                </div>
            </div>
        )
    }

    onViewChange(event, value) {
        console.log(this.props.view);
        this.props.dispatch(Actions.viewChange(value));
    }

    renderView() {
        switch (this.props.view) {
            case 0:
                return this.renderDebt();
            case 1:
                return this.renderGalley();
            case 2:
                return this.renderMap();
            default:
                return this.renderDebt();
        }
    }

    render() {
        return (
            <div className="App" style={styles.app}>
                <div style={styles.header}>
                    <img src='/images/kuiski.png' style={styles.logo} alt='くいすきー▲' />
                </div>
                <NotificationSystem ref="notificationSystem" />
                <div className="App-intro" >
                    {this.renderView()}
                </div>
                <div style={styles.bottom}>
                    <span>© KUISki 2018</span>
                    <span style={styles.bottomRight}>[<Link to='/dashboard'>PC版</Link>]</span>
                </div>
                <Card style={styles.navigation}>
                    <BottomNavigation
                        showLabels
                        value={this.props.view}
                        onChange={this.onViewChange}
                    >
                        <BottomNavigationAction label="罰金" icon={<MoneyIcon />} />
                        <BottomNavigationAction label="思い出" icon={<PhotoIcon />} />
                        <BottomNavigationAction label="迷子" icon={<LocationIcon />} />
                    </BottomNavigation>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.MobileBoard;
}

const mapDispatchToProps = (dispatch) => {
    return {
        imageNotification: (url, timeout) => dispatch(Actions.imageNotification(url, timeout)),
        closeImageNotification: () => dispatch(Actions.closeImageNotification()),
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileBoard);
