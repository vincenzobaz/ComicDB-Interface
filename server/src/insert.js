const mysql = require('mysql');

const sql = {
    'People' : 'INSERT into People (name) VALUES (?)',
    'Publisher' : 'INSERT into Publishers (name, year_began, year_ended, notes, url, country_code) VALUES (?,?,?,?,?,?)'
};

const queryCallback = (req, res) => (dberr, dbres) => {
    console.log(dberr + ' --- ' + JSON.stringify(dbres));
    res.sendStatus(!dberr ? 200 : 400);
};

const queryCreator = (dstTable, objToAdd) => {
    const parenthesisCatcher = /\(([^)]+)\)/;
    const fields = parenthesisCatcher.exec(sql[dstTable])[1].split(', ');
    let values = fields.map(k => objToAdd[k]);
    return mysql.format(sql[dstTable], values);
};

const insert = dbconnection => (req, res) => {
    let q = queryCreator(req.body.dstTable, req.body.objToAdd);
    console.log('QUERY: ' + q);
    dbconnection.query(q, queryCallback(req, res)) ;
};

module.exports = insert;