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

  self.save = function(note) {
    return $http.post('http://localhost:3000/notes', {
      note: note
    }).then(function(response) {
      self.notes.unshift(response.data.note);
      self.latestResult = response.data.message;
    });
  }
}
