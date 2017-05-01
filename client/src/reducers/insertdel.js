import {List} from 'immutable';

export const insertReducer = (state, action) => {;
	let i = state.get('insertdel', new Map());
	switch (action.type) {
		case 'INSERT_ACTIVATE_PANEL' :
			i = i.set('activePanel', action.panel);
			break;
		case 'REQUEST_INSERTION':
			i = i.set('pending', i.get('pending').add(action.reqId));
			break;
		case 'DB_INSERT_RESPONSE':
			i = i.set('pending', i.get('pending').delete(action.reqId));
			break;
		case 'COUNTRIES_RESPONSE':
			const countryCmp = (a, b) => {
				let al = a.name.toLowerCase();
				let bl = b.name.toLowerCase();
				if (al < bl) return -1
				if (al > bl) return 1;
				return 0;
			};
			i = i.set('countries', new List(action.countries).sort(countryCmp));
			break;
		default:
			return state;
	}
	return state.set('insertdel', i);
}

