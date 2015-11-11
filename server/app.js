//Node Runttime environment for Javascript
//Environment Variable Load [Currently to load User ID and Password]
require('dotenv').load();
//Environment Requires express [Minimalist Web Framework for Node.js App Server]
var express = require('express');
var app = express();

//Loading Note Model js
var Note = require('./models/note');

//This is body parsing middle ware for Node.js
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Allow CORS, additional headers, and HTTP methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// List all notes
app.get('/notes', function(req, res) {
  Note.find().sort({ updated_at: 'desc' }).then(function(notes) {
    res.json(notes);
  });
});

// Create a new note
app.post('/notes', function(req, res) {
  var note = new Note({
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  note.save().then(function(noteData) {
    res.json({
      message: 'Saved!',
      note: noteData
    });
  });
});

app.put('/notes/:id', function(req, res) {
  Note.findOne({ _id: req.params.id }).then(function(note) {
      note.title = req.body.note.title;
      note.body_html = req.body.note.body_html;
      note.save().then(function() {
        res.json({
          message: 'Your changes have been save.',
          note: note
        })
      });
  });
})

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
  console.log(process.env.DB_URI);
});
