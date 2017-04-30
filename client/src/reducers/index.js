import {searchReducer} from './search.js';
import {insertReducer} from './insertdel.js';
import {List, Map, OrderedMap, Set} from 'immutable';

const freshState = () => new Map().set('data', new Map())
                  .set('search', new Map())
                  .set('insertdel', new Map().set('pending', new Set()));

export const reducer = (state = freshState(), action) => {
    let d = state.get('data', new Map());
    switch (action.type) {
        case 'FETCH_TABLE_LIST_RECEIVED':
            let tables = List(action.list);
            let enabledTables = OrderedMap(action.list.map(t => [t, true]));
            let newData = state.get('data', new Map()).set('tables', tables);
            let newSearch = state.get('search', new Map()).set('enabledTables', enabledTables);
            return state.set('data', newData).set('search', newSearch);
        case 'FETCH_TABLE_LIST_REQUEST':
            d = d.set('fetchTableList', 'pending');
            break;
        case 'RESPONSE_LOGIN':
            d = d.set('isLoggedIn', action.granted);
            break;
        case 'REQUEST_LOGIN':
            d = d.set('user', action.user).set('pass', action.pass);
            break;
        default:
            let tmp = searchReducer(state, action);
            if (tmp == state) return insertReducer(state, action);
            else return tmp;
    }
    return state.set('data', d);
};

