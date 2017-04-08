export const insertReducer = (state, action) => {;
	let i = state.get('insertdel', new Map());
	switch (action.type) {
		case 'INSERT_ACTIVATE_PANEL' :
			i = i.set('activePanel', action.panel);
			break;
		default:
			return state;
	}
	return state.set('insertdel', i);
}

