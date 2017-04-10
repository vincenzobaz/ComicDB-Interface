const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Variable to test table listing, only as long as databse interaction
// is not set up
const tables_names_SAMPLE = ['Authors', 'Titles', 'People', 'Countries'];

// Static file serving
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// Start server
app.listen(3000, () => {
  console.log('Server is running');
});

app.get('/tables_list', (req, res) => {
  res.send(tables_names_SAMPLE);
});

app.post('/insert', (req, res) => {
	console.log(req.body)
});

