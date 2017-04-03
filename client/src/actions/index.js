import {Server} from '../ComicDBServer'
import {dispatch} from 'redux'

export const searchToogleTable = (tableName) => {
	return {
		type: 'SEARCH_TOGGLE_TABLE',
		tableName : tableName
	}
};

export const fetchTableListReceived = (tableList) => {
	return {
		type: 'FETCH_TABLE_LIST_RECEIVED',
		list: tableList
	};
};

export const fetchTableListRequest = () => {
	const req = {type: 'FETCH_TABLE_LIST_REQUEST'};
	Server.fetchTableList().then(result => dispatch(fetchTableListReceived(result)));
	return req;
};
