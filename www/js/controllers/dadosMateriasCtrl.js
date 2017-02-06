angular.module('sos_estudante.controllers')
.controller('dadoMateriasCtrl', ['$scope', '$stateParams', 'PouchService', '$state', '$ionicPopup', '$timeout', '$ionicModal', '$ionicPopover', 'estimativasService', '$rootScope',
function ($scope, $stateParams, PouchService, $state, $ionicPopup, $timeout, $ionicModal, $ionicPopover, estimativasService, $rootScope) {
  $scope.editMode = true;
  //seta de voltar
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
   viewData.enableBack = true;
  });

  $scope.$on('$ionicView.enter', function(event, data) {
    $scope.materiaSelec = data.stateParams.materia;
    $scope.faltasDisp = calculaFaltas();
    $scope.tamanhoTabela = tamTabela($scope.materiaSelec);
    //tabela da pagina de estimativas
    $scope.tabEstima = tamTabela($scope.materiaSelec);
    //tabela do editar notas
    $scope.tamTabela = tabPopup();
  });

     $scope.materiaSelec = $stateParams.materia;
     $scope.faltasDisp = calculaFaltas();
     $scope.tamanhoTabela = tamTabela($scope.materiaSelec);

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

  function tabPopup(){
    $scope.materiaEdit = undefined;
    $scope.materia = $scope.materiaSelec;
    if($scope.materiaEdit == undefined){
      console.log('provas: ' + $scope.materiaSelec.qteProvas + '\n trabalhos: ' + $scope.materiaSelec.qteTrabalhos + '\n exercs: ' + $scope.materiaSelec.qteExercicios);
      var maior = $scope.materiaSelec.qteProvas;
      if(maior == undefined || $scope.materiaSelec.qteTrabalhos > maior)
        maior = $scope.materiaSelec.qteTrabalhos;
      if(maior == undefined || $scope.materiaSelec.qteExercicios > maior)
        maior = $scope.materiaSelec.qteExercicios;

      var notas = new Array();
      if($scope.materiaSelec.notaProvas == undefined)
        $scope.materiaSelec.notaProvas = new Array($scope.materiaSelec.qteProvas);
      else{
        var dif = $scope.materiaSelec.qteProvas - $scope.materiaSelec.notaProvas.length;
        if(dif > 0)
          for (var i = 0; i < dif; i++) {
            $scope.materiaSelec.notaProvas.push();
          }
      }
      if($scope.materiaSelec.notaExercicios == undefined)
        $scope.materiaSelec.notaExercicios = new Array($scope.materiaSelec.qteExercicios);
      else {
        var dif = $scope.materiaSelec.qteExercicios - $scope.materiaSelec.notaExercicios.length;
        if(dif > 0)
          for (var i = 0; i < dif; i++) {
            $scope.materiaSelec.notaExercicios.push();
          }
      }
      if($scope.materiaSelec.notaTrabalhos == undefined)
        $scope.materiaSelec.notaTrabalhos = new Array($scope.materiaSelec.qteTrabalhos);
      else {
        var dif = $scope.materiaSelec.qteTrabalhos - $scope.materiaSelec.notaTrabalhos.length;
        if(dif > 0)
          for (var i = 0; i < dif; i++) {
            $scope.materiaSelec.notaTrabalhos.push();
          }
      }
      for (var i = 0; i < maior; i++) {
        var nota = {};
        if($scope.materiaSelec.notaProvas[i] != undefined){
          nota.prova = $scope.materiaSelec.notaProvas[i];
        }
        if($scope.materiaSelec.notaTrabalhos[i] != undefined){
          nota.trabalho = $scope.materiaSelec.notaTrabalhos[i];
        }
        if($scope.materiaSelec.notaExercicios[i] != undefined){
          nota.exercicio = $scope.materiaSelec.notaExercicios[i];
        }
        notas.push(nota);
      }

      return notas;
    }
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
      var disponivel = (p*$scope.materiaSelec.faltas.totalAulas) - $scope.materiaSelec.faltas.qtdeFaltas;
      if(disponivel < 0)
        disponivel = "Limite de faltas atingido!";
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
     $scope.final.media = $scope.materiaEstimada.mediaFinal;

   }

   //Inicio POPUP Faltas
   $scope.faltas = {};
   $scope.onshowPopUpFaltas = function(){
     $scope.faltas.qtdeFaltas = $scope.materiaSelec.faltas.qtdeFaltas;
     var fPopUp = $ionicPopup.show({
       title: 'Incluir Faltas',
       templateUrl:'./templates/faltasPopup.html',
       scope: $scope,
       buttons:[
         {text: "Salvar",
         type: 'button-dark',
         onTap: function(){
            return $scope.faltas.qtdeFaltas;
            }
         },
         {text: "Cancelar"}
       ],
     });
     fPopUp.then(function(res){
       $scope.materiaSelec.faltas.qtdeFaltas = res;
       $scope.faltasDisp = calculaFaltas();
       PouchService.AtualizaMateria($scope.materiaSelec).then(function(response) {
         console.log(response);
         $rootScope.$broadcast('materiaAtualizada');
       });
     });
  };
   //Fim POPup faltas

   //Começo do popOver
   $ionicPopover.fromTemplateUrl('./templates/dadosMatPopOver.html', {
     scope: $scope,
   }).then(function(popover) {
     $scope.popoverDados = popover;
   });
   //Fim do popOver

   /////////////////////////////////////////////////////REGIÃO: EDITAR MATERIA/////////////////////////////
   //MODAL DA NOVA MATÉRIA - para editar
   $ionicModal.fromTemplateUrl('./templates/novaMateria.html', {
       scope: $scope,
       animation: 'slide-in-up'
     }).then(function(modal) {
       $scope.modal = modal;
     });
     //ABRE MODAL
   $scope.openModal = function() {
     $scope.nomePag = "Editar Matéria";
     $scope.materia = $scope.materiaSelec;
     $scope.modal.show();
   };
   //FECHA MODAL
   $scope.closeModal = function() {
     $scope.modal.hide();
   };

   // An alert dialog
  $scope.popupErro = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: 'Erro no critério de avaliação ou Nome da Matéria não preenchido',
      buttons: [{
        text: 'Ok',
        type: 'button-dark'
        }]
    });
   };

   //Função para salvar materia no bd
   $scope.salvarMateria = function() {
     if($scope.materia.criterioAval.mp + $scope.materia.criterioAval.mt + $scope.materia.criterioAval.me > 1 ||
       $scope.materia.nome == null || $scope.materia.nome == undefined || $scope.materia.nome == ''){
       $scope.popupErro();
     }else{
       $scope.loading = true;
       $scope.materia.faltas.qtdeFaltas = 0;
       $scope.materia.arquivado = false;
       console.log($scope.materia);
       PouchService.AtualizaMateria($scope.materia).then(function(response) {
         console.log(response);
         $scope.closeModal();
        //  atualizarMaterias();
         $rootScope.$broadcast('materiaAtualizada');
         $scope.loading = false;
       }).catch(function(err) {
         console.log(err);
       });
      }
   }

   //Botões do dia da semana na página nova matéria
   $scope.diasSemana = [{},{},{},{},{},{}];
   for(i=0;i<6;i++){
    $scope.diasSemana[i].class = "button-stable button-outline";
   }
   for (var i = 0; i < $scope.materiaSelec.dataAula.length; i++) {
     switch ($scope.materiaSelec.dataAula[i].diaSemana) {
       case "Segunda":
         $scope.diasSemana[0].class = "button-dark";
         break;
       case "Terça":
         $scope.diasSemana[1].class = "button-dark";
         break;
       case "Quarta":
         $scope.diasSemana[2].class = "button-dark";
         break;
       case "Quinta":
         $scope.diasSemana[3].class = "button-dark";
         break;
       case "Sexta":
         $scope.diasSemana[4].class = "button-dark";
         break;
       case "Sábado":
         $scope.diasSemana[5].class = "button-dark";
         break;
     }
   }

   function findWithAttr(array, attr, value) {
     for(var i = 0; i < array.length; i += 1) {
         if(array[i][attr] === value) {
             return i;
         }
     }
     return -1;
   }

   $scope.selecDia = function(i, diaSemana) {
     // console.log(i);
     //switch pra salvar o dia da semana selecionado no objeto

     if ($scope.diasSemana[i].class === "button-stable button-outline"){
       $scope.diasSemana[i].class = "button-dark";
       $scope.materia.dataAula.push({diaSemana: diaSemana, horaIni: {hora: 0, min: 0, string: '08:00'}, horaFin: {hora: 0, min: 0, string: '08:00'}});
     }
     else{
       $scope.diasSemana[i].class = "button-stable button-outline";
       var index = findWithAttr($scope.materia.dataAula, 'diaSemana', diaSemana);
       console.log(index);
       $scope.materia.dataAula.splice(index,1);
     }
   }
   //////////FIM MODAL//

   /////////////////////////////////////////////FIM REGIÃO//////////////////////////////////////////

   /////////POPUP de editar notas
   $scope.showPopupNotas = function() {
     $scope.tamTabela = tabPopup();
     $scope.data = {};
     // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
         title: 'Notas',
         templateUrl: './templates/tabNotas.html',
         scope: $scope,
         buttons: [
           { text: '<b>Salvar',
             type: 'button-dark',
             onTap: function() {
               return $scope.tamTabela;
             }
           },
           {
             text: 'Cancelar',
           }
         ]
       });

       myPopup.then(function(notas) {
         if(notas == undefined) return;
         for (var i = 0; i < notas.length; i++) {
          if(notas[i].prova != undefined && notas[i].prova != $scope.materiaSelec.notaProvas[i])
            $scope.materiaSelec.notaProvas[i] = notas[i].prova;
          if(notas[i].trabalho != undefined && notas[i].trabalho != $scope.materiaSelec.notaTrabalhos[i])
            $scope.materiaSelec.notaTrabalhos[i] = notas[i].trabalho;
          if(notas[i].exercicio != undefined && notas[i].exercicio != $scope.materiaSelec.notaExercicios[i])
            $scope.materiaSelec.notaExercicios[i] = notas[i].exercicio;
         }
         $scope.tamanhoTabela = tamTabela($scope.materiaSelec);
         //tabela da pagina de estimativas
         $scope.tabEstima = tamTabela($scope.materiaSelec);
         $scope.popoverDados.hide();
         PouchService.AtualizaMateria($scope.materiaSelec).then(function(response) {
           console.log(response);
           $rootScope.$broadcast('materiaAtualizada');
         });
       });
   };


   //função de arquivar
   $scope.arquiva = function(){
     $scope.materiaSelec.arquivado = true;
     console.log($scope.materiaSelec);
     $scope.popoverDados.hide();
     PouchService.AtualizaMateria($scope.materiaSelec).then(function(response) {
       console.log(response);
       $rootScope.$broadcast('materiaAtualizada');
     });
     $state.go('tabsController.matRias');
   }

}]);
