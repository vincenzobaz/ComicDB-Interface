import {Server} from './../ComicDBServer.js';

export const activateInsertPanel = (tableName) => {
	return {
		type: 'INSERT_ACTIVATE_PANEL',
		panel: tableName
	};
};

let requestId = 0;
export const requestInsert = () => {
	return {
		type: 'REQUEST_INSERTION',
		reqId: requestId
	};
};

export const insertResponse = (reqId, issue) => {
	return {
		type: 'DB_INSERT_RESPONSE',
		reqId: reqId
	};
};

export const insert = (dstTable, objToAdd) => dispatch => {
	dispatch(requestInsert());
	return Server.insert(dstTable, objToAdd, requestId++)
	      .then(resp => dispatch(insertResponse(resp.reqId)));
};

