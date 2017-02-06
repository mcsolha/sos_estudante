angular.module('sos_estudante.controllers')
.controller('loginCtrl', ['$scope', '$stateParams', 'PouchService', '$state',  '$ionicPopup', '$timeout', '$q',
function ($scope, $stateParams, PouchService, $state, $ionicPopup, $timeout, $q) {
  $scope.login = {};
  $scope.loginUsuario = function() {
    $scope.loading = true;
    PouchService.Login($scope.login).then(function(status){
      $scope.loading = false;
      //if (status){
        $state.go('tabsController.matRias'); //NAVEGAR DE PÁGINA
    //  }
      //else{
          $scope.showAlert(status);
    //  }
    }).catch(function(status){
      $scope.showAlert(status);
      $scope.loading = false;
    })
  };
    // POP UP
    $scope.showAlert = function(status) {
      var alertPopup = $ionicPopup.alert({
        title: 'Erro',
        template: status
      });
    };
}]);
