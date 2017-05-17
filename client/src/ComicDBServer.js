/**
 * This file provides functions and configuration to interact with the expressjs
 * backend.
 */

const config = {
    url: server_url + '/'
};


const headers = new Headers({
    'Content-Type' : 'application/json',
});

/**
 * Returns a promise for an array containing the name of the tables stored in the
 * database
 */
function fetchTableList() {
    return fetch(config.url + 'tables_list', {
        method: 'get',
        headers: headers
    }).then(r => r.json());
}

/**
 * Returns a promise for search results based on search string and enabled tables
 * @param {*string: , enabledTables} params
 */
function search(params) {
    return fetch(config.url + 'search', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(params)
    }).then(r => r.json()).then(r => r.results);
}

/**
 * Returns a promise for insertion request
 */
function insert(dstTable, objToAdd) {
    let request = new Request(
        config.url + 'insert', {
            headers: headers,
            method: 'post',
            body: JSON.stringify({
                dstTable,
                objToAdd
            })
        }
    );
    return fetch(request).then(resp => {
        if (window.Notification && Notification.permission !== 'denied') {
            Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
                new Notification('ComicDB Interface', {
                    body: 'Insertion in ' + dstTable + ' ' + (resp.ok ? 'succeded' : 'failed'),
                }); 
            });
        }
        return resp.ok;
    });
}

function fetchCountries() {
    return fetch(config.url + 'countries', {
        method: 'get',
        headers: headers
    }).then(r => r.json());
}

function login(user, pass) {
    const token = 'Basic ' + btoa(user +':' + pass);
    headers.set('Authorization', token);
    return fetch(config.url + 'login', {
        method: 'get',
        headers: headers
    }).then(res => res.ok);
}

function fetchQueryList() {
    return fetch(config.url + 'predef', {
        method: 'get',
        headers: headers
    }).then(res => res.json());
}

function predef(i) {
    return fetch(config.url + 'predef', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            id: i
        })
    }).then(r => r.json());
}

export const Server = {
    fetchTableList,
    insert,
    search,
    login,
    fetchCountries,
    fetchQueryList,
    predef
};
