angular.module('sos_estudante.controllers')
.controller('loginCtrl', ['$scope', '$stateParams', 'ApiService', '$state',  '$ionicPopup', '$timeout', '$q',
function ($scope, $stateParams, ApiService, $state, $ionicPopup, $timeout, $q) {
  var test = new PouchDB('http://186.214.78.208:3001/test');
  test.put({
  _id: 'mydoc',
  title: 'Heroes'
  }).then(function (response) {
    // handle response
  }).catch(function (err) {
    console.log(err);
  });
  console.log(test);
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
