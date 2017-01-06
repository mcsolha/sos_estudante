angular.module('sos_estudante.controllers')

.controller('matRiasCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopup) {

  //////////////MODAL
  //MODAL DA NOVA MATÉRIA
  $ionicModal.fromTemplateUrl('../templates/novaMateria.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    //ABRE MODAL
  $scope.openModal = function() {
    $scope.modal.show();
  };
  //FECHA MODAL
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //////////FIM MODAL

  /////////POPUP
  $scope.showPopup = function() {
    $scope.data = {};
    // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: 'Notas',
        //template: '<input type="password" ng-model="data.wifi">'
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Salvar</b>',
            type: 'button-dark',
          }
        ]
      });
      $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
  };
  ///////FIM POPUP

}

])
