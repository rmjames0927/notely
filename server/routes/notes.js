var router = require('express').Router();

//Loading Note Model js
var Note = require('../models/note');

// List all notes
router.get('/', function(req, res) {
  Note.find().sort({ updated_at: 'desc' }).then(function(notes) {
    res.json(notes);
  });
});

// Create a new note
router.post('/', function(req, res) {
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

router.put('/:id', function(req, res) {
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
});

router.delete('/:id', function(req, res) {
  Note.findOne({ _id: req.params.id }).then(function(note) {
      note.remove().then(function() {
        res.json({
          message: 'Your record is deleted!.'
        })
      });
  });
});

module.exports = router;
