const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connectionParameters = require('./../../conpars.json');
const authentication = require('./auth.js').auth;
const insert = require('./insert.js');
const search = require('./search.js');
const predef = require('./predef_query.js');
const util = require('util');

const connection = mysql.createConnection(connectionParameters);

connection.connect();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const debugError = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    console.log('HEEEEERRE ERROR  ');
    console.log('ERR:  \n' + util.inspect(err));
    console.log('REQ:   \n' + util.inspect(req));
    next(err);
  }
};

app.use(debugError);

// Variable to test table listing, only as long as databse interaction
// is not set up
const tables_names_SAMPLE = ['People', 'Publishers', 'Stories', 'Brand Groups', 'Issues', 'Countries', 'Languages', 'Indicia Publishers', 'Series'];

// Static file serving
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.get('/login', authentication, (req, res) => res.send(200, 'Authenticated'));

app.get('/tables_list', authentication, (req, res) => res.send(tables_names_SAMPLE));

app.get('/countries', authentication, (req, res) => {
    connection.query('SELECT * FROM Countries',
      (dberr, dbres) => {
        if (dberr) res.sendStatus(400);
        else res.send(dbres);
      }
    );
});

app.post('/insert', authentication, insert(connection));

app.post('/search', authentication, search(connection));

app.get('/predef', authentication, predef.list_queries);

app.post('/predef', authentication, predef.perform_query(connection));

// Start server
app.listen(3000, () => {
  console.log('Server is running');
});
