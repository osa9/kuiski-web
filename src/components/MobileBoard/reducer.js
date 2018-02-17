import * as Actions from './actions';


const initialState = {
    notificationImage: null,
    audio: '/sounds/nosound.mp3',
    view: 0,
    keys: {},
    images: {
        resources: []
    }
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

        case Actions.VIEW_CHANGE:
            return updateState({
                view: action.view
            })

        case Actions.GET_KEY_RESULT:
            return updateState({
                keys: action.payload
            });

        case Actions.GET_IMAGE_LIST_RESULT:
            return updateState({
                images: action.payload
            });

        default:
            return state;
    }
}