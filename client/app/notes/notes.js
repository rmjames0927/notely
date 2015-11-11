(function (){
  angular.module('notely.notes', [
    'ui.router'
  ])
  .config(notesConfig);

  notesConfig['$inject'] = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        resolve: {
          notesLoaded:  ['NotesService', function(NotesService) {
            return NotesService.fetch();
          }]
        },
        templateUrl: '/notes/notes.html',
        controller: NotesController
      })

      .state('notes.form', {
          url: '/:noteId',
          templateUrl: '/notes/notes-form.html',
          controller: NotesFormController
      });
  }

  NotesController.$inject = ['$state', '$scope', 'NotesService'];
  function NotesController($state, $scope, NotesService) {
      $scope.notes = {};
      $scope.notes = NotesService.get();
  }

  NotesFormController.$inject = ['$state', '$scope', 'NotesService']
  function NotesFormController($state, $scope, NotesService) {
    $scope.note = NotesService.findById($state.params.noteId);

    $scope.save = function () {
       // Decide whether to call create or update...
       if ($scope.note._id) {
         NotesService.update($scope.note).then(function(response) {
           $scope.note = angular.copy(response.data.note);
         });
       }
       else {
         NotesService.create($scope.note).then(function(response) {
           $state.go('notes.form', { noteId: response.data.note._id });
         }).then(function(){
           $scope.latestResult = NotesService.getMessage();
         });
       }
    };

    $scope.delete = function () {
      NotesService.delete($scope.note).then(function(repsonse) {
        $state.go('notes.form', { noteId: undefined });
      });
    };
  }
})();
