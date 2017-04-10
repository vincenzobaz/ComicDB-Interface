import {Server} from './../ComicDBServer.js';

export const receiveTableList = (tableList) => {
	return {
		type: 'FETCH_TABLE_LIST_RECEIVED',
		list: tableList
	};
};

export const requestTableList = () => {
	return {type: 'FETCH_TABLE_LIST_REQUEST'};
};

export const tablelist = () => dispatch => {
	dispatch(requestTableList());
	// TODO: Error handling
	return Server.fetchTableList().then(ls => dispatch(receiveTableList(ls)));
}

