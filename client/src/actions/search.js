import {Server} from './../ComicDBServer.js';

export const searchToggleTable = (tableName) => {
	return {
		type: 'SEARCH_TOGGLE_TABLE',
		tableName : tableName
	};
};

export const toggleSearchSettings = () => {
	return {
		type: 'SEARCH_SETTINGS_TOGGLE'
	};
};

export const searchResultReceived = (results) => {
	return {
		type: 'SEARCH_RESULT_RECEIVED',
		data: results
	};
};

export const searchRequest = (string) => {
	return {
		type: 'SEARCH_RESULT_REQUEST',
		string: string
	};
};

export const search = string => dispatch => {
	dispatch(searchRequest(string));
	return Server.search(string).then(r => dispatch(searchResultReceived(r)));
};

