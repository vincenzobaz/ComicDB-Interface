const run_query = require('./query_runner.js');
const queries = require('./predefined_queries_sql.js');

const perform_query = dbconnection => (req, res) => {
    console.log(' requested query ' + req.body.id);
    run_query(dbconnection, queries[req.body.id].code, req, res, req.body.id);
};

const list_queries = (req, res) => {
    res.send(JSON.stringify(queries.map(q=> q.description)));
};

module.exports = {
    perform_query: perform_query,
    list_queries: list_queries
};
