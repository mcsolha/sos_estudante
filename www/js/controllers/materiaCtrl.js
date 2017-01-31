angular.module('sos_estudante.controllers')
.controller('matRiasCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', 'ionicTimePicker', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopup, ionicTimePicker) {
  //Objeto a ser mandado para o banco de dados
  $scope.data = {};

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
  $scope.horaIni = function() {
    timePickerObj.callback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        // console.log(val);
        var tempoSelecionado = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');

        $scope.data.horaIniSelected = FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2);
      }
    }
    ionicTimePicker.openTimePicker(timePickerObj);
  }

  // Função que chama o seletor de tempo para armazenar hora final
  $scope.horaFin = function() {
    timePickerObj.callback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var tempoSelecionado = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
        $scope.data.horaFinSelected = FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2);;
      }
    }
    ionicTimePicker.openTimePicker(timePickerObj);
  }

  $scope.diasSemana = [{},{},{},{},{},{}];
  for(i=0;i<6;i++){
   $scope.diasSemana[i].class = "button-stable button-outline";
  }
  $scope.selecDia = function(i) {
    console.log(i);
    if ($scope.diasSemana[i].class === "button-stable button-outline"){
      $scope.diasSemana[i].class = "button-dark";
    }
    else{
      $scope.diasSemana[i].class = "button-stable button-outline";
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
    }).then(function(modal) {
      $scope.modalDados = modal;
    });
    //ABRE MODAL
  $scope.openModalDados = function() {
    $scope.modalDados.show();
  };
  //FECHA MODAL
  $scope.closeModalDados = function() {
    $scope.modalDados.hide();
  };

  /////////POPUP
  $scope.showPopup = function() {
    $scope.data = {};
    // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: 'Notas',
        templateUrl: './templates/tabNotas.html',
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

  //preenchendo conteudo dos cards
  $scope.materias = [{
    nome:"Redes",
    dia:"Quinta",
    hora:"14:00",
    fim:"18:00"
  },{
    nome:"Engenharia de Software 2",
    dia:"Segunda",
    hora:"10:00",
    fim:"12:00"
  },{
    nome:"Inteligência Artificial",
    dia:"Segunda",
    hora:"08:00",
    fim:"10:00"
  },{
    nome:"Computação Gráfica",
    dia:"Sexta",
    hora:"08:00",
    fim:"12:00"
  }];


}

])
