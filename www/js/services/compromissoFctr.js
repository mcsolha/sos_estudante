angular.module('sos_estudante.services', [])

.factory('compromissoFctr', ['ionicTimePicker', '$ionicPopup', 'ionicDatePicker',function(ionicTimePicker, $ionicPopup, ionicDatePicker){
  // Retorna uma classe do tipo Compromisso
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


  return {    
    //Função para abrir seletor de data
    selecData: function(callback) {
      datePickerObj.callback = callback;
      ionicDatePicker.openDatePicker(datePickerObj);
    },
    Tempo: class Tempo{
      constructor(hora,minuto){
        this.hora = hora;
        this.minuto = minuto;
      }
    },
    Compromisso: class Compromisso {
      constructor(id,titulo,horaIniSelected,horaFinSelected){
        this.id = id;
        this.titulo = titulo;
        this.horaIniSelected = horaIniSelected;
        this.horaFinSelected = horaFinSelected;
      }
    }
  }
}]);
