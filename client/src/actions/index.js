import {Server} from '../ComicDBServer'
import {dispatch} from 'redux'

export const searchToggleTable = (tableName) => {
	return {
		type: 'SEARCH_TOGGLE_TABLE',
		tableName : tableName
	};
};

export const fetchTableListReceived = (tableList) => {
	return {
		type: 'FETCH_TABLE_LIST_RECEIVED',
		list: tableList
	};
};

export const fetchTableListRequest = () => {
	return {type: 'FETCH_TABLE_LIST_REQUEST'};
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

