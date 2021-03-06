(function (){

  angular.module('notely.notes', [
    'ui.router',
    'textAngular'
  ])
  .config(notesConfig);
// This is my comment
  notesConfig['$inject'] = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        resolve: {
          notesLoaded:  ['$state',
                         '$q',
                         '$timeout',
                         'NotesService',
                         'CurrentUser',
                          function($state, $q, $timeout, NotesService, CurrentUser) {
            let deferred = $q.defer();
            $timeout(function() {
              if (CurrentUser.isSignedIn()) {
                NotesService.fetch().then(
                  function() {
                    deferred.resolve();
                  },
                  function() {
                    deferred.reject();
                    $state.go('sign-in');
                  }
                );
              }
              else {
                deffered.reject();
                $state.go('sign-in');
              }
            });
            return deferred.promise;
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

    $scope.buttonText = function() {
      if ($scope.note._id) {
        return 'Save Changes';
      }
      return 'Save';
    }
  }
})();
