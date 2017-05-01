import {Server} from './../ComicDBServer.js';

export const activateInsertPanel = (tableName) => {
    return {
        type: 'INSERT_ACTIVATE_PANEL',
        panel: tableName
    };
};

export const requestCountries = () => {
    return {
        type: 'REQUEST_COUNTRIES',
    };
};

export const countriesResponse = countries => {
    return {
        type: 'COUNTRIES_RESPONSE',
        countries: countries
    };
};

export const countriesList = () => dispatch => {
    dispatch(requestCountries());
    return Server.fetchCountries().then(countries => dispatch(countriesResponse(countries)));
};

export const requestInsert = () => {
    return {
        type: 'REQUEST_INSERTION',
    };
};

export const insertResponse = (issue) => {
    return {
        type: 'DB_INSERT_RESPONSE',
        issue: issue
    };
};

export const insert = (dstTable, objToAdd) => dispatch => {
    dispatch(requestInsert());
    return Server.insert(dstTable, objToAdd)
          .then(success => dispatch(insertResponse(success)));
};

