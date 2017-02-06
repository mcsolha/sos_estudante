angular.module('sos_estudante.controllers')
.controller('matRiasCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', 'ionicTimePicker','$ionicPopover', 'PouchService', '$state', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopup, ionicTimePicker, $ionicPopover, PouchService, $state, $rootScope) {

  $scope.editMode = false;
  $scope.nomePag = "Nova Matéria";
  //obter as materias cadastradas no banco de dados
  function atualizarMaterias() {
    PouchService.RetMaterias().then(function(materias){
      $scope.materias=materias;
    });
  }
  $rootScope.$on('materiaAtualizada', function () {
    atualizarMaterias();
  });
  atualizarMaterias();
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
      PouchService.CadastroMateria($scope.materia).then(function(response) {
        console.log(response);
        $scope.closeModal();
        atualizarMaterias();
        $scope.loading = false;
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

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

  //Objeto a ser mandado para o banco de dados
  $scope.data = {horaIni:[]};
  //Scope dos dados da nova matéria
  $scope.materia = {
    dataAula: [],
    qteProvas: 0,
    qteTrabalhos: 0,
    qteExercicios: 0,
    faltas: {
      totalAulas: 0,
      porcFaltas:0
    },
    criterioAval: {
      mp: 0,
      mt: 0,
      me: 0
    }
  };

    // Função utilizada para formatar o numero
  function FormatarNumero(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
  }

  var timePickerObj = {
    inputTime: 50400,   //Optional
    format: 24,         //Optional
    step: 5,           //Optional
    setLabel: 'Definir',    //Optional
    closeLabel: 'Cancelar'
  };

  // Função que chama o seletor de tempo para armazenar hora inicial
  $scope.horaIni = function(index) {
    timePickerObj.callback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        // console.log(val);
        var tempoSelecionado = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
        $scope.materia.dataAula[index].horaIni = {};
        $scope.materia.dataAula[index].horaIni.hora = tempoSelecionado.getUTCHours();
        $scope.materia.dataAula[index].horaIni.min = tempoSelecionado.getUTCMinutes();
        $scope.materia.dataAula[index].horaIni.string = (FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2));
      }
    }
    ionicTimePicker.openTimePicker(timePickerObj);
  }

  // Função que chama o seletor de tempo para armazenar hora final
  $scope.horaFin = function(index) {
    timePickerObj.callback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var tempoSelecionado = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
        $scope.materia.dataAula[index].horaFin = {};
        $scope.materia.dataAula[index].horaFin.hora = tempoSelecionado.getUTCHours();
        $scope.materia.dataAula[index].horaFin.min = tempoSelecionado.getUTCMinutes();
        $scope.materia.dataAula[index].horaFin.string = (FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2));

      }
    }
    ionicTimePicker.openTimePicker(timePickerObj);
  }

  //Botões do dia da semana na página nova matéria
  $scope.diasSemana = [{},{},{},{},{},{}];
  for(i=0;i<6;i++){
   $scope.diasSemana[i].class = "button-stable button-outline";
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
  //////////////MODAL
  //MODAL DA NOVA MATÉRIA
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
  $scope.showPopup = function() {
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
  };

  $scope.abreDados = function(materia){
    console.log(materia);
    $state.go('dadosMateria',{materia: materia});
  }

  $scope.desarquivarMateria = function(materia) {
    materia.arquivado = false;
    PouchService.AtualizaMateria(materia).then(function(response) {
      console.log(response);
      $rootScope.$broadcast('materiaAtualizada');
      $scope.abreDados(materia);
    });
  }

  //editar as notas na tabela de notas
  $scope.materiaEdit = undefined;

  //pega o maior valor
  function tamTabela(){
    $scope.materiaEdit = undefined;
    if($scope.materiaEdit == undefined){
      console.log('provas: ' + $scope.materia.qteProvas + '\n trabalhos: ' + $scope.materia.qteTrabalhos + '\n exercs: ' + $scope.materia.qteExercicios);
      var maior = $scope.materia.qteProvas;
      if(maior == undefined || $scope.materia.qteTrabalhos > maior)
        maior = $scope.materia.qteTrabalhos;
      if(maior == undefined || $scope.materia.qteExercicios > maior)
        maior = $scope.materia.qteExercicios;

      console.log(maior);
      var notas = new Array();
      if($scope.materia.notaProvas == undefined)
        $scope.materia.notaProvas = new Array($scope.materia.qteProvas);
      else{
        var dif = $scope.materia.qteProvas - $scope.materia.notaProvas.length;
        if(dif > 0)
          for (var i = 0; i < dif; i++) {
            $scope.materia.notaProvas.push();
          }
      }
      if($scope.materia.notaExercicios == undefined)
        $scope.materia.notaExercicios = new Array($scope.materia.qteExercicios);
      else {
        var dif = $scope.materia.qteExercicios - $scope.materia.notaExercicios.length;
        if(dif > 0)
          for (var i = 0; i < dif; i++) {
            $scope.materia.notaExercicios.push();
          }
      }
      if($scope.materia.notaTrabalhos == undefined)
        $scope.materia.notaTrabalhos = new Array($scope.materia.qteTrabalhos);
      else {
        var dif = $scope.materia.qteTrabalhos - $scope.materia.notaTrabalhos.length;
        if(dif > 0)
          for (var i = 0; i < dif; i++) {
            $scope.materia.notaTrabalhos.push();
          }
      }
      for (var i = 0; i < maior; i++) {
        var nota = {};
        if($scope.materia.notaProvas[i] != undefined){
          nota.prova = $scope.materia.notaProvas[i];
        }
        if($scope.materia.notaTrabalhos[i] != undefined){
          nota.trabalho = $scope.materia.notaTrabalhos[i];
        }
        if($scope.materia.notaExercicios[i] != undefined){
          nota.exercicio = $scope.materia.notaExercicios[i];
        }
        notas.push(nota);
      }

      return notas;
    }else
    {
      var maior = $scope.materiaEdit.qteProvas;
      if($scope.materiaEdit.qteTrabalhos > maior)
        maior = $scope.materiaEdit.qteTrabalhos;
      if($scope.materiaEdit.qteExercicios > maior)
        maior = $scope.materiaEdit.qteExercicios;
      var notas = new Array();

      for (var i = 0; i < maior; i++) {
        var nota = {};
        if($scope.materiaEdit.notaProvas[i] != undefined)
          nota.prova = $scope.materiaEdit.notaProvas[i];
        if($scope.materiaEdit.notaTrabalhos[i] != undefined)
          nota.trabalho = $scope.materiaEdit.notaTrabalhos[i];
        if($scope.materiaEdit.notaExercicios[i] != undefined)
          nota.exercicio = $scope.materiaEdit.notaExercicios[i];
        notas.push(nota);
      }
      return notas;
    }
  }

  $scope.qteMudou = function() {
    $scope.tamTabela = tamTabela();
  }

  $scope.qteMudou();

  //Funções ng-change
  $scope.provaChange = function(index) {
    $scope.materia.notaProvas[index] = $scope.tamTabela[index].prova;
    console.log($scope.materia);
  }

  $scope.trabalhoChange = function(index) {
    $scope.materia.notaTrabalhos[index] = $scope.tamTabela[index].trabalho;
    console.log($scope.materia);
  }

  $scope.exercChange = function(index) {
    $scope.materia.notaExercicios[index] = $scope.tamTabela[index].exercicio;
    console.log($scope.materia);
  }
}

])
