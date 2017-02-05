angular.module('sos_estudante.controllers')
.controller('dadoMateriasCtrl', ['$scope', '$stateParams', 'ApiService', '$state', '$ionicPopup', '$timeout', '$ionicModal', '$ionicPopover',
function ($scope, $stateParams, ApiService, $state, $ionicPopup, $timeout, $ionicModal, $ionicPopover) {

  //seta de voltar
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
   viewData.enableBack = true;
  });

     $scope.materiaSelec = $stateParams.materia;
     $scope.faltasDisp = calculaFaltas();
     $scope.tamanhoTabela = tamTabela();
     for (var i = 0; i < $scope.materiaSelec.dataAula.length; i++) {
       $scope.materiaSelec.dataAula[i].horaIni.hora = FormatarNumero($scope.materiaSelec.dataAula[i].horaIni.hora,2);
       $scope.materiaSelec.dataAula[i].horaIni.min = FormatarNumero($scope.materiaSelec.dataAula[i].horaIni.min,2);

       $scope.materiaSelec.dataAula[i].horaFin.hora = FormatarNumero($scope.materiaSelec.dataAula[i].horaFin.hora,2);
       $scope.materiaSelec.dataAula[i].horaFin.min = FormatarNumero($scope.materiaSelec.dataAula[i].horaFin.min,2);
     }

  //formata horario
  function FormatarNumero(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
  }

  //função que verifica tamanho maximo da tabela
  function tamTabela(){
    var maior = $scope.materiaSelec.notaProvas.length;
   if ($scope.materiaSelec.notaTrabalhos.length > maior)
     maior = $scope.materiaSelec.notaTrabalhos.length;
   if($scope.materiaSelec.notaExercicios.length >  maior)
     maior = $scope.materiaSelec.notaExercicios.length;
     return new Array(maior);
  }

  //calcula faltas disponiveis
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

   $scope.notaDesejada = {};
   //função que estima notas
   $scope.estimaNotas = function(){
     console.log($scope.notaDesejada);
  //   $scope.materiaSelec = EstimativasService.callEstima($scope.materiaSelec, $scope.notaDesejada);
  //   console.log(materiaSelec);
   }

   //Inicio POPUP Faltas
   $scope.onshowPopUpFaltas = function(){
     //ng-model popup faltas
     $scope.qtdeFaltas = {};
     var fPopUp = $ionicPopup.show({
       title: 'Incluir Faltas',
       templateUrl:'./templates/faltasPopup.html',
       scope: $scope,
       buttons:[
         {text: "Salvar",
         type: 'button-dark',
         onTap: function(){
            $scope.materiaSelec.qtdeFaltas = $scope.qtdeFaltas;}
         },
         {text: "Cancelar"}
       ],
     });
     $timeout(function() {
      fPopUp.close(); //close the popup after 3 seconds for some reason
    },10000);
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

   //função de arquivar
   $scope.arquiva = function(){
     $scope.materiaSelec.arquivado = true;
     $state.go('tabsController.matRias');
   }

}]);
