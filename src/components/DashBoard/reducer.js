import * as Actions from './actions';


const initialState = {
    notificationImage: null,
    audio: '/sounds/nosound.mp3'
}

export default function reducer(state = initialState, action) {
    let updateState = (obj) => Object.assign({}, state, obj)

    switch (action.type) {
        case Actions.OPEN_IMAGE_NOTIFICATION:
            return updateState({
                notificationImage: action.url
            });

        case Actions.CLOSE_IMAGE_NOTIFICATION:
            return updateState({
                notificationImage: null
            })

        case Actions.PLAY_AUDIO:
            console.log(action.audio);
            action.audio.play();
            return updateState({
                playAudio: true,
                //audio: action.audio
            })

        case Actions.PLAY_AUDIO_COMPLETE:
            return updateState({
                playAudio: false,
                audio: null
            })

        default:
            return state;
    }
}