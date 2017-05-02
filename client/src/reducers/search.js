import {Map, OrderedMap} from 'immutable'

export const searchReducer = (state, action) => {
	let s = state.get('search', new Map());
	switch (action.type) {
		case 'SEARCH_TOGGLE_TABLE' :
			let pageEnabled = !s.get('enabledTables').get(action.tableName);
			let newTables = s.get('enabledTables').set(action.tableName, pageEnabled);
			s = s.set('enabledTables', newTables);
			break;
		case 'SEARCH_SETTINGS_TOGGLE':
			s = s.set('showAdvancedSettings', !s.get('showAdvancedSettings', false));
			break;
		case 'SEARCH_RESULT_RECEIVED':
			s = s.set('searchResults', action.data);
			s = s.set('pending', false);
			break;
        case 'SEARCH_RESULT_REQUEST':
			s = s.set('pending', true);
			break;
		default:
			return state;
	}
	return state.set('search', s);
}

