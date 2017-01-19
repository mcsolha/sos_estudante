angular.module('sos_estudante.controllers')
.controller('cadastroCtrl', ['$scope', '$stateParams', 'ApiService', '$state', '$ionicPopup', '$timeout',
function ($scope, $stateParams, ApiService, $state, $ionicPopup, $timeout) {
  $scope.cadastro = {};
  $scope.cadastroUsuario = function() {
    $scope.status = ApiService.callPost($scope.cadastro,'cadastro/usuario').then(function(status) {
      if (status){
        $scope.showAlertSucesso();
        $state.go('login');
      }
      else{
        $scope.showAlertErro();
      }
    });
  }

  // POP UP sucesso
  $scope.showAlertSucesso = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Usuario cadastrado com sucesso. Faça o login para começar a utilizar o aplicativo.'
    });
  };

  // POP UP erro
  $scope.showAlertErro = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: 'Falha no cadastro ou usuário já existente.'
    });
  };
}]);
