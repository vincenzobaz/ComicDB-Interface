const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connectionParameters = require('./../../conpars.js').conpars;
const authentication = require('./auth.js').auth;

const connection = mysql.createConnection(connectionParameters);

connection.connect();

const app = express();
app.disable('etag');
app.use(bodyParser.json());

// Variable to test table listing, only as long as databse interaction
// is not set up
const tables_names_SAMPLE = ['Publishers', 'Stories', 'People', 'Issues'];

// Static file serving
app.use(express.static('./server/static/', {etag: false}));
app.use(express.static('./client/dist/', {etag: false}));

app.get('/login', authentication, (req, res) => res.send(200, 'Authenticated'));

// Start server
app.listen(3000, () => {
  console.log('Server is running');
});

app.get('/tables_list', authentication, (req, res) => {
  res.send(tables_names_SAMPLE);
});

let idIns = 0;
app.post('/insert', authentication, (req, res) => {
    console.log(req.body);
    let q = 'INSERT into People (id_people, Name) VALUES (' + idIns + ', ' + '"' + req.body.objToAdd.name + '"' + ');';
    //idIns += 1;
    console.log('QUERY: ' + q);
    connection.query(q, (err, res) => console.log(err + ' --- ' + JSON.stringify(res)));
    res.set({'Content-Type': 'application/json'});
    res.json(err);
});

