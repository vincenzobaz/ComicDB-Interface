//import {combineReducers} from 'redux'
import {Map, OrderedMap} from 'immutable'

export const searchReducer = (state = new Map(), action) => {
	switch (action.type) {
		case 'SEARCH_TOGGLE_TABLE' :
			let newState = !state.get('tables')[action.tableName];
			let newTables = state.get('tables').set(action.tableName, newState);
			return state.set('tables', newTables);
		case 'FETCH_TABLE_LIST_REQUEST':
			return state.set('fetchTableList', 'pending');
		case 'FETCH_TABLE_LIST_RECEIVED':
			let tables = OrderedMap(action.list.map(t => [t, true]));
			//let state = state.set('fetchTableList', 'success');
			return state.set('tables', tables);
		case 'SEARCH_SETTINGS_TOGGLE':
			return state.set('showAdvancedSettings', !state.get('showAdvancedSettings', false));
		case 'SEARCH_RESULT_RECEIVED':
			return state.set('searchResults', action.data);
		default:
			return state;
	}
}

//const reducer = combineReducers({search});

//export default reducer;
//export searchReducer;

