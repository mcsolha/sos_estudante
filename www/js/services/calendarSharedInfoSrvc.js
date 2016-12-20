angular.module('sos_estudante.services')
.service('calendarSharedInfo', [function(){
  var selectedDate = '';

  return {
    getSelectedDate: function() {
      return selectedDate;
    },
    setSelectedDate: function(value) {
      selectedDate = value;
    },
    formatDate: function(dia,mes,ano){
      switch (mes) {
        case 0:
          mes = 'Jan';
          break;
        case 1:
          mes = 'Feb';
          break;
        case 2:
          mes = 'Mar';
          break;
        case 3:
          mes = 'Apr';
          break;
        case 4:
          mes = 'May';
          break;
        case 5:
          mes = 'Jun';
          break;
        case 6:
          mes = 'Jul';
          break;
        case 7:
          mes = 'Aug';
          break;
        case 8:
          mes = 'Sep';
          break;
        case 9:
          mes = 'Oct';
          break;
        case 10:
          mes = 'Nov';
          break;
        case 11:
          mes = 'Dec';
          break;
      }

      return dia + ' - ' + mes + ' - ' + ano.toString().substring(2);
    }
  }
}]);
