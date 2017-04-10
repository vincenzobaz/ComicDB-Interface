/**
 * This file provides functions and configuration to interact with the expressjs
 * backend.
 */

const config = {
    url: 'http://localhost:3000/'
};


const headers = new Headers({
	'Content-Type' : 'application/json'
});

/**
 * Returns a promise for an array containing the name of the tables stored in the
 * database
 */
function fetchTableList() {
    return fetch(config.url + 'tables_list', {method: 'get'}).then(r => r.json());
}

/**
 * Returns a promise for search results based on search string and enabled tables
 * @param {*string: , enabledTables} params
 */
function search(params) {
    return new Promise((res, rej) => res("Search results for " + params.string + " here"));
}

/**
 * Returns a promise for insertion request
 */
function insert(dstTable, objToAdd, reqId) {
    let request = new Request(
    	config.url + 'insert', {
		headers: headers,
		method: 'POST',
		body: JSON.stringify({
			dstTable,
			objToAdd,
			reqId
		})
	}
    ); // TODO: Error handling
    return fetch(request).then(resp => resp.json()).then(r => r.reqId);
}

export const Server = {
	fetchTableList,
	insert,
	search
}
