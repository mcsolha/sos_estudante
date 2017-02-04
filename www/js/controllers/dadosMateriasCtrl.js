angular.module('sos_estudante.controllers')
.controller('dadoMateriasCtrl', ['$scope', '$stateParams', 'ApiService', '$state', '$ionicPopup', '$timeout', '$ionicModal', '$ionicPopover',
function ($scope, $stateParams, ApiService, $state, $ionicPopup, $timeout, $ionicModal, $ionicPopover) {

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
   viewData.enableBack = true;
  });

     $scope.materiaSelec = $stateParams.materia;
     $scope.faltasDisp = calculaFaltas();
     $scope.tamanhoTabela = tamTabela();

  function tamTabela(){
    var maior = $scope.materiaSelec.notaProvas.length;
   if ($scope.materiaSelec.notaTrabalhos.length > maior)
     maior = $scope.materiaSelec.notaTrabalhos.length;
   if($scope.materiaSelec.notaExercicios.length >  maior)
     maior = $scope.materiaSelec.notaExercicios.length;
     return new Array(maior);
  }

  function calculaFaltas(){
      var p = $scope.materiaSelec.faltas.porcFaltas/100;
      var disponivel = (p*$scope.materiaSelec.faltas.totalAulas) - $scope.materiaSelec.faltas.qtdeFaltas;
      return disponivel;
  }

  //Inicio MODAL DA estimativas
   $ionicModal.fromTemplateUrl('./templates/estimativas.html', {
       scope: $scope,
       animation: 'slide-in-up'
     }).then(function(modal) {
       $scope.modalEst = modal;
     });
     //ABRE MODAL
   $scope.openModalEst = function() {
     $scope.modalEst.show();
   };
   //FECHA MODAL
   $scope.closeModalEst = function() {
     $scope.modalEst.hide();
   };
   //Fim modal Estimativas

   //Inicio POPUP Faltas
   $scope.onshowPopUpFaltas = function(){
     $scope.maisFaltas = 1;
     var fPopUp = $ionicPopup.show({
       title: 'Incluir Faltas',
       templateUrl:'./templates/faltasPopup.html',
       scope: $scope,
       buttons:[
         {text: "Salvar",
         type: 'button-dark'},
         {text: "Cancelar"}
       ],
     });
     $timeout(function() {
      fPopUp.close(); //close the popup after 3 seconds for some reason
    },3000);
  };
   //Fim POPup faltas

   //Começo do popOver
   $ionicPopover.fromTemplateUrl('./templates/dadosMatPopOver.html', {
     scope: $scope,
   }).then(function(popover) {
     $scope.popoverDados = popover;
   });
   //Fim do popOver


   //MODAL DA NOVA MATÉRIA - para editar
   $ionicModal.fromTemplateUrl('./templates/novaMateria.html', {
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
   //////////FIM MODAL//

  //
  //  $scope.arquiva = function(){
  //    for (var i = 0; i < $scope.materias.length; i++) {
  //      if($scope.materiaSelec.nome ==  $scope.materias[i].nome){
  //        $scope.materias[i].arquivado = true;
  //      }
  //    }
  //
  //  }

}]);
