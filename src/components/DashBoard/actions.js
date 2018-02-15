export const OPEN_IMAGE_NOTIFICATION = 'OPEN_IMAGE_NOTIFICATION';
export const CLOSE_IMAGE_NOTIFICATION = 'CLOSE_IMAGE_NOTIFICATION';

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

export const imageNotification = (url, timeout = 5000) => (dispatch) => {
    dispatch(openImageNotification(url));
    setTimeout(() => { dispatch(closeImageNotification()) }, timeout);
}