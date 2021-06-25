import { dispatcher } from '../context/Store';
import Actions from '../context/ReducerAction';
import Request from '../../assets/utils/http-request';
import Api from '../../assets/utils/api';

const Helpers = {};

// Add use to the store state
Helpers.loadUserInStore = (user) => {
    dispatcher({type: Actions.user.set, payload: { user }});
};

// Add use to the store state
Helpers.logout = (clearLocalStorage) => {
    dispatcher({type: Actions.store.reset});
    clearLocalStorage();
};

/**
 * authenticate user
 */
Helpers.signin = async (data) => {
    return await (await Request.post(Api.auth.login, data)).data.data;
}

/**
 * clear session if token has expired 
 */
Helpers.sessionHasExpired = (clearSession, msg) => {
    if (msg.toUpperCase() === 'INVALID TOKEN') {
        Helpers.logout(clearSession);
    }
}




export default Helpers;