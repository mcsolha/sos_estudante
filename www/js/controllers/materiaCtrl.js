angular.module('sos_estudante.controllers')
.controller('matRiasCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', 'ionicTimePicker','$ionicPopover', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopup, ionicTimePicker, $ionicPopover) {

 //parte para mostrar a quantidade certa na tabela de notas
  $scope.number = 5;
  $scope.getNumber = function(number){
    return new Array(number);
  }
  //fim da tabela de notas

  //Objeto a ser mandado para o banco de dados
  $scope.data = {horaIni:[]};
  //Scope dos dados da nova matéria
  $scope.materia = {
    dataAula: []
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
      $scope.materia.dataAula.push({diaSemana: diaSemana});
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
  //////////FIM MODAL

  $ionicModal.fromTemplateUrl('./templates/dadosMaterias.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modalDados) {
      $scope.modalDados = modalDados;
    });
    //ABRE MODAL
  $scope.openModalDados = function(materia,index) {
    $scope.materiaSelec = materia;
    $scope.modalDados.show();
  };
  //FECHA MODAL
  $scope.closeModalDados = function() {
    $scope.modalDados.hide();
  };

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
      $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
  };

//////////////////////////Inicio Dados Materia////////////////////////////////
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
   $ionicPopup.show({
     title: 'Incluir Faltas',
     templateUrl:'./templates/faltasPopup.html',
     scope: $scope,
     buttons:[
       {text: "Salvar",
       type: 'button-dark'},
       {text: "Cancelar"}
     ],
   });
 }
 //Fim POPup faltas
  //preenchendo conteudo dos cards
  $scope.materias = [{
    nome:"Redes",
    dia:"Quinta",
    hora:"14:00",
    fim:"18:00",
    arquivado:"false"
  },{
    nome:"Engenharia de Software 2",
    dia:"Segunda",
    hora:"10:00",
    fim:"12:00",
    arquivado:"true"
  },{
    nome:"Inteligência Artificial",
    dia:"Segunda",
    hora:"08:00",
    fim:"10:00",
    arquivado:"false"
  },{
    nome:"Computação Gráfica",
    dia:"Sexta",
    hora:"08:00",
    fim:"12:00",
    arquivado:"false"
  }];


 //Começo do popOver
 $ionicPopover.fromTemplateUrl('./templates/dadosMatPopOver.html', {
   scope: $scope,
 }).then(function(popover) {
   $scope.popoverDados = popover;
 });
 //Fim do popOver
//////////////////////////Fim Dados Materia////////////////////////////////
}

])
