angular.module('sos_estudante.controllers')
.controller('loginCtrl', ['$scope', '$stateParams', 'ApiService', '$state',  '$ionicPopup', '$timeout',
function ($scope, $stateParams, ApiService, $state, $ionicPopup, $timeout) {
  $scope.login = {};
  $scope.loginUsuario = function() {
    $scope.loading = true;
    $scope.status = ApiService.callGet('login/'+$scope.login.email+'/'+$scope.login.senha).then(function(status) {
      console.log(status);
      $scope.loading = false;
      //if (status){
        $state.go('tabsController.matRias'); //NAVEGAR DE PÁGINA
      //}
    //  else{
    //      $scope.showAlert();
      //}
    });
  }
    // POP UP
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Erro',
        template: 'Falha no login. Verifique seus dados e tente novamente.'
      });
    };
}]);
