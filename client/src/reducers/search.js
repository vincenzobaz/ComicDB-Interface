import {combineReducers} from 'redux'
import {Map, OrderedMap} from 'immutable'

const search = ({state = Map(), action}) => {
	switch (action.type) {
		case 'SEARCH_TOGGLE_TABLE' :
			let newState = !state.get('tables')[action.tableName];
			let newTables = state.get('tables').set(action.tableName, newState);
			return state.set('tables', newTables);
		case: 'FETCH_TABLE_LIST_REQUEST':
			return state.set('fetchTableList', 'pending');
		case: 'FETCH_TABLE_LIST_RECEIVED':
			let tables = OrderedMap(action.list.map(t => [t, false]));
			let state = state.set('fetchTableList', 'success');
			return state.set('tables', tables);
	}
}

const reducer = combineReducers({search});

export default reducer;

