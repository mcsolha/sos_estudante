angular.module('sos_estudante.services', [])

.factory('compromissoFctr', [function(){
  // Retorna uma classe do tipo Compromisso
  return class Compromisso {
    constructor(id,titulo,horaIniSelected,horaFinSelected){
      this.id = id;
      this.titulo = titulo;
      this.horaIniSelected = horaIniSelected;
      this.horaFinSelected = horaFinSelected;
    }
  }
}]);
