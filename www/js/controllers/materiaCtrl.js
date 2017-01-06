angular.module('sos_estudante.controllers')

.controller('matRiasCtrl', ['$scope', '$stateParams', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal) {

  //MODAL DA NOVA MATÉRIA
    $ionicModal.fromTemplateUrl('../templates/dadosMaterias.html', {
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

  }

])
