export const searchToggleTable = (tableName) => {
	return {
		type: 'SEARCH_TOGGLE_TABLE',
		tableName : tableName
	};
};

export const searchResultReceived = (results) => {
	return {
		type: 'SEARCH_RESULT_RECEIVED',
		data: results
	};
};

export const search = (string) => {
	return {
		type: 'SEARCH_RESULT_REQUEST'
	};
};

export const toggleSearchSettings = () => {
	return {
		type: 'SEARCH_SETTINGS_TOGGLE'
	};
};

