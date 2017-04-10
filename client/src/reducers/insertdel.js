export const insertReducer = (state, action) => {;
	let i = state.get('insertdel', new Map());
	switch (action.type) {
		case 'INSERT_ACTIVATE_PANEL' :
			i = i.set('activePanel', action.panel);
			break;
		case 'REQUEST_INSERTION':
			i = i.set('pending', i.get('pending').add(action.reqId));
		case 'DB_INSERT_RESPONSE':
			i = i.set('pending', i.get('pending').delete(action.reqId));
			break;
		break;
		default:
			return state;
	}
	return state.set('insertdel', i);
}

