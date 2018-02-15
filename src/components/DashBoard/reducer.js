import * as Actions from './actions';


const initialState = {
    notificationImage: null,
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

        default:
            return state;
    }
}