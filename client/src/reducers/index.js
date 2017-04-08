import {searchReducer} from './search.js';
import {List, Map, OrderedMap} from 'immutable';

const freshState = () => new Map().set('data', new Map()).set('search', new Map())

export const reducer = (state = freshState(), action) => {
	let d = state.get('data', new Map());
	switch (action.type) {
		case 'FETCH_TABLE_LIST_RECEIVED':
			let tables = List(action.list);
			let enabledTables = OrderedMap(action.list.map(t => [t, true]));
			//let state = state.set('fetchTableList', 'success');
			let newData = state.get('data', new Map()).set('tables', tables);
			let newSearch = state.get('search', new Map()).set('enabledTables', enabledTables);
			return state.set('data', newData).set('search', newSearch);
		case 'FETCH_TABLE_LIST_REQUEST':
			d = d.set('fetchTableList', 'pending');
			break;
                default:
			return searchReducer(state, action);
	}
	return state.set('data', d);
}
