angular.module('notely')
.directive('signUp', ['$state', 'UsersService', ($state, UsersService) => {

  class SignUpController {
    constructor() {
      this.user = {};
    }
    submit() {
      UsersService.create(this.user).then(function() {
        $state.go('notes.form', { noteId: undefined });
      });
    }
  }

  return {
    scope: {},
    controller: SignUpController,
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/components/sign-up.html'
  };
}]);
