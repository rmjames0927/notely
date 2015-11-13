//Node Runttime environment for Javascript
//Environment Variable Load [Currently to load User ID and Password]
require('dotenv').load();
//Environment Requires express [Minimalist Web Framework for Node.js App Server]
var express = require('express');
var app = express();

//This is body parsing middle ware for Node.js
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/add-user-to-request'));
app.use('/api/v1/notes', require('./routers/notes-router'));
app.use('/api/v1/users', require('./routers/users-router'));

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
