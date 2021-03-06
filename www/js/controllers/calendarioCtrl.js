angular.module('sos_estudante.controllers', [])
.controller('calendRioCtrl', ['$scope', '$stateParams', 'ionicTimePicker', '$ionicPopup', 'ionicDatePicker', 'calendarioAPI', 'compromissoFctr', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ionicTimePicker, $ionicPopup, ionicDatePicker, calendarioAPI, compromissoFctr, $timeout) {
  $scope.showConfirm = function() {
    // Objeto criado que contém as informações selecionadas pelo usuario na criação de um compromisso
    $scope.data = {};
    // Dia selecionado pelo usuário no calendário, vem através do serviço criado para o calendário para compartilhar informações entre controllers
    $scope.data.dia = calendarioAPI.retDataSelecionada();

    // Objeto que contém informações do seletor de data
    var datePickerObj = {
        // disabledDates: [            //Optional
        //   new Date(2016, 2, 16),
        //   new Date(2015, 3, 16),
        //   new Date(2015, 4, 16),
        //   new Date(2015, 5, 16),
        //   new Date('Wednesday, August 12, 2015'),
        //   new Date("08-16-2016"),
        //   new Date(1439676000000)
        // ],
        from: new Date(), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,
        closeOnSelect: false,
        templateType: 'popup'       //Optional
      };

    // Objeto para configurar time picker
    var ipObj = {
      inputTime: 50400,   //Optional
      format: 24,         //Optional
      step: 5,           //Optional
      setLabel: 'Definir',    //Optional
      closeLabel: 'Cancelar'
    };

    // Função que abre o seletor de data
    $scope.dataSelecao = function() {
      datePickerObj.callback = function(val) {
        var selectedDate = new Date(val);
        $scope.data.dia = calendarioAPI.formatarData(selectedDate.getDate(),selectedDate.getMonth(),selectedDate.getFullYear());
      }
      ionicDatePicker.openDatePicker(datePickerObj);
    }

    // Função utilizada para formatar o numero
    function FormatarNumero(num, length) {
      var r = "" + num;
      while (r.length < length) {
          r = "0" + r;
      }
      return r;
    }

    // Função que chama o seletor de tempo para armazenar hora inicial
    $scope.horaIni = function() {
      ipObj.callback = function(val) {
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          // console.log(val);
          var tempoSelecionado = new Date(val * 1000);
          // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');

          $scope.data.horaIniSelected = FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2);
        }
      }
      ionicTimePicker.openTimePicker(ipObj);
    }

    // Função que chama o seletor de tempo para armazenar hora final
    $scope.horaFin = function() {
      ipObj.callback = function(val) {
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var tempoSelecionado = new Date(val * 1000);
          // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
          $scope.data.horaFinSelected = FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2);;
        }
      }
      ionicTimePicker.openTimePicker(ipObj);
    }

    // Popup para usuario preencher informações do compromisso
     var confirmPopup = $ionicPopup.confirm({
       title: 'Compromisso',
       templateUrl: './templates/calendarioPopup.html',
       scope: $scope,
       buttons: [
         {
           text: '<b>Salvar</b>',
           type: 'button-dark',
           onTap: function(e) {
             if(typeof($scope.data.horaIniSelected) === 'undefined' && typeof($scope.data.horaFinSelected) === 'undefined') {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
             } else {
               return $scope.data;
             }
           }
         },
         { text: 'Cancelar' }
       ]
     });
    //  Função executada quando o popup é fechado
     confirmPopup.then(function(res) {
       if(res) {
        var comp = new compromissoFctr.Compromisso(undefined,res.titulo,res.horaIniSelected,res.horaFinSelected);
        console.log(comp);
        calendarioAPI.adcDados(res.dia,comp);
        //  console.log(res);
       } else {
         console.log('You are not sure');
       }
     });
   };

  // Função criada para abrir o popup através do html
  $scope.addComprom = function() {
    $scope.showConfirm();
  }
}])
