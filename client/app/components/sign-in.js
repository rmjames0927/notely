angular.module('notely')
.directive('signIn', ['$state', 'UsersService', ($state, UsersService) => {

  class SignInController {
    constructor() {
      this.user = {};
    }
    login() {
      // UsersService.login(this.user).then(function() {
      //   $state.go('notes.form', { noteId: undefined });
      UsersService.login(this.user);
      //});
    }
  }

  return {
    scope: {},
    controller: SignInController,
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/components/sign-in.html'
  };
}]);
