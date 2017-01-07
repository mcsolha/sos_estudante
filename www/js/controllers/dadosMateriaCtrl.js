angular.module('sos_estudante.controllers')

.controller('dadosMateriaCtrl', ['$scope', '$stateParams', '$ionicModal','$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopup) {

  //MODAL DA estimativas
    $ionicModal.fromTemplateUrl('../templates/estimativas.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      //ABRE MODAL
    $scope.openModalEst = function() {
      $scope.modal.show();
    };
    //FECHA MODAL
    $scope.closeModalEst = function() {
      $scope.modal.hide();
    };

    $scope.onshowPopUpFaltas = function(){
      $scope.maisFaltas = 1;
      $ionicPopup.show({
        title: 'Incluir Faltas',
        templateUrl:'../templates/faltasPopup.html',
        scope: $scope,
        buttons:[
          {text: "Salvar"},
          {text: "Cancelar"}
        ],
      });
    }
}

])
