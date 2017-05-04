import {Map} from 'immutable';

export const predefReducer = (state, action) => {
    let p = state.get('predef', new Map());
    switch (action.type) {
        case 'REQUEST_PREDEF':
            let q = new Map().set('pending', true);
            p = p.set(action.index, q);
            break;
        case 'PREDEF_RESPONSE':
            let resObj = new Map().set('pending', false)
                                  .set('result', action.result.results[0]);
            p = p.set(action.result.info, resObj);
            break;
        case 'RECEIVE_QUERY_LIST':
            p = p.set('list', action.list);
            break;
        default:
            return state;
    };
    return state.set('predef', p);

};