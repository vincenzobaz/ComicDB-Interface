const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connectionParameters = require('./../../conpars.json');
const authentication = require('./auth.js').auth;
const insert = require('./insert.js');
const search = require('./search.js');

const connection = mysql.createConnection(connectionParameters);

connection.connect();

const app = express();
app.use(bodyParser.json());

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

// Start server
app.listen(3000, () => {
  console.log('Server is running');
});
