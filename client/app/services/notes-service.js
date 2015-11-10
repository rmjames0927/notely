angular.module('notely')
.service('NotesService', NotesService);

//NotesService
//Handle CRUD operations against the server.
NotesService.$inject = ['$http'];
function NotesService($http) {
  this.notes = [];

  //Get all notes from Server
  this.fetch = function() {
    $http.get('http://localhost:3000/notes')
    .success(function(notesData) {
      console.log(notesData);
    });
  };
}
