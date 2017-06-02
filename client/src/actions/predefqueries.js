import {Server} from './../ComicDBServer.js';

export const requestPredef = i => {
    return {
        type: 'REQUEST_PREDEF',
        index: i
    };
};

export const predefResponse = queryObject => {
    return {
        type: 'PREDEF_RESPONSE',
        result: queryObject
    };
};

export const predefquery = i => dispatch => {
    dispatch(requestPredef(i));
    return Server.predef(i).then(q => dispatch(predefResponse(q)));
};

export const receiveQueryList = ls => {
    return {
        type: 'RECEIVE_QUERY_LIST',
        list: ls
    };
};

export const querylist = () => dispatch => {
    return Server.fetchQueryList().then(ls => dispatch(receiveQueryList(ls)));
};

export const mostReprintedIssue = id => dispatch => {
    dispatch(requestPredef(22));
    return Server.mostReprintedIssue(id).then(res => dispatch(predefResponse(res)));
};
