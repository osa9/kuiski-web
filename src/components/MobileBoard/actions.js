import { createAction } from 'redux-actions'

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

export const OPEN_IMAGE_NOTIFICATION = 'OPEN_IMAGE_NOTIFICATION';
export const CLOSE_IMAGE_NOTIFICATION = 'CLOSE_IMAGE_NOTIFICATION';

export const VIEW_CHANGE = 'VIEW_CHANGE';
export const GET_KEY_RESULT = 'GET_KEY_RESULT';
export const GET_IMAGE_LIST_RESULT = 'GET_IMAGE_LIST_RESULT';

export const openImageNotification = (url) => {
    return {
        type: OPEN_IMAGE_NOTIFICATION,
        url: url
    };
}

export const closeImageNotification = () => {
    return {
        type: CLOSE_IMAGE_NOTIFICATION
    };
}

export const viewChange = (value) => {
    return {
        type: VIEW_CHANGE,
        view: value
    }
}

export const getKeyResult = createAction(GET_KEY_RESULT);
export const getImageListResult = createAction(GET_IMAGE_LIST_RESULT);

export const getKey = () => (dispatch) => {
    fetch('https://api.kuis.ski/auth').then(res => res.json()).then(res => {
        return dispatch(getKeyResult(res))
    }).catch(err => {
        console.log('Get key error');
        console.log(err);
    });
}

export const getImageList = () => (dispatch) => {
    fetch('https://api.kuis.ski/images/list').then(res => res.json()).then(res => {
        return dispatch(getImageListResult(res))
    }).catch(err => {
        console.log('Get image list error');
        console.log(err);
    });
}



function* getKeySaga(action) {
    try {
        const response = yield call(() => fetch('http://api.kuis.ski/auth'));
        yield put(getKeyResult(response));
    } catch (e) {
        yield put(getKeyResult(e.message));
    }
}

export function* todoSaga() {
    yield* takeEvery(GET_KEY_RESULT, getKeySaga);
}

export const imageNotification = (url, timeout = 5000) => (dispatch) => {
    dispatch(openImageNotification(url));
    setTimeout(() => { dispatch(closeImageNotification()) }, timeout);
}