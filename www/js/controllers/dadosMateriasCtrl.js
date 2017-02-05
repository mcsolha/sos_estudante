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

   $scope.notaDesejada;
   //função que estima notas
   $scope.estimaNotas = function(){
      //calcula quanto ja tem de mediaFinal

      var soma = 0;
      for (var i = 0; i < $scope.materiaSelec.notaProvas.length; i++) {
        soma =  soma + $scope.materiaSelec.notaProvas[i]
      }
      var mediaProvas = soma/$scope.materiaSelec.qteProvas;

      soma = 0;
      for (var i = 0; i < $scope.materiaSelec.notaTrabalhos.length; i++) {
        soma =  soma + $scope.materiaSelec.notaTrabalhos[i]
      }
      var mediaTrabalhos = soma/$scope.materiaSelec.qteTrabalhos;

      soma = 0;
      for (var i = 0; i < $scope.materiaSelec.notaExercicios.length; i++) {
        soma =  soma + $scope.materiaSelec.notaExercicios[i]
      }
      var mediaExercicios = soma/$scope.materiaSelec.qteExercicios;

      var notaAtual = $scope.materiaSelec.criterio.mp*mediaProvas + $scope.materiaSelec.criterio.mt*mediaTrabalhos + $scope.materiaSelec.criterio.me*mediaExercicios;

      var notaP;
      var notaT;
      var notaE;
      if(notaAtual == $scope.notaDesejada){
          notaP = 0;
          notaE = 0;
          notaT = 0;
      }
      else
      {
        var notaRestante = $scope.notaDesejada - notaAtual;
        //para provas
        var numNotas= $scope.materiaSelec.qteProvas - $scope.materiaSelec.notaProvas.length;
        var totalPontos = notaRestante*$scope.materiaSelec.criterio.mp;
        notaP = totalPontos/numNotas;

        //para trabalhos
        numNotas= $scope.materiaSelec.qteTrabalhos - $scope.materiaSelec.notaTrabalhos.length;
        totalPontos = notaRestante*$scope.materiaSelec.criterio.mt;
        notaT = totalPontos/numNotas;

        //para Exercicios
        var numNotas= $scope.materiaSelec.qteExercicios $scope.materiaSelec.notaExercicios.length;
        var totalPontos = notaRestante*$scope.materiaSelec.criterio.me;
        var notaE = totalPontos/numNotas;
      }

      //adiciona no vetor
     for (var i = 0; i < numNotas; i++) {
        $scope.materiaSelec.notaProvas.push(notaP);
     }
    for (var i = 0; i < numNotas; i++) {
        $scope.materiaSelec.notaTrabalhos.push(notaT);
    }
    for (var i = 0; i < numNotas; i++) {
       $scope.materiaSelec.notaExercicios.push(notaE);
    }
 }




   //Inicio POPUP Faltas
   $scope.onshowPopUpFaltas = function(){
     //ng-model popup faltas
      $scope.qtdeFaltas;
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
