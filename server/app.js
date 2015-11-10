var express = require('express');
var app = express();

//Database
var db = require('mongoose');
//Database Connection String
db.connect('mongodb://mongo:newpass#1@ds031912.mongolab.com:31912/notelydb');
//Database Schema Like Create Script
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  updated_at:  { type: Date, default: Date.now }
});

//Database Model [first what mongoose knows it at] [second is our schema created previous]
var Note = db.model('note', NoteSchema);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//List all notes
app.get('/notes', function(req, res) {
  Note.find().then(function(notes) {
    res.json(notes);
  });
});

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
