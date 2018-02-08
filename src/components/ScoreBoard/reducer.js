import * as Actions from './actions';


const initialState = {
    isLoading: false,
    status: 'unloaded',
    users: []
}

export default function reducer(state=initialState, action) {
    let updateState = (obj) => Object.assign({}, state, obj)

    switch(action.type) {
        case Actions.USER_LOAD_COMPLETE:
            return updateState({
                status: 'loaded',
                users: action.users
            });

        case Actions.UPDATE_DEBT:
            return updateState({
                users: updateUserDebt(state.users, action.user, action.amount)
            });

        default:
            return state;
    }
}

const updateUserDebt = (users, userId, amount) => {
    return users.map((user) => {
        return user.user === userId ?
            Object.assign({}, user, {debt: user.debt + amount}) : user;
    })
};