angular.module('sos_estudante.controllers')
.controller('dadoMateriasCtrl', ['$scope', '$stateParams', 'PouchService', '$state', '$ionicPopup', '$timeout', '$ionicModal', '$ionicPopover', 'estimativasService',
function ($scope, $stateParams, PouchService, $state, $ionicPopup, $timeout, $ionicModal, $ionicPopover, estimativasService ) {

  //seta de voltar
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
   viewData.enableBack = true;
  });

     $scope.materiaSelec = $stateParams.materia;
     $scope.faltasDisp = calculaFaltas();
     $scope.tamanhoTabela = tamTabela($scope.materiaSelec);
     for (var i = 0; i < $scope.materiaSelec.dataAula.length; i++) {
       $scope.materiaSelec.dataAula[i].horaIni.hora = FormatarNumero($scope.materiaSelec.dataAula[i].horaIni.hora,2);
       $scope.materiaSelec.dataAula[i].horaIni.min = FormatarNumero($scope.materiaSelec.dataAula[i].horaIni.min,2);

       $scope.materiaSelec.dataAula[i].horaFin.hora = FormatarNumero($scope.materiaSelec.dataAula[i].horaFin.hora,2);
       $scope.materiaSelec.dataAula[i].horaFin.min = FormatarNumero($scope.materiaSelec.dataAula[i].horaFin.min,2);
     }
     //tabela da pagina de estimativas
     $scope.tabEstima = tamTabela($scope.materiaSelec);

  //formata horario
  function FormatarNumero(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
  }

  //função que verifica tamanho maximo da tabela
  function tamTabela(mat){
  var maior = mat.qteProvas;
   if (mat.qteTrabalhos > maior)
     maior = mat.qteTrabalhos;
   if(mat.qteExercicios >  maior)
     maior = mat.qteExercicios;
    var notas = new Array();

    for (var i = 0; i < maior; i++) {
      var nota = {};
      if(mat.notaProvas[i] != undefined)
        nota.prova = mat.notaProvas[i];
      if(mat.notaTrabalhos[i] != undefined)
        nota.trabalho = mat.notaTrabalhos[i];
      if(mat.notaExercicios[i] != undefined)
        nota.exercicio = mat.notaExercicios[i];
      if(nota == null)
        nota.prova = null;
      notas[i] = nota;
    }
    return notas;
  }

  //calcula faltas disponiveis
  function calculaFaltas(){
      var p = $scope.materiaSelec.faltas.porcFaltas/100;
      console.log($scope.materiaSelec.faltas);
      var disponivel = (p*$scope.materiaSelec.faltas.totalAulas) - $scope.materiaSelec.faltas.qtdeFaltas;
      console.log(disponivel);
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

   $scope.final = {};

   //função que estima notas
   $scope.estimaNotas = function(){

     //copiar propriedades uteis para estimar nota
     $scope.materiaEstimada = {
       qteProvas: $scope.materiaSelec.qteProvas,
       qteTrabalhos: $scope.materiaSelec.qteTrabalhos,
       qteExercicios: $scope.materiaSelec.qteExercicios,
       criterioAval : {
         mp : $scope.materiaSelec.criterioAval.mp,
         mt : $scope.materiaSelec.criterioAval.mt,
         me : $scope.materiaSelec.criterioAval.me
       },
       notaTrabalhos : [],
       notaProvas : [],
       notaExercicios : [],
       mediaFinal : 0
     }
     for (var i = 0; i < $scope.materiaSelec.notaProvas.length; i++) {
       $scope.materiaEstimada.notaProvas[i] = $scope.materiaSelec.notaProvas[i]
     }
     for (var i = 0; i < $scope.materiaSelec.notaTrabalhos.length; i++) {
       $scope.materiaEstimada.notaTrabalhos[i] = $scope.materiaSelec.notaTrabalhos[i]
     }
     for (var i = 0; i < $scope.materiaSelec.notaExercicios.length; i++) {
       $scope.materiaEstimada.notaExercicios[i] = $scope.materiaSelec.notaExercicios[i]
     }

     $scope.materiaEstimada = estimativasService.callEstima($scope.materiaEstimada, $scope.final.notaDesejada);
     $scope.tabEstima = tamTabela($scope.materiaEstimada);
   }

   //Inicio POPUP Faltas
   $scope.onshowPopUpFaltas = function(){
     //ng-model popup faltas
     var fPopUp = $ionicPopup.show({
       title: 'Incluir Faltas',
       templateUrl:'./templates/faltasPopup.html',
       scope: $scope,
       buttons:[
         {text: "Salvar",
         type: 'button-dark',
         onTap: function(){
            $scope.materiaSelec.qtdeFaltas =   $scope.materiaSelec.qtdeFaltas + $scope.qtdeFaltas;
            }
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

   /////////POPUP de editar notas
   $scope.showPopupNotas = function() {
     $scope.data = {};
     // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
         title: 'Notas',
         templateUrl: './templates/tabNotas.html',
         scope: $scope,
         buttons: [
           { text: '<b>Salvar',
             type: 'button-dark'},
           {
             text: 'Cancelar',
           }
         ]
       });
       $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 10000);
   };


   //função de arquivar
   $scope.arquiva = function(){
     $scope.materiaSelec.arquivado = true;
     $state.go('tabsController.matRias');
   }

}]);
