import {Server} from './../ComicDBServer.js';

export const receiveTableList = (tableList) => {
    return {
        type: 'FETCH_TABLE_LIST_RECEIVED',
        list: tableList
    };
};

export const requestTableList = () => {
    return {type: 'FETCH_TABLE_LIST_REQUEST'};
};

export const tablelist = () => dispatch => {
    dispatch(requestTableList());
    // TODO: Error handling
    return Server.fetchTableList().then(ls => dispatch(receiveTableList(ls)));
};

export const requestLogin = (user, pass) => {
    return {
        type: 'REQUEST_LOGIN',
        user: user,
        pass: pass
    };
};

export const loginResponse = ok => {
    return {
        type: 'RESPONSE_LOGIN',
        granted: ok
    };
};

export const login = (user, pass) => dispatch =>  {
    dispatch(requestLogin(user, pass));
    return Server.login(user, pass).then(granted => dispatch(loginResponse(granted)));
};