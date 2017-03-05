const express = require('express');

const app = express();

// Static file serving
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// Start server
app.listen(3000, () => {
  console.log('Server is running');
});
