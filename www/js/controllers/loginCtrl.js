angular.module('sos_estudante.controllers')
.controller('loginCtrl', ['$scope', '$stateParams', 'ApiService', '$state',
function ($scope, $stateParams, ApiService, $state) {
  $scope.login = {};
  $scope.loginUsuario = function() {
    // $scope.status = ApiService.callGet('login/'+$scope.login.email+'/'+$scope.login.senha).then(function(status) {
      // console.log(status);
      //COMPARAR STATUS
      $state.go('tabsController.matRias'); //NAVEGAR DE PÁGINA
    // });
  }
}]);
