export const USER_LOAD_COMPLETE='USER_LOAD_COMPLETE';
export const USER_LOAD_ERROR='USER_LOAD_ERROR';
export const UPDATE_DEBT='UPDATE_DEBT';

const userLoadCompleteAction = (users) => {
    return {
        type: USER_LOAD_COMPLETE,
        users: users
    };
}
/*
const userLoadErrorAction = (message) => {
    return {
        type: USER_LOAD_ERROR,
        message: message
    };
}*/

const updateDebtAction = (user, currentDebt, newDebt) => {
    return {
        type: UPDATE_DEBT,
        user: user,
        currentDebt: currentDebt,
        newDebt: newDebt
    };
}

export const getUserList = () => (dispatch) => {
    fetch('https://api.kuis.ski/event/dev/users')
    .then((res) => res.json())
    .then((users) => {
        console.log('getUserList Done!');

        // 安定ソートのためにインデックス入れとく
        const userNo = users.map((user, index) => {
            return Object.assign({}, user, {
                no: index
            });
        });

        dispatch(userLoadCompleteAction(userNo));
    });

    // Mock user
    /*const users = [
        {user: 'osa9', name: 'おさ', icon: '/icons/osa9.jpg', debt: 0},
        {user: 'alka_line', name: '蒼', icon: '/icons/alka_line.jpg', debt: 0},
        {user: 'daisuke_k', name: '小谷', icon: '/icons/daisuke_k.jpg', debt: 0},
        {user: 'hans_doi', name: 'どいこん', icon: '/icons/hans_doi.jpg', debt: 0},
        {user: 'iame_bucher', name: 'ぶっひゃあ', icon: '/icons/iame_bucher.jpg', debt: 0},
        {user: 'y_f_', name: 'わいえふ', icon: '/icons/y_f_.jpg', debt: 0},
        {user: 'tom', name: 'とむ', icon: '/icons/ototomosama.jpg', debt: 0},
        {user: 'totoro', name: 'ととろ', icon: '/icons/ototorosama.jpg', debt: 0},
        {user: 'rgn_k_', name: 'みき', icon: '/icons/rgn_k_.jpg', debt: 0},
        {user: 'yamato', name: 'やまと', icon: '/icons/roadroller_da.jpg', debt: 0},
        {user: 'sasa', name: 'ささ', icon: '/icons/sasa_buttyo.jpg', debt: 0},
        {user: 'uestu', name: 'よっしー', icon: '/icons/xjuka.jpg', debt: 0},
        {user: 'xjuka', name: 'うえつ', icon: '/icons/uetsu.png', debt: 0},
    ];*/
}

export const updateDebt = (user, currentDebt, newDebt, notify) => (dispatch, state) => {
    fetch(`https://api.kuis.ski/event/dev/users/${user}/debt?currentDebt=${currentDebt}&newDebt=${newDebt}`, {method: "PUT"}).then((res) => {
        dispatch(updateDebtAction(user, currentDebt, newDebt));
    });
}