angular.module('notely')
  .service('NotesService', NotesService);

// NotesService
// Handle CRUD operations against the server.
NotesService.$inject = ['$http'];
function NotesService($http) {
  var self = this;
  self.notes = [];
  self.latestResult = "";

  // Get all notes from server
  self.fetch = function() {
    return $http.get('http://localhost:3000/notes')
    .then(
      // Success callback
      function(response) {
        self.notes = response.data;
      },
      // Failure callback
      function(response) {
        // TODO: Handle failure
      }
    );
  };

  self.get = function() {
    return self.notes;
  };

  self.findById = function(noteId) {
    // Look through 'self.notes' for a note with a match _id.
    for (var i = 0; i < self.notes.length; i++) {
      if (self.notes[i]._id === noteId) {
        //making copy so if you change it only change on the entry not the
        // List
        return angular.copy(self.notes[i]);
      }
    }
    return {};
  };

  self.getMessage = function() {
    return self.latestResult;
  };

  self.create = function(note) {
    var noteCreatePromise =  $http.post('http://localhost:3000/notes', {
      note: note
    });

    noteCreatePromise.then(function(response) {
      self.notes.unshift(response.data.note);
      self.latestResult = response.data.message;
    });

    return noteCreatePromise;
  }

  self.update = function(note) {
    var noteUpdatePromise =  $http.put('http://localhost:3000/notes/' + note._id, {
      note: {
        title: note.title,
        body_html: note.body_html
      }
    });

    noteUpdatePromise.then(function(response) {
      self.replaceNote(response.data.note);
    });
    return noteUpdatePromise;
  };

  self.replaceNote = function(note) {
    for (var i = 0; i < self.notes.length; i++) {
      if (self.notes[i]._id === note._id) {
        self.notes[i] = note;
      }
    }
    return {};
  }

  self.delete = function(note) {
    var noteDeletePromise =  $http.delete('http://localhost:3000/notes/' + note._id);
    noteDeletePromise.then(function(response) {
      alert(response.data.message);
      self.removeNote(note);
    });
    return noteDeletePromise;
  };

  self.removeNote = function(note) {
    for (var i = 0; i < self.notes.length; i++) {
      if (self.notes[i]._id === note._id) {
        self.notes.splice(i, 1);
      }
    }
    return {};
  }

}
