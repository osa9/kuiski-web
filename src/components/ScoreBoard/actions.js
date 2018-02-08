import CardHeader from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

export const USER_LOAD_COMPLETE='USER_LOAD_COMPLETE';
export const USER_LOAD_ERROR='USER_LOAD_ERROR';
export const UPDATE_DEBT='UPDATE_DEBT';

const userLoadCompleteAction = (users) => {
    return {
        type: USER_LOAD_COMPLETE,
        users: users
    };
}

const userLoadErrorAction = (message) => {
    return {
        type: USER_LOAD_ERROR,
        message: message
    };
}

const updateDebtAction = (user, amount) => {
    return {
        type: UPDATE_DEBT,
        user: user,
        amount: amount
    };
}

export const getUserList = () => (dispatch) => {
    // Mock user
    const users = [
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
    ];
    
    dispatch(userLoadCompleteAction(users));
}

export const updateDebt = (user, amount, notify) => (dispatch) => {
    dispatch(updateDebtAction(user, amount));
    /*notify({
        level: 'success',
        children: (
            <CardHeader
              avatar={
                <Avatar src={user.icon} />
              }
              title="罰金"
              subheader={`+${amount}`}
          />
        )
    }); */
}