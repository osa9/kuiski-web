export const OPEN_IMAGE_NOTIFICATION = 'OPEN_IMAGE_NOTIFICATION';
export const CLOSE_IMAGE_NOTIFICATION = 'CLOSE_IMAGE_NOTIFICATION';

export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PLAY_AUDIO_COMPLETE = 'PLAY_AUDIO_COMPLETE';

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

export const playAudio = (audio) => {
    return {
        type: PLAY_AUDIO,
        audio: audio
    }
}

export const playAudioComplete = () => {
    return {
        type: PLAY_AUDIO_COMPLETE
    }
}

export const imageNotification = (url, timeout = 5000) => (dispatch) => {
    dispatch(openImageNotification(url));
    setTimeout(() => { dispatch(closeImageNotification()) }, timeout);
}