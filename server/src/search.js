const queries = require('./search_query.js');
const run_query = require('./query_runner.js');

const search = dbconnection => (req, res) => {
    let limitString = ' LIMIT ' + req.body.max_results + '; ';
    let query = req.body.enabledTables.filter(t => queries.hasOwnProperty(t))
                                      .map(t => queries[t](req.body.string))
                                      .reduce((a, b) => a + limitString + b) + limitString;
    run_query(dbconnection, query, req, res);
};

module.exports = search;
