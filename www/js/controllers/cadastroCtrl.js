angular.module('sos_estudante.controllers')
.controller('cadastroCtrl', ['$scope', '$stateParams', 'PouchService', '$state', '$ionicPopup', '$timeout',
function ($scope, $stateParams, PouchService, $state, $ionicPopup, $timeout) {
  $scope.cadastro = {};
  $scope.cadastroUsuario = function() {
    PouchService.CadastroUsuario($scope.cadastro).then(function(status){
      if (status){
        $scope.showAlertSucesso();
        $state.go('login');
      }
      else{
        $scope.showAlertErro();
      }
    }).catch(function(status){
      $scope.showAlertErro();
    })
  };

  // POP UP sucesso
  $scope.showAlertSucesso = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Aviso',
      template: 'Usuario cadastrado com sucesso. Faça o login para começar a utilizar o aplicativo.',
      buttons: [
        {text: '<b>OK</b>',
        type: 'button-dark',}]
    });
  };

  // POP UP erro
  $scope.showAlertErro = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: 'Falha no cadastro ou usuário já existente.'
      buttons: [
        {text: '<b>OK</b>',
        type: 'button-dark',}]
    });
  };
}]);
