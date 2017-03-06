/**
 * This file provides functions and configuration to interact with the expressjs
 * backend.
 */

const config = {
    url: 'http://localhost:3000/'
};
    

/**
 * Returns a promise for an array containing the name of the tables stored in the
 * database
 */
export function fetchTableLists() {
    return fetch(config.url + '/tables_list', {method: 'get'}).then(r => r.json());
}
