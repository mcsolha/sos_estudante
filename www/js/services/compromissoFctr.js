angular.module('sos_estudante.services', [])

.factory('compromissoFctr', [function(){
  // Retorna uma classe do tipo Compromisso

  return {
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
